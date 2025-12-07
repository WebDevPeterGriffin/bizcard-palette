import { useQuery } from '@tanstack/react-query';
import { createClient } from "@/lib/supabase/client";
import { CardData, CardRecord, recordToCardData } from '@/types/card';
import { Json } from '@/integrations/supabase/types';

// Supabase returns data with snake_case field names
// This intermediate type represents the raw database row
type SupabaseCardRow = {
    id: string;
    created_at: string;
    updated_at: string;
    full_name: string;
    role: string | null;
    company: string | null;
    emails: string[];  // Updated schema has arrays
    phones: string[];  // Updated schema has arrays
    website: string | null;
    headshot_url: string | null;
    style_id: string;
    socials: Json | null;  // Match CardRecord type
    slug: string;
    booking_enabled: boolean;
    booking_instructions: string | null;
    booking_calendar_url: string | null;
    scheduled_deletion_at: string | null;
};

const fetchCard = async (slug: string | undefined): Promise<CardData | null> => {
    if (!slug) return null;
    const supabase = createClient();

    // Fetch card data from Supabase
    const { data, error } = await supabase
        .from('cards')
        .select('*')
        .ilike('slug', slug.trim())
        .limit(1)
        .maybeSingle();

    if (!data || error) {
        return null;
    }

    // Type cast from unknown to our intermediate type
    const cardRow = data as unknown as SupabaseCardRow;

    // Resolve headshot
    let headshotPath = cardRow.headshot_url;
    const cardId = cardRow.id;

    if (!headshotPath && cardId) {
        const { data: files, error: listError } = await supabase.storage
            .from('headshots')
            .list(`${cardId}`, { limit: 1 });

        if (!listError && files && files.length > 0) {
            headshotPath = `${cardId}/${files[0].name}`;

            // Best-effort: persist discovered path
            await supabase
                .from('cards')
                .update({ headshot_url: headshotPath })
                .eq('id', cardId);
        }
    }

    const headshotUrl = headshotPath
        ? `${supabase.storage.from('headshots').getPublicUrl(headshotPath).data.publicUrl}`
        : undefined;

    return recordToCardData(cardRow, headshotUrl);
};

export const useCardData = (slug: string | undefined) => {
    return useQuery({
        queryKey: ['card', slug],
        queryFn: () => fetchCard(slug),
        enabled: !!slug,
        staleTime: 30 * 60 * 1000, // 30 minutes - cards rarely change after creation
        retry: 1,
    });
};

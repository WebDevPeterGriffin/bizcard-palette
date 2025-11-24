import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { CardData, CardRecord, recordToCardData } from '@/types/card';

export const useCardData = (slug: string | undefined) => {
    const [cardData, setCardData] = useState<CardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCard = async () => {
            if (!slug) {
                setLoading(false);
                return;
            }

            // Fetch card data directly from Supabase
            const { data, error } = await supabase
                .from('cards')
                .select('*')
                .ilike('slug', slug.trim())
                .limit(1)
                .maybeSingle();

            if (!data || error) {
                setLoading(false);
                return;
            }

            const cardRow = data as CardRecord;

            // Resolve headshot
            let headshotPath = cardRow.headshot_url;
            const cardId = cardRow.id;

            if (!headshotPath && cardId) {
                const { data: files, error: listError } = await supabase
                    .storage
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

            // Use the unified conversion function
            const normalizedCardData = recordToCardData(cardRow, headshotUrl);

            setCardData(normalizedCardData);
            setLoading(false);
        };

        fetchCard();
    }, [slug]);

    return { cardData, loading };
};


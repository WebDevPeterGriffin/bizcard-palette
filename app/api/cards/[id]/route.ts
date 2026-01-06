import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = await createClient();

        // 1. Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Fetch card to verify ownership and get headshot_url
        const { data: cardData, error: fetchError } = await supabase
            .from("cards")
            .select("user_id, headshot_url")
            .eq("id", id)
            .single();
        
        // Type assertion since database types might be outdated
        const card = cardData as unknown as { user_id: string | null; headshot_url: string | null };

        if (fetchError || !cardData) {
            return NextResponse.json({ error: "Card not found" }, { status: 404 });
        }

        if (card.user_id && card.user_id !== user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // 3. Delete headshot from storage if it exists
        if (card.headshot_url) {
            try {
                const path = card.headshot_url.split('/headshots/').pop();
                if (path) {
                    const { error: storageError } = await supabase.storage
                        .from('headshots')
                        .remove([path]);
                    
                    if (storageError) {
                        console.error("Error deleting headshot:", storageError);
                        // Continue with card deletion even if image deletion fails
                    }
                }
            } catch (err) {
                console.error("Error processing headshot deletion:", err);
            }
        }

        // 4. Delete card record
        let deleteError;
        if (!card.user_id) {
            // Use service role for unowned cards
            const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
            const { createClient: createServiceClient } = await import("@supabase/supabase-js");
            const adminSupabase = createServiceClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey);
            const { error } = await adminSupabase.from("cards").delete().eq("id", id);
            deleteError = error;
        } else {
            const { error } = await supabase
                .from("cards")
                .delete()
                .eq("id", id);
            deleteError = error;
        }

        if (deleteError) {
            return NextResponse.json({ error: deleteError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete card error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

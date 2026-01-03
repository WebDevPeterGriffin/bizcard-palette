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
        const { data: card, error: fetchError } = await supabase
            .from("cards")
            .select("user_id, headshot_url")
            .eq("id", id)
            .single() as any;

        if (fetchError || !card) {
            return NextResponse.json({ error: "Card not found" }, { status: 404 });
        }

        if (card.user_id !== user.id) {
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
        const { error: deleteError } = await supabase
            .from("cards")
            .delete()
            .eq("id", id);

        if (deleteError) {
            return NextResponse.json({ error: deleteError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete card error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

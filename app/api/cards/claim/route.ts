import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { cardId } = await request.json();

        if (!cardId) {
            return NextResponse.json(
                { error: "Card ID is required" },
                { status: 400 }
            );
        }

        // 1. Verify card exists and is unowned (user_id is NULL)
        const { data: cardData, error: fetchError } = await supabase
            .from("cards")
            .select("id, user_id")
            .eq("id", cardId)
            .single();
        
        const card = cardData;

        if (fetchError || !card) {
            return NextResponse.json(
                { error: "Card not found" },
                { status: 404 }
            );
        }

        if (card.user_id) {
            // If already owned by current user, return success
            if (card.user_id === user.id) {
                return NextResponse.json({ success: true, message: "Card already owned" });
            }
            return NextResponse.json(
                { error: "Card is already owned by another user" },
                { status: 403 }
            );
        }

        // 2. Claim the card (update user_id)
        // Note: We need to use service role key if RLS prevents update of unowned cards
        // However, standard RLS usually prevents updating rows you don't own.
        // Since user_id is NULL, the "Users can update own cards" policy (auth.uid() = user_id) will FAIL.
        // So we MUST use a service role client here.
        
        // We can't use the standard createClient() for this operation if RLS blocks it.
        // Let's check if we have the service role key available.
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        
        if (!serviceRoleKey) {
            console.error("SUPABASE_SERVICE_ROLE_KEY is missing");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const { createClient: createServiceClient } = await import("@supabase/supabase-js");
        const adminSupabase = createServiceClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            serviceRoleKey
        );

        const { error: updateError } = await adminSupabase
            .from("cards")
            .update({ user_id: user.id })
            .eq("id", cardId);

        if (updateError) {
            console.error("Error claiming card:", updateError);
            return NextResponse.json(
                { error: "Failed to claim card" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Unexpected error in claim route:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

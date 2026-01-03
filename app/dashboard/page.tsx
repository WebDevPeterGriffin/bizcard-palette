import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./client";

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    // Fetch user's cards
    const { data: cards } = await supabase
        .from("cards")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    // Fetch user's website config
    const { data: websiteConfig } = await supabase
        .from("website_configs")
        .select("*")
        .eq("user_id", user.id)
        .single();

    // Fetch recent inquiries
    const { data: inquiries } = await supabase
        .from("website_inquiries")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

    // Fetch recent appointments
    const { data: appointments } = await supabase
        .from("appointments")
        .select(`
            *,
            cards (
                full_name
            )
        `)
        .in("card_id", cards?.map(c => c.id) || [])
        .order("appointment_date", { ascending: true })
        .limit(10);

    return (
        <DashboardClient
            user={user}
            cards={cards || []}
            websiteConfig={websiteConfig}
            inquiries={inquiries || []}
            appointments={appointments || []}
        />
    );
}

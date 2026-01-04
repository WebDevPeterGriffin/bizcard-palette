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

    // Fetch user's website configs
    const { data: websiteConfigs } = await supabase
        .from("website_configs")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

    // Determine primary config:
    // 1. Prefer config with slug (published)
    // 2. Fallback to most recently updated
    const websiteConfig = websiteConfigs?.find(c => c.slug) || websiteConfigs?.[0] || null;

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

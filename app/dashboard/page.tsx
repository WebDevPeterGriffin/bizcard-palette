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

    return <DashboardClient user={user} cards={cards || []} websiteConfig={websiteConfig} />;
}

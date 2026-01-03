import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import HeroSection from "@/components/homepage/HeroSection";
import ProductOverviewSection from "@/components/homepage/ProductOverviewSection";
import CardPreviewSection from "@/components/homepage/CardPreviewSection";
import WebsiteTemplatesPreviewSection from "@/components/homepage/WebsiteTemplatesPreviewSection";
import WhyDigitalSection from "@/components/homepage/WhyDigitalSection";
import FAQSection from "@/components/homepage/FAQSection";
import CTASection from "@/components/homepage/CTASection";
import TrustedBySection from "@/components/homepage/TrustedBySection";
import AudienceSection from "@/components/homepage/AudienceSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import MainLayout from "@/components/MainLayout";

export default async function Home() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Redirect authenticated users to dashboard
    if (user) {
        redirect("/dashboard");
    }

    return (
        <MainLayout>
            <div className="min-h-screen bg-background font-sans text-slate-900">
                <HeroSection />
                <TrustedBySection />
                <ProductOverviewSection />
                <CardPreviewSection />
                <WebsiteTemplatesPreviewSection />
                <AudienceSection />
                <WhyDigitalSection />
                <TestimonialsSection />
                <FAQSection />
                <CTASection />
            </div>
        </MainLayout>
    );
}

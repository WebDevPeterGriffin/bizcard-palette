"use client";

import { Navbar } from "@/components/websites/realtor/Navbar";
import { HeroSection } from "@/components/websites/realtor/HeroSection";
import { AboutSection } from "@/components/websites/realtor/AboutSection";
import { ServicesSection } from "@/components/websites/realtor/ServicesSection";
import { WhyWorkWithMeSection } from "@/components/websites/realtor/WhyWorkWithMeSection";
import { SocialProofSection } from "@/components/websites/realtor/SocialProofSection";
import { ConsultationSection } from "@/components/websites/realtor/ConsultationSection";
import { ContactSection } from "@/components/websites/realtor/ContactSection";
import { useBuilder } from "@/context/BuilderContext";

export const RealtorTemplate = () => {
    const { config } = useBuilder();

    return (
        <main
            className="min-h-screen font-sans selection:bg-amber-500/30 relative"
            style={{
                '--primary': config.colors.primary,
                '--secondary': config.colors.secondary,
                '--text': config.colors.text,
                '--background': config.colors.background,
                '--accent': config.colors.accent,
                backgroundColor: 'var(--background)',
                color: 'var(--text)',
            } as React.CSSProperties}
        >
            <Navbar />
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <WhyWorkWithMeSection />
            <SocialProofSection />
            <ConsultationSection />
            <ContactSection />
        </main>
    );
};

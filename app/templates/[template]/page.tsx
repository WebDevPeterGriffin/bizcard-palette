"use client";

import React, { useEffect, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { BuilderProvider, useBuilder, WebsiteConfig } from "@/context/BuilderContext";
import { CreativeTemplate } from "@/components/websites/creative/CreativeTemplate";
import { RealtorTemplate } from "@/components/websites/realtor/RealtorTemplate";
import { useParams, useRouter } from "next/navigation";

// Default demo configs
const realtorDemoConfig: WebsiteConfig = {
    template: 'realtor',
    colors: {
        primary: '#1A2D49',
        secondary: '#F59E0B',
        text: '#0f172a',
        background: '#ffffff',
        accent: '#F59E0B',
    },
    content: {
        logos: {},
        text: {
            'brand.name': 'LUXE ESTATES',
            'hero.title': 'Find Your Dream \nSanctuary',
            'hero.subtitle': 'Exclusive properties for exclusive lifestyles. We help you find the perfect home that matches your vision and ambition.',
            'hero.cta': 'Explore Properties',
            'about.title': 'About Me',
            'about.description': 'I am a dedicated real estate professional with over 15 years of experience in the luxury market.',
            'about.stat.number': '15+',
            'about.stat.label': 'Years of Experience',
            'contact.email': 'hello@example.com',
            'contact.phone': '+1 (555) 123-4567',
            'contact.address': '123 Luxury Blvd, Beverly Hills, CA 90210',
        },
        images: {
            headshot: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop',
        },
        socialLinks: [
            { platform: 'instagram', url: 'https://instagram.com' },
            { platform: 'linkedin', url: 'https://linkedin.com' },
        ],
    },
};

const creativeDemoConfig: WebsiteConfig = {
    template: 'creative',
    colors: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        text: '#ffffff',
        background: '#09090b',
        accent: '#8B5CF6',
    },
    content: {
        logos: {},
        text: {
            'hero.title': 'Visionary Design',
            'hero.subtitle': 'We craft digital experiences that defy expectations.',
            'hero.cta': 'Explore Work',
            'about.title': 'About Me',
            'about.description': 'I am a dedicated creative professional with a passion for excellence.',
            'gallery.title': 'SELECTED WORK',
            'contact.email': 'hello@example.com',
            'contact.phone': '+1 (555) 000-0000',
            'brand.name': 'Creative Studio',
            'contact.title': "LET'S\nWORK\nTOGETHER",
        },
        images: {
            headshot: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop',
        },
        socialLinks: [
            { platform: 'instagram', url: 'https://instagram.com' },
            { platform: 'twitter', url: 'https://twitter.com' },
        ],
    },
};

const PreviewContent = () => {
    const { config, setConfig } = useBuilder();
    const params = useParams();
    const router = useRouter();
    const templateParam = params.template as string;

    useEffect(() => {
        if (templateParam === 'realtor') {
            setConfig(realtorDemoConfig);
        } else if (templateParam === 'creative') {
            setConfig(creativeDemoConfig);
        } else {
            router.push('/');
        }
    }, [templateParam, setConfig, router]);

    return (
        <>
            {config.template === 'creative' ? <CreativeTemplate /> : <RealtorTemplate />}
        </>
    );
};

export default function TemplatePreviewPage() {
    return (
        <BuilderProvider readOnly>
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
            }>
                <PreviewContent />
            </Suspense>
        </BuilderProvider>
    );
}

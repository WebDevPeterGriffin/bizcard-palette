import { Metadata } from "next";
import GeneratedCardClient from "./client";
import WebsiteClient from "./website-client";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const RESERVED_SLUGS = [
    'api', '_next', 'dashboard', 'login', 'signup', 'auth',
    'websites', 'cards', 'templates', 'editor', 'builder',
    'settings', 'account', 'admin', 'privacy', 'terms',
    'pricing', 'support'
];

const isReservedSlug = (slug: string) => {
    return RESERVED_SLUGS.includes(slug.toLowerCase()) || slug.includes('.');
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    if (isReservedSlug(slug)) {
        return {
            title: "Not Found",
        };
    }

    const supabase = await createClient();

    const [cardResult, websiteResult] = await Promise.all([
        supabase.from('cards').select('*').eq('slug', slug).single(),
        supabase.from('website_configs').select('*').eq('slug', slug).single()
    ]);

    const cardData = cardResult.data;
    const websiteData = websiteResult.data;

    if (cardData) {
        const title = cardData.role && cardData.company
            ? `${cardData.full_name} - ${cardData.role} at ${cardData.company} | Digital Business Card`
            : cardData.role
                ? `${cardData.full_name} - ${cardData.role} | Digital Business Card`
                : `${cardData.full_name}'s Digital Business Card`;

        const description = cardData.role && cardData.company
            ? `Connect with ${cardData.full_name}, ${cardData.role} at ${cardData.company}. View contact information, social links${cardData.booking_enabled ? ', and book appointments' : ''}.`
            : cardData.role
                ? `Connect with ${cardData.full_name}, ${cardData.role}. View contact information, social links${cardData.booking_enabled ? ', and book appointments' : ''}.`
                : `Connect with ${cardData.full_name}. View contact information, social links${cardData.booking_enabled ? ', and book appointments' : ''}.`;

        const keywords = [
            cardData.full_name.toLowerCase(),
            cardData.role?.toLowerCase(),
            cardData.company?.toLowerCase(),
            'digital business card',
            'virtual business card',
            'contactless networking',
            'QR code card'
        ].filter(Boolean).join(', ');

        return {
            title,
            description,
            keywords,
            alternates: {
                canonical: `/${cardData.slug}`,
            },
            openGraph: {
                images: cardData.headshot_url ? [cardData.headshot_url] : [],
            },
        };
    }

    if (websiteData) {
        // We could extract metadata from the config if we had a structured way to do so
        // For now, use generic metadata or try to extract from config JSON
        const config = websiteData.config as any;
        const brandName = config?.content?.text?.['brand.name'] || 'Website';

        return {
            title: `${brandName} | Professional Website`,
            description: `Check out ${brandName}'s professional website.`,
        };
    }
    supabase.from('cards').select('*').eq('slug', slug).single(),
        supabase.from('website_configs').select('*').eq('slug', slug).single()
    ]);

    const cardData = cardResult.data;
    const websiteData = websiteResult.data;

    if (cardData) {
        return <GeneratedCardClient slug={slug} />;
    }

    if (websiteData) {
        return <WebsiteClient config={websiteData} />;
    }

    notFound();
}

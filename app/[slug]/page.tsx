import { Metadata } from "next";
import GeneratedCardClient from "./client";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: cardData } = await supabase
        .from('cards')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!cardData) {
        return {
            title: "Card Not Found",
        };
    }

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

export default async function GeneratedCardPage({ params }: PageProps) {
    const { slug } = await params;
    return <GeneratedCardClient slug={slug} />;
}

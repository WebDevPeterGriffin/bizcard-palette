import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const supabase = await createClient();

    // Try to find the card
    const { data: cardData } = await supabase
        .from('cards')
        .select('full_name, role, company, headshot_url')
        .eq('slug', slug)
        .single();

    if (!cardData) {
        // Return default manifest if card not found
        return NextResponse.json({
            name: "MildTech Studios",
            short_name: "MildTech",
            start_url: "/",
            display: "standalone",
            background_color: "#F2EDE7",
            theme_color: "#1A2D49",
            icons: [
                { src: "/icon.svg", sizes: "any", type: "image/svg+xml" }
            ]
        });
    }

    // Generate personalized manifest
    const name = cardData.role && cardData.company
        ? `${cardData.full_name} - ${cardData.role}`
        : cardData.full_name;

    const shortName = cardData.full_name.split(' ')[0]; // First name

    const manifest = {
        name: name,
        short_name: shortName,
        description: cardData.role 
            ? `${cardData.full_name}'s Digital Business Card - ${cardData.role}`
            : `${cardData.full_name}'s Digital Business Card`,
        start_url: `/${slug}`,
        scope: `/${slug}`,
        display: "standalone" as const,
        background_color: "#F2EDE7",
        theme_color: "#1A2D49",
        orientation: "portrait-primary" as const,
        icons: [
            {
                src: cardData.headshot_url || "/icon.svg",
                sizes: "any",
                type: cardData.headshot_url ? "image/jpeg" : "image/svg+xml",
                purpose: "any"
            },
            {
                src: "/icon.svg",
                sizes: "any",
                type: "image/svg+xml",
                purpose: "maskable"
            }
        ]
    };

    return NextResponse.json(manifest, {
        headers: {
            'Content-Type': 'application/manifest+json',
            'Cache-Control': 'public, max-age=3600'
        }
    });
}

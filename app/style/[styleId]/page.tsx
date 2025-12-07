import { Metadata } from "next";
import StyleLandingClient from "./client";
import { CARD_META, type CardStyleId } from "@/components/cards/registry";

interface PageProps {
    params: Promise<{ styleId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { styleId } = await params;
    const meta = CARD_META[styleId as CardStyleId];

    if (!meta) {
        return {
            title: "Style Not Found",
        };
    }

    const idealFor = getIdealFor(styleId as CardStyleId);

    return {
        title: `${meta.name} Digital Business Card`,
        description: `Create your ${meta.name.toLowerCase()} digital business card. ${meta.description}. Perfect for ${idealFor}.`,
    };
}

function getIdealFor(styleId: CardStyleId): string {
    const idealForMap: Record<CardStyleId, string> = {
        minimal: "professionals who value simplicity and clarity - consultants, lawyers, accountants, and business executives",
        bold: "creative professionals and entrepreneurs who want to make a strong first impression",
        elegant: "luxury brands, high-end services, executives, and professionals in premium industries",
        creative: "designers, artists, marketers, and anyone in creative industries",
        neon: "tech professionals, developers, gamers, and those in the digital space",
        floating: "wellness professionals, coaches, therapists, and mindfulness practitioners",
        liquid: "modern creatives, UX/UI designers, and innovation-focused professionals",
        cosmic: "scientists, astronomers, tech visionaries, and futurists",
        holographic: "tech innovators, AI/ML professionals, and cutting-edge technology enthusiasts",
        particle: "data scientists, researchers, and technical professionals",
        morphing: "digital artists, motion designers, and creative technologists",
        prism: "photographers, visual artists, and creative professionals",
        "liquid-glass": "modern professionals, iOS developers, and design-forward individuals"
    };

    return idealForMap[styleId] || "professionals who want a modern digital presence";
}

export default async function StyleLandingPage({ params }: PageProps) {
    const { styleId } = await params;
    return <StyleLandingClient styleId={styleId} />;
}

import { Metadata } from "next";
import PreviewCardClient from "./client";
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

    return {
        title: `${meta.name} Preview - Digital Business Card`,
        description: `Preview the ${meta.name} digital business card style. ${meta.description}`,
        alternates: {
            canonical: `/preview/${styleId}`,
        },
    };
}

export default async function PreviewCardPage({ params }: PageProps) {
    const { styleId } = await params;
    return <PreviewCardClient styleId={styleId} />;
}

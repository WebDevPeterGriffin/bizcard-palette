import { Metadata } from "next";
import PreviewLandingPageClient from "./client";
import { LANDING_PAGE_META } from "@/components/landing-pages/registry";

interface PageProps {
    params: Promise<{ styleId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { styleId } = await params;
    const styleMeta = styleId && styleId in LANDING_PAGE_META
        ? LANDING_PAGE_META[styleId as keyof typeof LANDING_PAGE_META]
        : LANDING_PAGE_META["modern-saas"];

    return {
        title: `Preview: ${styleMeta.name} Landing Page Template`,
        description: styleMeta.description,
        alternates: {
            canonical: `/landing-page/preview/${styleId}`,
        },
    };
}

export default async function PreviewLandingPage({ params }: PageProps) {
    const { styleId } = await params;
    return <PreviewLandingPageClient styleId={styleId} />;
}

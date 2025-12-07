import { Metadata } from "next";
import SuccessClient from "./client";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
    title: "Success! Your Digital Business Card is Ready",
    description: "Your digital business card has been created successfully. Start sharing it now!",
};

export default async function SuccessPage({ params }: PageProps) {
    const { slug } = await params;
    return <SuccessClient slug={slug} />;
}

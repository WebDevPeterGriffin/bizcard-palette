import { Metadata } from "next";
import StylesClient from "./client";

export const metadata: Metadata = {
    title: "Digital Business Card Styles - Choose Your Design",
    description: "Browse our collection of unique digital business card styles. Find the perfect template for your professional brand.",
    alternates: {
        canonical: "/styles",
    },
};

export default function StylesPage() {
    return <StylesClient />;
}

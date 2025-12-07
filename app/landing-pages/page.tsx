import { Metadata } from "next";
import LandingPageStylesClient from "./client";

export const metadata: Metadata = {
    title: "Landing Page Templates - Professional & Conversion-Optimized",
    description: "Browse our collection of professionally designed, SEO-optimized landing page templates. Perfect for SaaS, startups, and digital businesses looking to convert visitors into customers.",
    alternates: {
        canonical: "/landing-pages",
    },
};

export default function LandingPagesPage() {
    return <LandingPageStylesClient />;
}

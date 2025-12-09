"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import { CARD_COMPONENTS, CARD_META, type CardStyleId } from "@/components/cards/registry";
import { notFound } from "next/navigation";
import MainLayout from "@/components/MainLayout";

interface StyleLandingClientProps {
    styleId: string;
}

const StyleLandingClient = ({ styleId }: StyleLandingClientProps) => {
    const router = useRouter();

    if (!styleId || !(styleId in CARD_COMPONENTS)) {
        notFound();
    }

    const CardComponent = CARD_COMPONENTS[styleId as CardStyleId];
    const meta = CARD_META[styleId as CardStyleId];

    const features = [
        "Instant sharing via QR code or link",
        "Save contact directly to phone",
        "Always up-to-date information",
        "Social media integration",
        "Mobile-optimized design",
        "No app required to view",
        "Eco-friendly alternative",
        "Professional appearance"
    ];

    const idealFor = getIdealFor(styleId as CardStyleId);

    return (
        <MainLayout>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="border-b px-4 py-4">
                    <div className="container mx-auto max-w-6xl flex items-center justify-between">
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/styles')}
                            className="gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            All Styles
                        </Button>
                        <Button
                            onClick={() => router.push(`/request?style=${styleId}`)}
                            className="gap-2"
                        >
                            Create Your Card
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="px-4 py-16 bg-gradient-hero">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                                <Sparkles className="h-4 w-4" />
                                <span className="text-sm font-medium">{meta.name} Style</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-primary-foreground">
                                {meta.name} Digital Business Card
                            </h1>
                            <p className="text-xl text-brand-primary-foreground/80 max-w-2xl mx-auto">
                                {meta.description}
                            </p>
                        </div>

                        {/* Live Preview */}
                        <div className="flex justify-center">
                            <div className="w-full max-w-md">
                                <CardComponent
                                    cardId={`preview-${styleId}`}
                                    name="Alex Johnson"
                                    title="Senior Product Designer"
                                    company="Innovation Labs"
                                    phones={["+1 (555) 123-4567"]}
                                    emails={["alex@example.com"]}
                                    website="alexjohnson.com"
                                    socialLinks={[
                                        { platform: "linkedin", url: "alexjohnson", label: "LinkedIn" },
                                        { platform: "twitter", url: "alexjohnson", label: "Twitter" },
                                        { platform: "instagram", url: "alexjohnson", label: "Instagram" }
                                    ]}
                                    bookingEnabled={true}
                                />
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <Button
                                size="lg"
                                onClick={() => router.push(`/request?style=${styleId}`)}
                                className="bg-brand-primary-foreground text-brand-primary hover:bg-brand-primary-foreground/90 shadow-hero"
                            >
                                Create Your {meta.name} Card Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Ideal For Section */}
                <section className="px-4 py-16">
                    <div className="container mx-auto max-w-4xl">
                        <Card className="border-2 border-brand-primary/20">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-bold mb-4 text-center">Perfect For</h2>
                                <p className="text-lg text-center text-muted-foreground">
                                    {idealFor}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="px-4 py-16 bg-muted/30">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center mt-0.5">
                                        <Check className="w-4 h-4 text-brand-primary" />
                                    </div>
                                    <span className="text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-4 py-16 bg-gradient-hero text-center">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-3xl font-bold mb-6 text-brand-primary-foreground">
                            Ready to Create Your Card?
                        </h2>
                        <p className="text-xl mb-8 text-brand-primary-foreground/80">
                            Join thousands of professionals using digital business cards
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                onClick={() => router.push(`/request?style=${styleId}`)}
                                className="bg-brand-primary-foreground text-brand-primary hover:bg-brand-primary-foreground/90 shadow-hero"
                            >
                                Get Started Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => router.push('/styles')}
                                className="bg-background/10 text-brand-primary-foreground border-brand-primary-foreground/30 hover:bg-background/20"
                            >
                                View Other Styles
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

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

export default StyleLandingClient;

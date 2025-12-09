"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, Layout } from "lucide-react";
import { useRouter } from "next/navigation";
import { LANDING_PAGE_META, type LandingPageStyleId } from "@/components/landing-pages/registry";
import MainLayout from "@/components/MainLayout";

const LandingPageStylesClient = () => {
    const router = useRouter();

    const landingPageStyles = (Object.keys(LANDING_PAGE_META) as LandingPageStyleId[]).map((id) => ({
        id,
        ...LANDING_PAGE_META[id]
    }));

    const handleRequestStyle = (styleId: string) => {
        router.push(`/landing-page/request?style=${styleId}`);
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <Button variant="ghost" onClick={() => router.push('/')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Button>
                            <h1 className="text-xl font-semibold">Landing Page Templates</h1>
                            <div></div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-12">
                    <div className="mx-auto max-w-6xl">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Layout className="h-8 w-8 text-brand-primary" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Professional Landing Page Templates</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                SEO-optimized, mobile-responsive landing pages designed to convert.
                                Each template is fully customizable with your content and branding.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {landingPageStyles.map((style) => (
                                <Card key={style.id} className="shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
                                    <div className={`h-40 ${style.gradient} relative`}>
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 rounded-full bg-background/90 text-xs font-medium">
                                                {style.category}
                                            </span>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle>{style.name}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{style.description}</p>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="space-y-2">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase">Includes:</p>
                                            <ul className="text-sm space-y-1">
                                                {style.features.slice(0, 3).map((feature, idx) => (
                                                    <li key={idx} className="text-muted-foreground flex items-start gap-2">
                                                        <span className="text-brand-primary mt-1">✓</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <Button
                                            onClick={() => router.push(`/landing-page/preview/${style.id}`)}
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            Preview Template
                                        </Button>
                                        <Button
                                            onClick={() => handleRequestStyle(style.id)}
                                            size="sm"
                                            className="w-full"
                                        >
                                            Create Landing Page
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Additional Info */}
                        <div className="mt-16 text-center">
                            <div className="bg-muted/50 rounded-lg p-8 max-w-2xl mx-auto">
                                <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                                <div className="grid gap-4 text-sm">
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>✓</span>
                                        <span>SEO-optimized HTML structure</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>✓</span>
                                        <span>Mobile-responsive design</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>✓</span>
                                        <span>Conversion-focused layout</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>✓</span>
                                        <span>Customizable content and branding</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>✓</span>
                                        <span>Fast loading performance</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>✓</span>
                                        <span>Modern animations and interactions</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
};

export default LandingPageStylesClient;

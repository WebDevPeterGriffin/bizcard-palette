"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { CARD_COMPONENTS, CARD_META, CardStyleId } from "@/components/cards/registry";

import { useToast } from "@/hooks/use-toast";
import { useCardData } from "@/hooks/useCardData";

interface GeneratedCardClientProps {
    slug: string;
}

const GeneratedCardContent = ({ slug }: GeneratedCardClientProps) => {
    const router = useRouter();
    const { toast } = useToast();
    const { data: cardData, isLoading: loading } = useCardData(slug);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${cardData?.name}'s Digital Business Card`,
                    text: `Check out ${cardData?.name}'s digital business card`,
                    url: url,
                });
            } catch (err) {
                // Fallback to clipboard
                navigator.clipboard.writeText(url);
                toast({
                    title: "Link Copied!",
                    description: "The card URL has been copied to your clipboard.",
                });
            }
        } else {
            navigator.clipboard.writeText(url);
            toast({
                title: "Link Copied!",
                description: "The card URL has been copied to your clipboard.",
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading your card...</p>
                </div>
            </div>
        );
    }

    if (!cardData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Card Not Found</h1>
                    <p className="text-muted-foreground mb-6">
                        The digital business card you're looking for doesn't exist.
                    </p>
                    <Button onClick={() => router.push('/')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Home
                    </Button>
                </div>
            </div>
        );
    }

    const renderBackgroundLayers = () => {
        switch (cardData.style) {
            case 'neon':
                return (
                    <div className="absolute inset-0 opacity-40">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20"></div>
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
                                backgroundSize: '20px 20px',
                                animation: 'grid-move 6s linear infinite',
                            }}
                        />
                        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-pulse" />
                    </div>
                );
            case 'floating':
                return (
                    <div className="absolute inset-0 opacity-50">
                        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-300 rounded-full animate-bounce" />
                        <div className="absolute top-40 right-20 w-6 h-6 bg-indigo-300 rounded-full animate-bounce delay-1000" />
                        <div className="absolute top-60 left-1/3 w-3 h-3 bg-sky-300 rounded-full animate-bounce delay-2000" />
                        <div className="absolute bottom-40 right-10 w-5 h-5 bg-cyan-300 rounded-full animate-bounce delay-500" />
                        <div className="absolute bottom-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-1500" />
                        <div className="absolute top-1/2 right-1/4 w-7 h-7 bg-indigo-200 rounded-full animate-bounce delay-3000" />
                    </div>
                );
            case 'liquid':
                return (
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-10 left-1/4 w-16 h-16 bg-liquid-primary/20 rounded-full blur-lg animate-pulse"></div>
                        <div className="absolute top-1/3 right-10 w-12 h-12 bg-liquid-secondary/20 rounded-full blur-lg animate-pulse delay-1000"></div>
                        <div className="absolute bottom-1/4 left-10 w-20 h-20 bg-liquid-tertiary/20 rounded-full blur-lg animate-pulse delay-2000"></div>
                        <div className="absolute bottom-10 right-1/3 w-14 h-14 bg-liquid-primary/20 rounded-full blur-lg animate-pulse delay-500"></div>
                    </div>
                );
            case 'cosmic':
                return (
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0" style={{
                            background: `radial-gradient(2px 2px at 20px 30px, white, transparent), radial-gradient(2px 2px at 40px 70px, white, transparent), radial-gradient(1px 1px at 90px 40px, white, transparent)`,
                            backgroundSize: '200px 100px',
                            animation: 'star-move 30s linear infinite'
                        }} />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 animate-[pulse_8s_ease-in-out_infinite]" />
                    </div>
                );
            default:
                return null;
        }
    };

    const styleConfig = CARD_META[cardData.style as CardStyleId] || CARD_META.minimal;
    const isDark = styleConfig.isDark;
    const CardComponent = CARD_COMPONENTS[cardData.style as CardStyleId] || CARD_COMPONENTS.minimal;

    return (
        <div className={`relative min-h-screen overflow-hidden ${styleConfig.backgroundColor}`}>        {renderBackgroundLayers()}
            <div className="relative z-10 p-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="mb-8 flex justify-end">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleShare}
                            className={isDark ? "bg-white/10 text-white border-white/30 hover:bg-white/20" : ""}
                        >
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                    </div>

                    {/* Card Display */}
                    <div className="flex justify-center mb-8">
                        <Suspense fallback={<div className="text-center p-8">Loading card style...</div>}>
                            <CardComponent
                                cardId={cardData.id}
                                name={cardData.name}
                                title={cardData.title}
                                company={cardData.company}
                                phones={cardData.phones}
                                emails={cardData.emails}
                                website={cardData.website}
                                socialLinks={cardData.socialLinks}
                                headshotUrl={cardData.headshotUrl}
                                bookingEnabled={cardData.bookingEnabled}
                                bookingInstructions={cardData.bookingInstructions}
                                slug={slug}
                            />
                        </Suspense>
                    </div>



                    {/* Small Brand CTA */}
                    <div className="mt-6 text-center">
                        <div className={`rounded-lg p-3 ${isDark ? 'bg-white/5 backdrop-blur-sm border border-white/10' : 'bg-white/60 shadow-sm'
                            }`}>
                            <p className={`text-xs mb-2 ${isDark ? 'text-white/70' : 'text-muted-foreground'}`}>
                                Want your own digital business card?
                            </p>
                            <Button
                                onClick={() => router.push('/')}
                                size="sm"
                                variant="outline"
                                className={isDark ? "bg-white/10 text-white/80 border-white/20 hover:bg-white/20 text-xs" : "text-xs"}
                            >
                                Create Your Own
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function GeneratedCardClient({ slug }: GeneratedCardClientProps) {
    return <GeneratedCardContent slug={slug} />;
}

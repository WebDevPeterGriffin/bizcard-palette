"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Share2, CheckCircle2, Copy, Download, LayoutDashboard, LogIn } from "lucide-react";
import QRCodeGenerator, { QRCodeRef } from "@/components/QRCodeGenerator";
import { useToast } from "@/hooks/use-toast";
import { CARD_COMPONENTS, type CardStyleId } from "@/components/cards/registry";
import { useCardData } from "@/hooks/useCardData";
import { logger } from "@/lib/logger";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useRef } from "react";
import FloatingOrbs from "@/components/FloatingOrbs";
import { motion } from "framer-motion";

interface SuccessClientProps {
    slug: string;
}

const SuccessClient = ({ slug }: SuccessClientProps) => {
    const router = useRouter();
    const { toast } = useToast();
    const [claiming, setClaiming] = useState(false);
    const supabase = createClient();
    const qrRef = useRef<QRCodeRef>(null);

    // Use the proper hook that converts data correctly
    const { data: cardData, isLoading: loading } = useCardData(slug);

    const cardUrl = typeof window !== 'undefined' ? `${window.location.origin}/${slug}` : '';

    // Auto-claim logic
    useEffect(() => {
        const checkAuthAndClaim = async () => {
            if (!cardData || loading) return;

            const { data: { user } } = await supabase.auth.getUser();

            // If user is logged in and card is unowned, claim it
            if (user && cardData.userId === null && !claiming) {
                setClaiming(true);
                try {
                    const response = await fetch('/api/cards/claim', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ cardId: cardData.id }),
                    });

                    if (response.ok) {
                        toast({
                            title: "Card Saved!",
                            description: "This card has been added to your account.",
                        });
                        router.refresh();
                    }
                } catch (error) {
                    console.error("Failed to claim card", error);
                } finally {
                    setClaiming(false);
                }
            }
        };

        checkAuthAndClaim();
    }, [cardData, loading, supabase.auth, toast, router, claiming]);

    const handleCopy = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(cardUrl);
            } else {
                // Fallback for non-secure contexts
                const textArea = document.createElement("textarea");
                textArea.value = cardUrl;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    document.execCommand('copy');
                } catch (err) {
                    throw new Error('Fallback copy failed');
                } finally {
                    document.body.removeChild(textArea);
                }
            }

            toast({
                title: "Copied!",
                description: "Card URL copied to clipboard",
            });
        } catch (err) {
            logger.error(err);
            toast({
                title: "Failed to copy",
                description: "Please copy the URL manually",
                variant: "destructive",
            });
        }
    };

    const handleDownloadQR = () => {
        if (qrRef.current) {
            qrRef.current.download('png');
        }
    };

    const shareCard = (platform: string) => {
        const text = `Check out my digital business card!`;
        const urls: Record<string, string> = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(cardUrl)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cardUrl)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cardUrl)}`,
            email: `mailto:?subject=${encodeURIComponent("My Digital Business Card")}&body=${encodeURIComponent(`${text}\n\n${cardUrl}`)}`
        };

        window.open(urls[platform], '_blank');
    };

    const handleLoginToSave = () => {
        const returnUrl = encodeURIComponent(`/success/${slug}`);
        router.push(`/auth/login?redirect=${returnUrl}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1A2D49] text-white">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
                    <p>Loading your masterpiece...</p>
                </div>
            </div>
        );
    }

    if (!cardData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1A2D49] text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Card not found</h2>
                    <Button onClick={() => router.push('/')} variant="secondary">Go Home</Button>
                </div>
            </div>
        );
    }

    const CardComponent = CARD_COMPONENTS[cardData.style as CardStyleId];

    return (
        <div className="min-h-screen bg-[#1A2D49] text-white relative overflow-hidden">
            {/* Background Elements */}
            <FloatingOrbs />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

            <div className="container mx-auto px-4 py-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6 backdrop-blur-sm border border-green-500/30">
                        <CheckCircle2 className="w-10 h-10 text-green-400" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-brand-accent">
                        It's Live! 🎉
                    </h1>
                    <p className="text-xl text-blue-200/80 max-w-2xl mx-auto">
                        Your digital business card is ready to share with the world.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
                    {/* Left Column: Card Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative group perspective-1000"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-brand-accent/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-75 group-hover:opacity-100 transition duration-1000" />
                        <div className="relative transform transition-transform duration-500 hover:scale-[1.02]">
                            {CardComponent && (
                                <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                                    <CardComponent
                                        cardId={cardData.id}
                                        name={cardData.name}
                                        title={cardData.title}
                                        company={cardData.company}
                                        emails={cardData.emails}
                                        phones={cardData.phones}
                                        website={cardData.website}
                                        headshotUrl={cardData.headshotUrl}
                                        socialLinks={cardData.socialLinks}
                                        slug={cardData.slug}
                                        bookingEnabled={cardData.bookingEnabled}
                                        bookingInstructions={cardData.bookingInstructions}
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Right Column: Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Login Prompt Banner */}
                        {cardData.userId === null && (
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-gradient-to-r from-brand-accent/20 to-yellow-600/20 backdrop-blur-md border border-brand-accent/30 rounded-2xl p-6 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Share2 className="w-24 h-24 text-brand-accent" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-brand-accent mb-2 flex items-center gap-2">
                                        <LogIn className="w-5 h-5" />
                                        Save Your Card
                                    </h3>
                                    <p className="text-blue-100/80 mb-4">
                                        Don't lose access! Log in now to save this card to your dashboard.
                                    </p>
                                    <Button
                                        onClick={handleLoginToSave}
                                        className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-bold"
                                    >
                                        Log in to Claim
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* Quick Actions Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                onClick={handleCopy}
                                variant="outline"
                                className="h-auto py-6 flex flex-col gap-2 bg-white/5 border-white/10 hover:bg-white/10 hover:border-brand-accent/50 transition-all group"
                            >
                                <Copy className="w-6 h-6 text-blue-300 group-hover:text-brand-accent transition-colors" />
                                <span className="text-blue-100">Copy Link</span>
                            </Button>
                            <Button
                                onClick={() => router.push('/' + slug)}
                                variant="outline"
                                className="h-auto py-6 flex flex-col gap-2 bg-white/5 border-white/10 hover:bg-white/10 hover:border-brand-accent/50 transition-all group"
                            >
                                <ArrowRight className="w-6 h-6 text-blue-300 group-hover:text-brand-accent transition-colors" />
                                <span className="text-blue-100">View Live</span>
                            </Button>
                        </div>

                        {/* Share Panel */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Share2 className="w-5 h-5 text-brand-accent" />
                                Share Instantly
                            </h3>
                            <div className="grid grid-cols-4 gap-2">
                                {['linkedin', 'twitter', 'facebook', 'email'].map((platform) => (
                                    <Button
                                        key={platform}
                                        onClick={() => shareCard(platform)}
                                        variant="ghost"
                                        className="flex flex-col gap-1 h-auto py-3 hover:bg-white/10 hover:text-brand-accent capitalize"
                                    >
                                        <span className="text-xs">{platform}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* QR Code Panel */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center gap-6">
                            <div className="bg-white p-2 rounded-lg">
                                <QRCodeGenerator
                                    ref={qrRef}
                                    url={cardUrl}
                                    size={100}
                                    showControls={false}
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">QR Code</h3>
                                <p className="text-sm text-blue-200/60 mb-3">
                                    Perfect for business cards and flyers.
                                </p>
                                <Button
                                    onClick={handleDownloadQR}
                                    variant="secondary"
                                    size="sm"
                                    className="w-full"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PNG
                                </Button>
                            </div>
                        </div>

                        {/* Dashboard Link */}
                        <div className="text-center pt-4">
                            <Button
                                variant="link"
                                onClick={() => router.push('/dashboard')}
                                className="text-blue-300 hover:text-white"
                            >
                                <LayoutDashboard className="w-4 h-4 mr-2" />
                                Go to Dashboard
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SuccessClient;

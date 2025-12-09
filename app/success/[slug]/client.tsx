"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Share2, CheckCircle2, Copy } from "lucide-react";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { useToast } from "@/hooks/use-toast";
import { CARD_COMPONENTS, type CardStyleId } from "@/components/cards/registry";
import { useCardData } from "@/hooks/useCardData";
import { logger } from "@/lib/logger";

interface SuccessClientProps {
    slug: string;
}

const SuccessClient = ({ slug }: SuccessClientProps) => {
    const router = useRouter();
    const { toast } = useToast();

    // Use the proper hook that converts data correctly
    const { data: cardData, isLoading: loading } = useCardData(slug);

    const cardUrl = typeof window !== 'undefined' ? `${window.location.origin}/${slug}` : '';

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(cardUrl);
            toast({
                title: "Copied!",
                description: "Your card URL has been copied to clipboard",
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse">Loading your card...</div>
            </div>
        );
    }

    if (!cardData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Card not found</h2>
                    <Button onClick={() => router.push('/')}>Go Home</Button>
                </div>
            </div>
        );
    }

    const CardComponent = CARD_COMPONENTS[cardData.style as CardStyleId];

    return (
        <div className="min-h-screen bg-background pt-20">
            {/* Success Header */}
            <section className="px-4 py-16 bg-gradient-hero text-center">
                <div className="container mx-auto max-w-4xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-primary-foreground">
                        Your Card is Ready! 🎉
                    </h1>
                    <p className="text-xl text-brand-primary-foreground/80">
                        Your digital business card has been created successfully
                    </p>
                </div>
            </section>

            {/* Card Preview */}
            <section className="px-4 py-16">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Preview */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Your Card</h2>
                            {CardComponent && (
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
                            )}
                        </div>

                        {/* Share Options */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Share Your Card</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Your Card URL</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={cardUrl}
                                                readOnly
                                                onClick={(e) => e.currentTarget.select()}
                                                className="flex-1 px-3 py-2 border rounded-md bg-muted text-sm cursor-text"
                                            />
                                            <Button onClick={handleCopy} variant="outline">
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Share on Social Media</label>
                                        <div className="flex gap-2 flex-wrap">
                                            <Button onClick={() => shareCard('linkedin')} variant="outline" size="sm">
                                                <Share2 className="h-4 w-4 mr-2" />
                                                LinkedIn
                                            </Button>
                                            <Button onClick={() => shareCard('twitter')} variant="outline" size="sm">
                                                <Share2 className="h-4 w-4 mr-2" />
                                                Twitter
                                            </Button>
                                            <Button onClick={() => shareCard('facebook')} variant="outline" size="sm">
                                                <Share2 className="h-4 w-4 mr-2" />
                                                Facebook
                                            </Button>
                                            <Button onClick={() => shareCard('email')} variant="outline" size="sm">
                                                <Share2 className="h-4 w-4 mr-2" />
                                                Email
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>QR Code</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Download and use this QR code on your email signature, business materials, or anywhere else
                                    </p>
                                    <QRCodeGenerator url={cardUrl} />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Next Steps</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium">Add to Email Signature</p>
                                            <p className="text-sm text-muted-foreground">Include your card link in your email signature</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium">Share on Social Media</p>
                                            <p className="text-sm text-muted-foreground">Let your network know about your new card</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium">Print QR Code</p>
                                            <p className="text-sm text-muted-foreground">Add to business cards, flyers, or presentations</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Button
                                className="w-full"
                                onClick={() => router.push('/' + slug)}
                            >
                                View Full Card
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SuccessClient;

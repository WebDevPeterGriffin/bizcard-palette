"use client";

import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, ExternalLink, Trash2, LogOut, CreditCard, Globe, Edit, Copy, Share2 } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import { format } from "date-fns";

import { Tables } from "@/integrations/supabase/types";

type CardData = Tables<"cards">;
type WebsiteConfigData = Tables<"website_configs">;

interface DashboardClientProps {
    user: User;
    cards: CardData[];
    websiteConfig: WebsiteConfigData | null;
}

export default function DashboardClient({ user, cards, websiteConfig }: DashboardClientProps) {
    const router = useRouter();
    const { toast } = useToast();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        toast({
            title: "Signed out",
            description: "You have been logged out successfully",
        });
        router.push("/");
        router.refresh();
    };

    const handleDeleteCard = async (cardId: string, cardName: string) => {
        if (!confirm(`Are you sure you want to delete "${cardName}"?`)) return;

        try {
            const response = await fetch(`/api/cards/${cardId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete card');
            }

            toast({
                title: "Card deleted",
                description: `"${cardName}" has been deleted`,
            });
            router.refresh();
        } catch (error) {
            toast({
                title: "Delete failed",
                description: error instanceof Error ? error.message : "An unknown error occurred",
                variant: "destructive",
            });
        }
    };

    const handleDeleteWebsite = async () => {
        if (!confirm("Are you sure you want to delete your website? This cannot be undone.")) return;

        try {
            const response = await fetch('/api/websites/config', {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete website');
            }

            toast({
                title: "Website deleted",
                description: "Your website has been deleted",
            });
            router.refresh();
        } catch (error) {
            toast({
                title: "Delete failed",
                description: error instanceof Error ? error.message : "An unknown error occurred",
                variant: "destructive",
            });
        }
    };

    const handleCopyLink = (slug: string) => {
        const url = `${window.location.origin}/${slug}`;
        navigator.clipboard.writeText(url);
        toast({
            title: "Link copied",
            description: "Website link copied to clipboard",
        });
    };

    const handleShare = async (slug: string) => {
        const url = `${window.location.origin}/${slug}`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Website',
                    url: url,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            handleCopyLink(slug);
        }
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-background pt-24 pb-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Dashboard</h1>
                            <p className="text-muted-foreground mt-1">
                                Welcome back, {user.email}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button asChild>
                                <Link href="/request">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Card
                                </Link>
                            </Button>
                            <Button variant="outline" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign out
                            </Button>
                        </div>
                    </div>

                    {/* My Websites Section */}
                    <div className="space-y-6 mb-8">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            My Websites
                        </h2>

                        {websiteConfig ? (
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <span className="capitalize">{websiteConfig.template}</span> Website
                                    </CardTitle>
                                    <CardDescription>
                                        Last updated: {format(new Date(websiteConfig.updated_at), "MMM d, yyyy h:mm a")}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <Button asChild variant="default" size="sm" className="flex-1">
                                                <Link href="/websites/realtor">
                                                    <Edit className="mr-2 h-3 w-3" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            {websiteConfig.slug && (
                                                <>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleCopyLink(websiteConfig.slug!)}
                                                        title="Copy Link"
                                                    >
                                                        <Copy className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleShare(websiteConfig.slug!)}
                                                        title="Share"
                                                    >
                                                        <Share2 className="h-3 w-3" />
                                                    </Button>
                                                    <Button asChild variant="outline" size="sm">
                                                        <Link href={`/${websiteConfig.slug}`} target="_blank">
                                                            <ExternalLink className="h-3 w-3" />
                                                        </Link>
                                                    </Button>
                                                </>
                                            )}
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={handleDeleteWebsite}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        {!websiteConfig.slug && (
                                            <p className="text-xs text-amber-600">
                                                * Save your website to generate a shareable link
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="border-dashed">
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <Globe className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No website yet</h3>
                                    <p className="text-muted-foreground text-center mb-4">
                                        Create your professional website to showcase your business
                                    </p>
                                    <Button asChild>
                                        <Link href="/websites/realtor">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create Website
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Cards Grid */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Your Cards ({cards.length})
                        </h2>

                        {cards.length === 0 ? (
                            <Card className="border-dashed">
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No cards yet</h3>
                                    <p className="text-muted-foreground text-center mb-4">
                                        Create your first digital business card to get started
                                    </p>
                                    <Button asChild>
                                        <Link href="/request">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create Your First Card
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {cards.map((card) => (
                                    <Card key={card.id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">{card.full_name}</CardTitle>
                                            <CardDescription>
                                                {card.role && card.company
                                                    ? `${card.role} at ${card.company}`
                                                    : card.role || card.company || "No title"}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="text-sm text-muted-foreground">
                                                <p>Style: <span className="capitalize">{card.style_id}</span></p>
                                                <p>Created: {format(new Date(card.created_at), "MMM d, yyyy")}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button asChild variant="outline" size="sm" className="flex-1">
                                                    <Link href={`/${card.slug}`} target="_blank">
                                                        <ExternalLink className="mr-2 h-3 w-3" />
                                                        View
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDeleteCard(card.id, card.full_name)}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

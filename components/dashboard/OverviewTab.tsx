"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Sparkles, Edit, Copy, Share2, Trash2, Plus, CreditCard, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Tables } from "@/integrations/supabase/types";

type CardData = Tables<"cards">;
type WebsiteConfigData = Tables<"website_configs">;

interface OverviewTabProps {
    websiteConfig: WebsiteConfigData | null;
    cards: CardData[];
    handleDeleteWebsite: () => void;
    handleDeleteCard: (cardId: string, cardName: string) => void;
    handleCopyLink: (slug: string) => void;
    handleShare: (slug: string) => void;
    itemVariants: any;
}

export function OverviewTab({
    websiteConfig,
    cards,
    handleDeleteWebsite,
    handleDeleteCard,
    handleCopyLink,
    handleShare,
    itemVariants
}: OverviewTabProps) {
    return (
        <div className="space-y-8">
            {/* My Websites Section */}
            <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-brand-primary flex items-center gap-2">
                        <Globe className="h-6 w-6 text-brand-secondary" />
                        My Website
                    </h2>
                    {websiteConfig && (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Live
                        </span>
                    )}
                </div>

                {websiteConfig ? (
                    <Card className="glass-card border-none shadow-lg overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-8 relative z-10">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-brand-primary capitalize flex items-center gap-2">
                                        {websiteConfig.template} Template
                                        <Sparkles className="w-5 h-5 text-brand-secondary" />
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Last updated: {format(new Date(websiteConfig.updated_at), "MMM d, yyyy h:mm a")}
                                    </p>
                                    {websiteConfig.slug && (
                                        <a
                                            href={`/${websiteConfig.slug}`}
                                            target="_blank"
                                            className="inline-flex items-center text-brand-secondary hover:text-brand-secondary/80 transition-colors text-sm font-medium mt-2"
                                        >
                                            yoursite.com/{websiteConfig.slug}
                                            <ExternalLinkIcon className="ml-1 w-3 h-3" />
                                        </a>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Button asChild className="bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md">
                                        <Link href={`/websites/${websiteConfig.template}`}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit Website
                                        </Link>
                                    </Button>
                                    {websiteConfig.slug && (
                                        <>
                                            <Button
                                                variant="outline"
                                                onClick={() => handleCopyLink(websiteConfig.slug!)}
                                                className="border-brand-primary/20 hover:bg-brand-primary/5"
                                            >
                                                <Copy className="mr-2 h-4 w-4" />
                                                Copy Link
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => handleShare(websiteConfig.slug!)}
                                                className="border-brand-primary/20 hover:bg-brand-primary/5"
                                            >
                                                <Share2 className="mr-2 h-4 w-4" />
                                                Share
                                            </Button>
                                        </>
                                    )}
                                    <Button
                                        variant="ghost"
                                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                        onClick={handleDeleteWebsite}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border-2 border-dashed border-brand-primary/20 bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors cursor-pointer" onClick={() => window.location.href = '/websites'}>
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-16 h-16 rounded-full bg-brand-secondary/20 flex items-center justify-center mb-4">
                                <Globe className="h-8 w-8 text-brand-secondary" />
                            </div>
                            <h3 className="text-xl font-bold text-brand-primary mb-2">No website yet</h3>
                            <p className="text-muted-foreground max-w-md mx-auto mb-6">
                                Create your professional website to showcase your business and capture leads.
                            </p>
                            <Button className="bg-brand-secondary text-brand-primary font-semibold hover:bg-brand-secondary/90">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Website
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </motion.div>

            {/* Cards Grid */}
            <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-2xl font-bold text-brand-primary flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-brand-secondary" />
                    Your Cards
                </h2>

                {cards.length === 0 ? (
                    <Card className="border-2 border-dashed border-brand-primary/20 bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors cursor-pointer" onClick={() => window.location.href = '/request'}>
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-16 h-16 rounded-full bg-brand-secondary/20 flex items-center justify-center mb-4">
                                <CreditCard className="h-8 w-8 text-brand-secondary" />
                            </div>
                            <h3 className="text-xl font-bold text-brand-primary mb-2">No cards yet</h3>
                            <p className="text-muted-foreground max-w-md mx-auto mb-6">
                                Create your first digital business card to share your contact info instantly.
                            </p>
                            <Button className="bg-brand-secondary text-brand-primary font-semibold hover:bg-brand-secondary/90">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Your First Card
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {cards.map((card) => (
                            <Card key={card.id} className="glass-card border-none shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                                <div className="h-2 bg-gradient-to-r from-brand-primary to-brand-secondary" />
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl font-bold text-brand-primary">{card.full_name}</CardTitle>
                                    <CardDescription className="font-medium text-brand-secondary">
                                        {card.role && card.company
                                            ? `${card.role} at ${card.company}`
                                            : card.role || card.company || "No title"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="text-sm text-muted-foreground space-y-1">
                                        <p className="flex items-center gap-2">
                                            <Sparkles className="w-3 h-3" />
                                            Style: <span className="capitalize font-medium text-foreground">{card.style_id}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            Created: {format(new Date(card.created_at), "MMM d, yyyy")}</p>
                                    </div>
                                    <div className="flex items-center gap-2 pt-2">
                                        <Button asChild variant="outline" size="sm" className="flex-1 border-brand-primary/20 hover:bg-brand-primary/5 hover:text-brand-primary transition-colors">
                                            <Link href={`/${card.slug}`} target="_blank">
                                                View Card
                                                <ArrowRight className="ml-2 h-3 w-3" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:bg-destructive/10"
                                            onClick={() => handleDeleteCard(card.id, card.full_name)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}

function ExternalLinkIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" x2="21" y1="14" y2="3" />
        </svg>
    )
}

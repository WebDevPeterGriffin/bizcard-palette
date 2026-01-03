"use client";

import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, ExternalLink, Trash2, LogOut, CreditCard, Globe, Edit, Copy, Share2, MessageSquare, Calendar, TrendingUp, Users, ArrowRight, Sparkles } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

import { Tables } from "@/integrations/supabase/types";

type CardData = Tables<"cards">;
type WebsiteConfigData = Tables<"website_configs">;
type InquiryData = Tables<"website_inquiries">;
type AppointmentData = Tables<"appointments"> & { cards: { full_name: string } | null };

interface DashboardClientProps {
    user: User;
    cards: CardData[];
    websiteConfig: WebsiteConfigData | null;
    inquiries: InquiryData[];
    appointments: AppointmentData[];
}

export default function DashboardClient({ user, cards, websiteConfig, inquiries, appointments }: DashboardClientProps) {
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

    // State for real-time updates
    const [inquiriesList, setInquiriesList] = useState<InquiryData[]>(inquiries);
    const [appointmentsList, setAppointmentsList] = useState<AppointmentData[]>(appointments);

    useEffect(() => {
        // Subscribe to new inquiries
        const inquiryChannel = supabase
            .channel('website_inquiries_channel')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'website_inquiries',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    const newInquiry = payload.new as InquiryData;
                    setInquiriesList((prev) => [newInquiry, ...prev]);
                    toast({
                        title: "New Inquiry Received!",
                        description: `From: ${newInquiry.name}`,
                    });
                }
            )
            .subscribe();

        // Subscribe to new appointments
        const appointmentChannel = supabase
            .channel('appointments_channel')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'appointments',
                },
                async (payload) => {
                    const newAppointment = payload.new as AppointmentData;

                    // Fetch the card details for this appointment to display the name
                    const { data: cardData } = await supabase
                        .from('cards')
                        .select('full_name')
                        .eq('id', newAppointment.card_id)
                        .single();

                    const appointmentWithCard = {
                        ...newAppointment,
                        cards: cardData
                    };

                    setAppointmentsList((prev) => [appointmentWithCard, ...prev]);
                    toast({
                        title: "New Appointment Booked!",
                        description: `With: ${newAppointment.visitor_name}`,
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(inquiryChannel);
            supabase.removeChannel(appointmentChannel);
        };
    }, [supabase, user.id, toast]);

    // Calculate stats
    const totalInquiries = inquiriesList.length;
    const totalAppointments = appointmentsList.length;
    const totalCards = cards.length;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-brand-primary/5 pt-24 pb-12">
                <motion.div
                    className="container mx-auto px-4 max-w-7xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                        <div>
                            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
                                Dashboard
                            </h1>
                            <p className="text-muted-foreground mt-2 text-lg">
                                Welcome back, {user.email}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button asChild className="bg-brand-secondary hover:bg-brand-secondary/90 text-brand-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                                <Link href="/request">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Card
                                </Link>
                            </Button>
                            <Button variant="outline" onClick={handleLogout} className="border-brand-primary/20 hover:bg-brand-primary/5">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign out
                            </Button>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                        {[
                            { title: "Total Cards", value: totalCards, icon: CreditCard, desc: "Active business cards" },
                            { title: "Inquiries", value: totalInquiries, icon: MessageSquare, desc: "Messages received" },
                            { title: "Appointments", value: totalAppointments, icon: Calendar, desc: "Upcoming meetings" },
                            { title: "Website Status", value: websiteConfig ? "Active" : "Inactive", icon: Globe, desc: websiteConfig ? "Online and visible" : "Not yet published" }
                        ].map((stat, index) => (
                            <Card key={index} className="glass-card border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <stat.icon className="w-24 h-24 text-brand-secondary transform rotate-12 translate-x-8 -translate-y-8" />
                                </div>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                                    <stat.icon className="h-4 w-4 text-brand-secondary" />
                                </CardHeader>
                                <CardContent className="relative z-10">
                                    <div className="text-3xl font-bold text-brand-primary">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>

                    <Tabs defaultValue="overview" className="space-y-8">
                        <motion.div variants={itemVariants}>
                            <TabsList className="bg-brand-primary/5 p-1 rounded-xl">
                                <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all">Overview</TabsTrigger>
                                <TabsTrigger value="inquiries" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all">Inquiries</TabsTrigger>
                                <TabsTrigger value="appointments" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all">Appointments</TabsTrigger>
                            </TabsList>
                        </motion.div>

                        <TabsContent value="overview" className="space-y-8">
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
                                                            {window.location.host}/{websiteConfig.slug}
                                                            <ExternalLink className="ml-1 w-3 h-3" />
                                                        </a>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap gap-3">
                                                    <Button asChild className="bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md">
                                                        <Link href="/websites/realtor">
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
                                    <Card className="border-2 border-dashed border-brand-primary/20 bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors cursor-pointer" onClick={() => router.push('/websites/realtor')}>
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
                                    <Card className="border-2 border-dashed border-brand-primary/20 bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors cursor-pointer" onClick={() => router.push('/request')}>
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
                                                            Created: {format(new Date(card.created_at), "MMM d, yyyy")}
                                                        </p>
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
                        </TabsContent>

                        <TabsContent value="inquiries">
                            <motion.div variants={itemVariants}>
                                <Card className="glass-card border-none shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-brand-primary">Recent Inquiries</CardTitle>
                                        <CardDescription>
                                            Messages from your website contact form
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {inquiriesList.length === 0 ? (
                                            <div className="text-center py-12 text-muted-foreground bg-brand-primary/5 rounded-lg border-2 border-dashed border-brand-primary/10">
                                                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-brand-primary/20" />
                                                <p>No inquiries yet.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {inquiriesList.map((inquiry) => (
                                                    <div key={inquiry.id} className="group flex flex-col gap-3 p-6 bg-white/50 hover:bg-white/80 border border-brand-primary/10 rounded-xl transition-all duration-300 hover:shadow-md">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="font-bold text-lg text-brand-primary group-hover:text-brand-secondary transition-colors">{inquiry.name}</h4>
                                                                <a href={`mailto:${inquiry.email}`} className="text-sm text-muted-foreground hover:underline">{inquiry.email}</a>
                                                            </div>
                                                            <span className="text-xs font-medium px-2 py-1 bg-brand-primary/5 rounded-full text-brand-primary/70">
                                                                {format(new Date(inquiry.created_at), "MMM d, h:mm a")}
                                                            </span>
                                                        </div>
                                                        <div className="bg-white p-4 rounded-lg border border-brand-primary/5 text-sm text-foreground/80 leading-relaxed">
                                                            {inquiry.message}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="appointments">
                            <motion.div variants={itemVariants}>
                                <Card className="glass-card border-none shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-brand-primary">Upcoming Appointments</CardTitle>
                                        <CardDescription>
                                            Appointments scheduled through your business cards
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {appointmentsList.length === 0 ? (
                                            <div className="text-center py-12 text-muted-foreground bg-brand-primary/5 rounded-lg border-2 border-dashed border-brand-primary/10">
                                                <Calendar className="w-12 h-12 mx-auto mb-3 text-brand-primary/20" />
                                                <p>No upcoming appointments.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {appointmentsList.map((apt) => (
                                                    <div key={apt.id} className="flex flex-col md:flex-row gap-6 p-6 bg-white/50 hover:bg-white/80 border border-brand-primary/10 rounded-xl transition-all duration-300 hover:shadow-md items-start md:items-center">
                                                        <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-brand-primary/10 rounded-lg text-brand-primary">
                                                            <span className="text-xs font-bold uppercase">{format(new Date(apt.appointment_date), "MMM")}</span>
                                                            <span className="text-2xl font-bold">{format(new Date(apt.appointment_date), "d")}</span>
                                                        </div>

                                                        <div className="flex-grow space-y-1">
                                                            <h4 className="font-bold text-lg text-brand-primary">{apt.visitor_name}</h4>
                                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                                <span className="flex items-center gap-1">
                                                                    <MessageSquare className="w-3 h-3" />
                                                                    {apt.visitor_email}
                                                                </span>
                                                                {apt.visitor_phone && (
                                                                    <span className="flex items-center gap-1">
                                                                        <Users className="w-3 h-3" />
                                                                        {apt.visitor_phone}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="text-sm mt-2">
                                                                <span className="text-muted-foreground">Via Card: </span>
                                                                <span className="font-medium text-brand-secondary">{apt.cards?.full_name || 'Unknown Card'}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex-shrink-0 text-right">
                                                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-secondary/20 text-brand-primary text-sm font-bold">
                                                                {format(new Date(apt.appointment_date), "h:mm a")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>
        </MainLayout>
    );
}

"use client";

import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/components/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { OnboardingTour } from "@/components/OnboardingTour";
import { HelpWidget } from "@/components/HelpWidget";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { InquiriesTab } from "@/components/dashboard/InquiriesTab";
import { AppointmentsTab } from "@/components/dashboard/AppointmentsTab";
import { InquiryDialog } from "@/components/dashboard/InquiryDialog";
import { AppointmentDialog } from "@/components/dashboard/AppointmentDialog";

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

    // State for real-time updates
    const [inquiriesList, setInquiriesList] = useState<InquiryData[]>(inquiries);
    const [appointmentsList, setAppointmentsList] = useState<AppointmentData[]>(appointments);

    // State for UI interaction
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedInquiry, setSelectedInquiry] = useState<InquiryData | null>(null);
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentData | null>(null);

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

    // Tour State
    const [showTour, setShowTour] = useState(false);

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('hasSeenDashboardTour');
        if (!hasSeenTour) {
            // Small delay to ensure everything is rendered
            setTimeout(() => setShowTour(true), 1000);
        }
    }, []);

    const handleTourComplete = () => {
        setShowTour(false);
        localStorage.setItem('hasSeenDashboardTour', 'true');
        toast({
            title: "You're all set!",
            description: "Enjoy using your new dashboard.",
        });
    };

    const handleTourSkip = () => {
        setShowTour(false);
        localStorage.setItem('hasSeenDashboardTour', 'true');
    };

    const handleRestartTour = () => {
        setShowTour(true);
    };

    const tourSteps: import("@/components/OnboardingTour").TourStep[] = [
        {
            targetId: "tour-create-card",
            title: "Create Your First Card",
            description: "Start here to build your professional digital business card. Choose a template, add your details, and share it instantly.",
            position: "bottom"
        },
        {
            targetId: "tour-stats",
            title: "Quick Overview",
            description: "Keep track of your total cards, incoming messages, and upcoming appointments at a glance.",
            position: "bottom"
        },
        {
            targetId: "tour-tabs",
            title: "Manage Everything",
            description: "Switch between your Website, Inquiries, and Appointments tabs to manage different aspects of your digital presence.",
            position: "bottom"
        }
    ];

    return (
        <MainLayout>
            <OnboardingTour
                steps={tourSteps}
                isOpen={showTour}
                onComplete={handleTourComplete}
                onSkip={handleTourSkip}
            />
            <HelpWidget onRestartTour={handleRestartTour} />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-brand-primary/5 pt-24 pb-12">
                <motion.div
                    className="container mx-auto px-4 max-w-7xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <DashboardHeader
                        user={user}
                        handleLogout={handleLogout}
                        itemVariants={itemVariants}
                    />

                    <StatsGrid
                        totalCards={totalCards}
                        totalInquiries={totalInquiries}
                        totalAppointments={totalAppointments}
                        websiteConfig={websiteConfig}
                        setActiveTab={setActiveTab}
                        itemVariants={itemVariants}
                    />

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                        <motion.div id="tour-tabs" variants={itemVariants}>
                            <TabsList className="bg-brand-primary/5 p-1 rounded-xl">
                                <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all">Overview</TabsTrigger>
                                <TabsTrigger value="inquiries" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all">Inquiries</TabsTrigger>
                                <TabsTrigger value="appointments" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all">Appointments</TabsTrigger>
                            </TabsList>
                        </motion.div>

                        <TabsContent value="overview">
                            <OverviewTab
                                websiteConfig={websiteConfig}
                                cards={cards}
                                handleDeleteWebsite={handleDeleteWebsite}
                                handleDeleteCard={handleDeleteCard}
                                handleCopyLink={handleCopyLink}
                                handleShare={handleShare}
                                itemVariants={itemVariants}
                            />
                        </TabsContent>

                        <TabsContent value="inquiries">
                            <InquiriesTab
                                inquiries={inquiriesList}
                                setSelectedInquiry={setSelectedInquiry}
                                itemVariants={itemVariants}
                            />
                        </TabsContent>

                        <TabsContent value="appointments">
                            <AppointmentsTab
                                appointments={appointmentsList}
                                setSelectedAppointment={setSelectedAppointment}
                                itemVariants={itemVariants}
                            />
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>

            <InquiryDialog
                inquiry={selectedInquiry}
                onClose={() => setSelectedInquiry(null)}
            />

            <AppointmentDialog
                appointment={selectedAppointment}
                onClose={() => setSelectedAppointment(null)}
            />
        </MainLayout>
    );
}

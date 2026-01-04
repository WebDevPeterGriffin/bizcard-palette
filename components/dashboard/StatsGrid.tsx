"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, MessageSquare, Calendar, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Tables } from "@/integrations/supabase/types";

type WebsiteConfigData = Tables<"website_configs">;

interface StatsGridProps {
    totalCards: number;
    totalInquiries: number;
    totalAppointments: number;
    websiteConfig: WebsiteConfigData | null;
    setActiveTab: (tab: string) => void;
    itemVariants: any;
}

export function StatsGrid({
    totalCards,
    totalInquiries,
    totalAppointments,
    websiteConfig,
    setActiveTab,
    itemVariants
}: StatsGridProps) {
    const stats = [
        { title: "Total Cards", value: totalCards, icon: CreditCard, desc: "Active business cards", tab: "overview" },
        { title: "Inquiries", value: totalInquiries, icon: MessageSquare, desc: "Messages received", tab: "inquiries" },
        { title: "Appointments", value: totalAppointments, icon: Calendar, desc: "Upcoming meetings", tab: "appointments" },
        { title: "Website Status", value: websiteConfig ? "Active" : "Inactive", icon: Globe, desc: websiteConfig ? "Online and visible" : "Not yet published", tab: "overview" }
    ];

    return (
        <motion.div id="tour-stats" variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12 relative z-10">
            {stats.map((stat, index) => (
                <Card
                    key={index}
                    className={`glass-card border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative ${stat.tab ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
                    onClick={() => stat.tab && setActiveTab(stat.tab)}
                >
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
    );
}

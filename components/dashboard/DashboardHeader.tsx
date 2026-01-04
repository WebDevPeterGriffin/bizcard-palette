"use client";

import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, LogOut } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
    user: User;
    handleLogout: () => void;
    itemVariants: any;
}

export function DashboardHeader({ user, handleLogout, itemVariants }: DashboardHeaderProps) {
    return (
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 relative z-20">
            <div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
                    Dashboard
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Welcome back, {user.email}
                </p>
            </div>
            <div className="flex items-center gap-4">
                <Button id="tour-create-card" asChild className="bg-brand-secondary hover:bg-brand-secondary/90 text-brand-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative z-30">
                    <Link href="/request">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Card
                    </Link>
                </Button>
                <Button variant="outline" onClick={handleLogout} className="border-brand-primary/20 hover:bg-brand-primary/5 relative z-30">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                </Button>
            </div>
        </motion.div>
    );
}

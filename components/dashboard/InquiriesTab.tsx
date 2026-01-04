"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Tables } from "@/integrations/supabase/types";

type InquiryData = Tables<"website_inquiries">;

interface InquiriesTabProps {
    inquiries: InquiryData[];
    setSelectedInquiry: (inquiry: InquiryData) => void;
    itemVariants: any;
}

export function InquiriesTab({ inquiries, setSelectedInquiry, itemVariants }: InquiriesTabProps) {
    return (
        <motion.div variants={itemVariants}>
            <Card className="glass-card border-none shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-brand-primary">Recent Inquiries</CardTitle>
                    <CardDescription>
                        Messages from your website contact form
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {inquiries.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground bg-brand-primary/5 rounded-lg border-2 border-dashed border-brand-primary/10">
                            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-brand-primary/20" />
                            <p>No inquiries yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {inquiries.map((inquiry) => (
                                <div
                                    key={inquiry.id}
                                    className="group flex flex-col gap-3 p-6 bg-white/50 hover:bg-white/80 border border-brand-primary/10 rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer relative overflow-hidden"
                                    onClick={() => setSelectedInquiry(inquiry)}
                                >
                                    <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-300" />
                                    <div className="flex justify-between items-start relative z-10">
                                        <div>
                                            <h4 className="font-bold text-lg text-brand-primary group-hover:text-brand-secondary transition-colors">{inquiry.name}</h4>
                                            <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                                        </div>
                                        <span className="text-xs font-medium px-2 py-1 bg-brand-primary/5 rounded-full text-brand-primary/70">
                                            {format(new Date(inquiry.created_at), "MMM d, h:mm a")}
                                        </span>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-brand-primary/5 text-sm text-foreground/80 leading-relaxed relative z-10 line-clamp-2">
                                        {inquiry.message}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}

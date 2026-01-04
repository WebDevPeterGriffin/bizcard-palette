"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { MessageSquare, Mail } from "lucide-react";
import { format } from "date-fns";
import { Tables } from "@/integrations/supabase/types";

type InquiryData = Tables<"website_inquiries">;

interface InquiryDialogProps {
    inquiry: InquiryData | null;
    onClose: () => void;
}

export function InquiryDialog({ inquiry, onClose }: InquiryDialogProps) {
    return (
        <Dialog open={!!inquiry} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="glass-card border-brand-primary/10 sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-brand-primary flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-brand-secondary" />
                        Inquiry Details
                    </DialogTitle>
                    <DialogDescription>
                        Received on {inquiry && format(new Date(inquiry.created_at), "MMMM d, yyyy 'at' h:mm a")}
                    </DialogDescription>
                </DialogHeader>

                {inquiry && (
                    <div className="space-y-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</label>
                                <p className="font-semibold text-lg">{inquiry.name}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
                                <p className="font-medium text-brand-primary">{inquiry.email}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</label>
                            <div className="bg-white/50 p-4 rounded-lg border border-brand-primary/10 text-sm leading-relaxed">
                                {inquiry.message}
                            </div>
                        </div>
                    </div>
                )}

                <DialogFooter className="sm:justify-between gap-2">
                    <Button variant="ghost" onClick={onClose}>
                        Close
                    </Button>
                    {inquiry && (
                        <Button asChild className="bg-brand-primary text-white hover:bg-brand-primary/90">
                            <a href={`mailto:${inquiry.email}?subject=Re: Inquiry from ${inquiry.name}`}>
                                <Mail className="mr-2 h-4 w-4" />
                                Reply via Email
                            </a>
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

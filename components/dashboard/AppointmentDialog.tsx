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
import { Calendar, Mail, Phone } from "lucide-react";
import { format } from "date-fns";
import { Tables } from "@/integrations/supabase/types";

type AppointmentData = Tables<"appointments"> & { cards: { full_name: string } | null };

interface AppointmentDialogProps {
    appointment: AppointmentData | null;
    onClose: () => void;
}

export function AppointmentDialog({ appointment, onClose }: AppointmentDialogProps) {
    return (
        <Dialog open={!!appointment} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="glass-card border-brand-primary/10 sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-brand-primary flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-brand-secondary" />
                        Appointment Details
                    </DialogTitle>
                    <DialogDescription>
                        Scheduled for {appointment && format(new Date(appointment.appointment_date), "MMMM d, yyyy 'at' h:mm a")}
                    </DialogDescription>
                </DialogHeader>

                {appointment && (
                    <div className="space-y-6 py-4">
                        <div className="flex items-center gap-4 p-4 bg-brand-secondary/10 rounded-lg border border-brand-secondary/20">
                            <div className="flex-shrink-0 w-12 h-12 bg-brand-secondary/20 rounded-full flex items-center justify-center text-brand-primary font-bold text-xl">
                                {format(new Date(appointment.appointment_date), "d")}
                            </div>
                            <div>
                                <p className="font-bold text-brand-primary text-lg">
                                    {format(new Date(appointment.appointment_date), "MMMM yyyy")}
                                </p>
                                <p className="text-brand-primary/80">
                                    {format(new Date(appointment.appointment_date), "EEEE, h:mm a")}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Visitor Name</label>
                                <p className="font-semibold text-lg">{appointment.visitor_name}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Source Card</label>
                                <p className="font-medium text-brand-primary">{appointment.cards?.full_name || 'Unknown'}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{appointment.visitor_email}</span>
                            </div>
                            {appointment.visitor_phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">{appointment.visitor_phone}</span>
                                </div>
                            )}
                        </div>

                        {appointment.message && (
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</label>
                                <div className="bg-white/50 p-4 rounded-lg border border-brand-primary/10 text-sm leading-relaxed italic">
                                    "{appointment.message}"
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button variant="ghost" onClick={onClose}>
                        Close
                    </Button>
                    <div className="flex gap-2">
                        {appointment && appointment.visitor_phone && (
                            <Button asChild variant="outline" className="border-brand-primary/20">
                                <a href={`tel:${appointment.visitor_phone}`}>
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call
                                </a>
                            </Button>
                        )}
                        {appointment && (
                            <Button asChild className="bg-brand-primary text-white hover:bg-brand-primary/90">
                                <a href={`mailto:${appointment.visitor_email}?subject=Regarding our appointment on ${format(new Date(appointment.appointment_date), "MMM d")}`}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Email
                                </a>
                            </Button>
                        )}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

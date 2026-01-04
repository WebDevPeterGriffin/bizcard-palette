"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare, Users } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Tables } from "@/integrations/supabase/types";

type AppointmentData = Tables<"appointments"> & { cards: { full_name: string } | null };

interface AppointmentsTabProps {
    appointments: AppointmentData[];
    setSelectedAppointment: (appointment: AppointmentData) => void;
    itemVariants: any;
}

export function AppointmentsTab({ appointments, setSelectedAppointment, itemVariants }: AppointmentsTabProps) {
    return (
        <motion.div variants={itemVariants}>
            <Card className="glass-card border-none shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-brand-primary">Upcoming Appointments</CardTitle>
                    <CardDescription>
                        Appointments scheduled through your business cards
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {appointments.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground bg-brand-primary/5 rounded-lg border-2 border-dashed border-brand-primary/10">
                            <Calendar className="w-12 h-12 mx-auto mb-3 text-brand-primary/20" />
                            <p>No upcoming appointments.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {appointments.map((apt) => (
                                <div
                                    key={apt.id}
                                    className="flex flex-col md:flex-row gap-6 p-6 bg-white/50 hover:bg-white/80 border border-brand-primary/10 rounded-xl transition-all duration-300 hover:shadow-md items-start md:items-center cursor-pointer relative overflow-hidden group"
                                    onClick={() => setSelectedAppointment(apt)}
                                >
                                    <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-300" />
                                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-brand-primary/10 rounded-lg text-brand-primary relative z-10">
                                        <span className="text-xs font-bold uppercase">{format(new Date(apt.appointment_date), "MMM")}</span>
                                        <span className="text-2xl font-bold">{format(new Date(apt.appointment_date), "d")}</span>
                                    </div>

                                    <div className="flex-grow space-y-1 relative z-10">
                                        <h4 className="font-bold text-lg text-brand-primary group-hover:text-brand-secondary transition-colors">{apt.visitor_name}</h4>
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

                                    <div className="flex-shrink-0 text-right relative z-10">
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
    );
}

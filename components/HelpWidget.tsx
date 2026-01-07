"use client";

import { useState } from "react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Play, Mail, MessageCircle } from "lucide-react";

interface HelpWidgetProps {
    onRestartTour: () => void;
}

export function HelpWidget({ onRestartTour }: HelpWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleRestart = () => {
        setIsOpen(false);
        onRestartTour();
    };

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        size="icon"
                        className="h-14 w-14 rounded-full shadow-2xl bg-brand-primary text-white hover:bg-brand-primary/90 hover:scale-105 transition-all duration-300"
                    >
                        <HelpCircle className="h-8 w-8" />
                        <span className="sr-only">Open Help</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="text-2xl font-bold text-brand-primary flex items-center gap-2">
                            <HelpCircle className="h-6 w-6 text-brand-secondary" />
                            Help & Support
                        </SheetTitle>
                        <SheetDescription>
                            Need assistance? We're here to help you get the most out of your digital business cards.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="space-y-8">
                        {/* Quick Actions */}
                        <section className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Quick Actions</h3>
                            <Button
                                variant="outline"
                                className="w-full justify-start h-auto py-4 px-4 border-brand-primary/10 hover:bg-brand-primary/5 hover:border-brand-primary/20"
                                onClick={handleRestart}
                            >
                                <div className="bg-brand-secondary/20 p-2 rounded-full mr-4">
                                    <Play className="h-5 w-5 text-brand-primary" />
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-brand-primary">Restart Product Tour</div>
                                    <div className="text-xs text-muted-foreground">Take the interactive walkthrough again</div>
                                </div>
                            </Button>
                        </section>

                        {/* FAQs */}
                        <section className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Frequently Asked Questions</h3>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-brand-primary font-medium">How do I create a digital card?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Click the "Create Card" button in the top right corner of your dashboard. You'll be guided through choosing a template and adding your information.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-brand-primary font-medium">Can I use my own domain?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Yes! Go to the "Overview" tab and click the "Connect Domain" button. Enter your domain (e.g., yoursite.com) and follow the instructions to update your DNS records.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-brand-primary font-medium">How do I edit my website?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Go to the "Overview" tab and click "Edit Website" in the "My Website" section. This will open the website builder where you can customize your site.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="text-brand-primary font-medium">How do I publish my website?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        In the dashboard or builder, toggle the "Published" switch to make your site live. When unpublished, your site is only visible to you.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-5">
                                    <AccordionTrigger className="text-brand-primary font-medium">Where do inquiries go?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        All messages from your contact forms appear in the "Inquiries" tab. You'll also receive an email notification for each new message.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-6">
                                    <AccordionTrigger className="text-brand-primary font-medium">How do I manage appointments?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Go to the "Appointments" tab to view upcoming bookings. You can see client details and meeting times. Ensure your Google Calendar is connected for sync.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </section>

                        {/* Contact Support */}
                        <section className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Still need help?</h3>
                            <div className="grid gap-4">
                                <a
                                    href="mailto:support@mildtechstudios.com"
                                    className="flex items-center p-4 rounded-xl border border-brand-primary/10 bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors"
                                >
                                    <Mail className="h-5 w-5 text-brand-secondary mr-3" />
                                    <div>
                                        <div className="font-semibold text-brand-primary">Email Support</div>
                                        <div className="text-xs text-muted-foreground">Get a response within 24 hours</div>
                                    </div>
                                </a>
                                <div className="flex items-center p-4 rounded-xl border border-brand-primary/10 bg-brand-primary/5 opacity-75 cursor-not-allowed">
                                    <MessageCircle className="h-5 w-5 text-brand-secondary mr-3" />
                                    <div>
                                        <div className="font-semibold text-brand-primary">Live Chat</div>
                                        <div className="text-xs text-muted-foreground">Coming soon</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

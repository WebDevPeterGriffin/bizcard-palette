"use client";

import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Instagram, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function Contact() {
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert({ name, email, message });

            if (error) throw error;

            // Notify admin (non-blocking)
            supabase.functions.invoke('notify-admin', {
                body: {
                    type: 'contact',
                    data: { name, email, message }
                }
            }).catch(err => console.error('Email notification failed:', err));

            toast.success("Message sent successfully!", {
                description: "We'll get back to you as soon as possible.",
            });
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message", {
                description: "Please try again later or email us directly.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Hero Section */}
            <PageHero
                title={<>Let's Build Something <span className="text-[#F0B429]">Great Together</span></>}
                subtitle="Have a question or want to work with us? We'd love to hear from you."
            />

            <section className="py-24 px-4 bg-slate-50 -mt-10">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                            <h2 className="text-2xl font-bold text-[#1A2D49] mb-6">Send us a message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" placeholder="Your name" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" name="message" placeholder="How can we help you?" className="min-h-[150px]" required />
                                </div>
                                <Button
                                    type="submit"
                                    variant="brand"
                                    className="w-full py-6"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Sending..." : (
                                        <>
                                            Send Message
                                            <Send className="ml-2 w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>

                        {/* Alternative Contacts */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-[#1A2D49] mb-6">Other ways to connect</h2>
                                <p className="text-slate-600 mb-8">
                                    Prefer to reach out directly? Here are other ways to get in touch with our team.
                                </p>
                            </div>

                            <div className="grid gap-6">
                                <a href="mailto:hello@mildtechstudios.com" className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1A2D49]">Email Us</h3>
                                        <p className="text-slate-500">hello@mildtechstudios.com</p>
                                    </div>
                                </a>

                                <a href="https://instagram.com/web.dev.peter" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                                    <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 group-hover:bg-pink-100 transition-colors">
                                        <Instagram className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1A2D49]">Instagram</h3>
                                        <p className="text-slate-500">@web.dev.peter</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group cursor-pointer" onClick={() => toast.info("Discord community coming soon!")}>
                                    <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1A2D49]">Discord</h3>
                                        <p className="text-slate-500">Join our community (Coming Soon)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

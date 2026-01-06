"use client";

import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Layout, Smartphone, Zap, Globe, Palette, Shield, CheckCircle2, Eye, Edit } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function TemplatesPage() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setIsLoggedIn(!!user);
        };
        checkAuth();
    }, []);

    const features = [
        {
            icon: <Globe className="w-6 h-6 text-[#F0B429]" />,
            title: "SEO Optimized",
            description: "Built with best practices to help you rank higher on Google."
        },
        {
            icon: <Smartphone className="w-6 h-6 text-[#F0B429]" />,
            title: "Mobile First",
            description: "Looks perfect on every device, from phones to desktops."
        },
        {
            icon: <Zap className="w-6 h-6 text-[#F0B429]" />,
            title: "Blazing Fast",
            description: "Optimized for speed to keep your visitors engaged."
        },
        {
            icon: <Palette className="w-6 h-6 text-[#F0B429]" />,
            title: "Easy Customization",
            description: "Change colors, fonts, and content with zero coding."
        },
        {
            icon: <Layout className="w-6 h-6 text-[#F0B429]" />,
            title: "Modern Layouts",
            description: "Professionally designed templates that convert."
        },
        {
            icon: <Shield className="w-6 h-6 text-[#F0B429]" />,
            title: "Secure Hosting",
            description: "Reliable infrastructure to keep your site online 24/7."
        }
    ];

    const handleGetStarted = (template: string) => {
        if (isLoggedIn) {
            router.push(`/websites/${template}`);
        } else {
            router.push(`/auth/login?redirect=/websites/${template}`);
        }
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-white font-sans text-slate-900">
                <PageHero
                    title={<>Website Templates That <span className="text-[#F0B429]">Convert</span></>}
                    subtitle="Launch a professional website in minutes. Perfect for personal brands, portfolios, and small businesses."
                >
                    <Button
                        variant="cta"
                        size="lg"
                        className="px-8 py-6 text-lg"
                        onClick={() => {
                            const element = document.getElementById('templates');
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Browse Templates
                    </Button>
                </PageHero>

                {/* Templates Grid */}
                <section id="templates" className="py-24 px-4 bg-slate-50">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1A2D49] mb-4">
                                Premium Templates
                            </h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                Choose a template to get started. More coming soon.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Realtor Template */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col">
                                <div className="h-64 bg-slate-900 relative flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 opacity-90"></div>
                                    <div className="relative z-10 text-center p-6">
                                        <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider mb-3 border border-amber-500/30">
                                            REAL ESTATE
                                        </span>
                                        <h3 className="text-2xl font-serif font-bold text-white mb-2">Luxe Estates</h3>
                                        <p className="text-slate-400 text-sm">For luxury realtors and agencies</p>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="space-y-3 mb-6 flex-1">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            <span>Premium Animations</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            <span>Lead Capture Form</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            <span>Mobile Optimized</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => window.open('/templates/realtor', '_blank')}
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            Preview
                                        </Button>
                                        <Button
                                            className="w-full bg-[#1A2D49] hover:bg-[#1A2D49]/90"
                                            onClick={() => handleGetStarted('realtor')}
                                        >
                                            <Edit className="w-4 h-4 mr-2" />
                                            Customize
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Creative Template */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col">
                                <div className="h-64 bg-black relative flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-black opacity-90"></div>
                                    <div className="relative z-10 text-center p-6">
                                        <span className="inline-block py-1 px-3 rounded-full bg-purple-500/20 text-purple-400 text-xs font-semibold tracking-wider mb-3 border border-purple-500/30">
                                            CREATIVE
                                        </span>
                                        <h3 className="text-2xl font-sans font-black text-white mb-2 tracking-tighter">THE VISIONARY</h3>
                                        <p className="text-zinc-400 text-sm">For agencies and creatives</p>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="space-y-3 mb-6 flex-1">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle2 className="w-4 h-4 text-purple-500" />
                                            <span>Scroll Animations</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle2 className="w-4 h-4 text-purple-500" />
                                            <span>Parallax Effects</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle2 className="w-4 h-4 text-purple-500" />
                                            <span>Dark Mode</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => window.open('/templates/creative', '_blank')}
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            Preview
                                        </Button>
                                        <Button
                                            className="w-full bg-black hover:bg-zinc-800 text-white"
                                            onClick={() => handleGetStarted('creative')}
                                        >
                                            <Edit className="w-4 h-4 mr-2" />
                                            Customize
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Coming Soon Placeholder */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group opacity-60">
                                <div className="h-64 bg-slate-200 relative flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100"></div>
                                    <Layout className="w-16 h-16 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#1A2D49] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                        Coming Soon
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="h-6 w-2/3 bg-slate-100 rounded mb-3"></div>
                                    <div className="h-4 w-full bg-slate-50 rounded mb-2"></div>
                                    <div className="h-4 w-5/6 bg-slate-50 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-24 px-4 bg-white">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1A2D49] mb-4">
                                Why Our Templates?
                            </h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                Every template is built with conversion and usability in mind.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="p-6 rounded-2xl border border-slate-100 hover:border-[#F0B429]/30 hover:shadow-lg transition-all">
                                    <div className="inline-flex items-center justify-center p-3 bg-[#F0B429]/10 rounded-xl mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-[#1A2D49] mb-2">{feature.title}</h3>
                                    <p className="text-slate-600 text-sm">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}

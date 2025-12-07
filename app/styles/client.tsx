"use client";

import { Button } from "@/components/ui/button";
import { Eye, Sparkles, Check, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { CARD_META, type CardStyleId } from "@/components/cards/registry";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHero from "@/components/PageHero";
import HowItWorksSection from "@/components/homepage/HowItWorksSection";

const StylesClient = () => {
    const router = useRouter();
    const [filter, setFilter] = useState<string>("all");

    const allStyles = (Object.keys(CARD_META) as CardStyleId[]).map((id) => ({
        id,
        ...CARD_META[id]
    }));

    const cardStyles = filter === "all"
        ? allStyles
        : allStyles.filter(style => style.category === filter);

    const handleRequestStyle = (styleId: string) => {
        router.push(`/request?style=${styleId}`);
    };

    return (
        <div className="min-h-screen bg-background font-sans text-slate-900">
            <PageHero
                title={<>Choose Your <br /> <span className="text-[#F0B429]">Digital Card Style</span></>}
                subtitle="Professionally designed styles optimized for every device. Choose a look that fits your brand."
            >
                <Button
                    variant="cta"
                    className="px-8 py-4 h-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto min-w-[160px]"
                    onClick={() => {
                        const element = document.getElementById('styles-grid');
                        element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    className="px-8 py-4 h-auto text-white border border-white/40 hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto min-w-[160px]"
                    onClick={() => router.push('/')}
                >
                    Back to Homepage
                </Button>
            </PageHero>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-20" id="styles-grid">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A2D49] mb-4">Explore Our Collection</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Filter by category to find the perfect style for your needs.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex justify-center mb-16">
                        <Tabs value={filter} onValueChange={setFilter} className="w-full max-w-md">
                            <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 rounded-xl">
                                <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#1A2D49] font-medium">All</TabsTrigger>
                                <TabsTrigger value="Professional" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#1A2D49] font-medium">Pro</TabsTrigger>
                                <TabsTrigger value="Modern" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#1A2D49] font-medium">Modern</TabsTrigger>
                                <TabsTrigger value="Creative" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#1A2D49] font-medium">Creative</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Styles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {cardStyles.map((style) => (
                            <div key={style.id} className="group flex flex-col">
                                {/* Card Preview Container */}
                                <div
                                    className="relative w-full mb-6 overflow-hidden rounded-2xl transition-all duration-300 group-hover:shadow-2xl shadow-lg ring-1 ring-black/5 cursor-pointer group-hover:scale-[1.02]"
                                    onClick={() => router.push(`/preview/${style.id}`)}
                                >
                                    {/* Background Visual */}
                                    <div className={`h-72 ${style.gradient} flex items-center justify-center p-6 relative w-full`}>

                                        {/* Glass Overlay Preview (Standardized for all cards) */}
                                        <div className="relative z-10 w-full max-w-[240px] aspect-[1.58/1] rounded-xl overflow-hidden shadow-xl">
                                            {/* Glass Effect Background */}
                                            <div className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30"></div>

                                            {/* Content */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                                {/* Avatar Placeholder */}
                                                <div className={`w-10 h-10 rounded-full mb-3 shadow-inner ${style.isDark ? 'bg-white/30' : 'bg-[#1A2D49]/10'}`}></div>

                                                {/* Text */}
                                                <div className="space-y-1">
                                                    <div className={`text-lg font-bold drop-shadow-sm leading-tight ${style.isDark ? 'text-white' : 'text-[#1A2D49]'}`}>James Smith</div>
                                                    <div className={`text-xs font-medium uppercase tracking-wider ${style.isDark ? 'text-white/80' : 'text-[#1A2D49]/80'}`}>{style.name}</div>
                                                </div>

                                                {/* Decorative Lines */}
                                                <div className={`mt-3 w-12 h-0.5 rounded-full ${style.isDark ? 'bg-white/40' : 'bg-[#1A2D49]/40'}`}></div>
                                            </div>
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                                    </div>
                                </div>

                                {/* Card Info & Actions */}
                                <div className="flex flex-col gap-4 px-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#1A2D49]">
                                                {style.name}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                                    {style.category}
                                                </span>
                                                {style.category === "Modern" && <Sparkles className="h-3 w-3 text-[#F0B429]" />}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="grid grid-cols-2 gap-3 mt-2">
                                        <Button
                                            variant="outline-brand"
                                            onClick={() => router.push(`/preview/${style.id}`)}
                                            className="w-full"
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            Preview
                                        </Button>
                                        <Button
                                            variant="cta"
                                            onClick={() => handleRequestStyle(style.id)}
                                            className="w-full shadow-md hover:shadow-lg"
                                        >
                                            <Check className="mr-2 h-4 w-4" />
                                            Choose
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <HowItWorksSection />
        </div>
    );
};

export default StylesClient;

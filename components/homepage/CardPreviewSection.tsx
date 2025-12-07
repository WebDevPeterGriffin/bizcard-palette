"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { CARD_META, type CardStyleId } from "@/components/cards/registry";

export default function CardPreviewSection() {
    const router = useRouter();

    // Show featured styles (first 4)
    const featuredStyles: CardStyleId[] = ["minimal", "bold", "elegant", "liquid-glass"];

    const cardStyles = featuredStyles.map(id => ({
        id,
        ...CARD_META[id]
    }));

    return (
        <section className="px-4 pt-8 pb-16 md:pt-12 md:pb-20 bg-white">
            <div className="container mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1A2D49] mb-3">
                        Digital Business Card Styles
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Choose from our collection of professionally designed templates.
                    </p>
                </div>

                {/* Card Grid - 4 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
                    {cardStyles.map((style) => (
                        <div
                            key={style.id}
                            className="group cursor-pointer flex flex-col items-center"
                            onClick={() => router.push(`/preview/${style.id}`)}
                        >
                            {/* Card Preview Container */}
                            <div className="w-full mb-4 overflow-hidden rounded-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl shadow-lg hover:shadow-xl ring-1 ring-black/5">
                                <div className={`h-56 md:h-60 ${style.gradient} flex items-center justify-center p-4 relative w-full`}>
                                    {/* Standardized Glass Overlay for All Cards */}
                                    <div className="relative z-10 w-full max-w-[220px] aspect-[1.58/1] rounded-xl overflow-hidden shadow-xl">
                                        {/* Glass Effect Background */}
                                        <div className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30"></div>

                                        {/* Content */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                            {/* Avatar Placeholder */}
                                            <div className={`w-10 h-10 rounded-full mb-3 shadow-inner ${style.isDark ? 'bg-white/30' : 'bg-[#1A2D49]/10'}`}></div>

                                            {/* Text */}
                                            <div className="space-y-1">
                                                <div className={`text-lg font-bold drop-shadow-sm leading-tight ${style.isDark ? 'text-white' : 'text-[#1A2D49]'}`}>James Smith</div>
                                                <div className={`text-xs font-medium uppercase tracking-wider ${style.isDark ? 'text-white/80' : 'text-[#1A2D49]/80'}`}>
                                                    {style.name}
                                                </div>
                                            </div>

                                            {/* Decorative Lines */}
                                            <div className={`mt-3 w-12 h-0.5 rounded-full ${style.isDark ? 'bg-white/40' : 'bg-[#1A2D49]/40'}`}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Name */}
                            <h3 className="text-center text-lg font-semibold text-slate-800 group-hover:text-[#1A2D49] transition-colors">
                                {style.name}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Button
                        variant="outline-brand"
                        size="lg"
                        onClick={() => router.push('/styles')}
                        className="px-10 py-6 text-lg rounded-full"
                    >
                        View All 13 Styles
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}

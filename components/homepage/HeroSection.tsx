"use client";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import FloatingOrbs from "@/components/FloatingOrbs";
import { useWaitlist } from "@/hooks/useWaitlist";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    const router = useRouter();
    const { openWaitlist } = useWaitlist();

    return (
        <section className="relative min-h-[80vh] overflow-hidden flex items-center justify-center px-4 py-20">
            {/* Gradient Background - Navy to Gold */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, #1A2D49 0%, #3D5A73 35%, #8B7355 65%, #F0B429 100%)',
                }}
            />

            {/* Floating orbs */}
            <FloatingOrbs />

            {/* Glassmorphic Hero Card */}
            <div className="container mx-auto max-w-5xl relative z-10 flex items-center justify-center mt-16">
                <div
                    className="rounded-3xl p-8 md:p-12 text-center w-full max-w-4xl"
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {/* Headline */}
                    <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                        Build Your Online Presence
                        <br />
                        <span className="text-[#F0B429]">In Minutes</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="mb-8 text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
                        Digital business cards, modern website templates, and smart tools for creators and professionals.
                        <br className="hidden md:block" />
                        <span className="block mt-2 text-white/80 text-base md:text-lg">
                            Tools that help you stand out instantly — no coding, no setup, no technical skills.
                        </span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            variant="cta"
                            className="px-8 py-4 h-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto min-w-[160px]"
                            onClick={() => {
                                const element = document.getElementById('products');
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Explore Tools
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            className="px-8 py-4 h-auto text-white border border-white/40 hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto min-w-[160px]"
                            onClick={openWaitlist}
                        >
                            Join Waitlist
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

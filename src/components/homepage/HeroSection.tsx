import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingOrbs from "@/components/FloatingOrbs";

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-[25vh] md:min-h-[30vh] overflow-hidden flex items-center justify-center px-4 py-6 md:py-8">
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
            <div className="container mx-auto max-w-4xl relative z-10 flex items-center justify-center">
                <div
                    className="rounded-3xl p-5 md:p-6 lg:p-8 text-center w-full max-w-3xl"
                    style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {/* Headline */}
                    <h1 className="mb-3 md:mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                        Your Digital Business Card,
                        <br />
                        Beautifully Crafted
                    </h1>

                    {/* Subheadline */}
                    <p className="mb-5 md:mb-6 text-base md:text-lg text-white/95 font-medium">
                        Create stunning modern digital business cards in seconds.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <button
                            className="px-5 md:px-7 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-medium text-white border border-white/40 hover:bg-white/10 transition-all backdrop-blur-sm w-full sm:w-auto"
                            onClick={() => navigate('/styles')}
                        >
                            Business Cards
                        </button>
                        <button
                            className="px-5 md:px-7 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-bold bg-[#F0B429] text-[#1A2D49] hover:bg-[#D9A024] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 w-full sm:w-auto"
                            onClick={() => navigate('/request')}
                        >
                            Get Started
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { ReactNode } from "react";
import FloatingOrbs from "@/components/FloatingOrbs";

interface PageHeroProps {
    title: ReactNode;
    subtitle: ReactNode;
    children?: ReactNode;
    className?: string;
}

export default function PageHero({ title, subtitle, children, className = "" }: PageHeroProps) {
    return (
        <section className={`relative min-h-[60vh] overflow-hidden flex items-center justify-center px-4 py-20 ${className}`}>
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
            <div className="container mx-auto max-w-5xl relative z-10 flex items-center justify-center mt-8">
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
                        {title}
                    </h1>

                    {/* Subheadline */}
                    <p className="mb-8 text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>

                    {/* CTA Buttons */}
                    {children && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

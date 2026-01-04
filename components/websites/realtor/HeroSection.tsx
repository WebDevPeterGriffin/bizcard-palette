"use client";

import React from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useBuilder } from "@/context/BuilderContext";
import { EditableText } from "@/components/builder/EditableText";
import { EditableImage } from "@/components/builder/EditableImage";

export const HeroSection = () => {
    const { config } = useBuilder();
    const revealRef = useSectionReveal();

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background with Gradient Fallback */}
            <div className="absolute inset-0" style={{ backgroundColor: 'var(--primary)' }}>
                <div className="absolute inset-0 opacity-90 z-10" style={{ background: `linear-gradient(to bottom right, var(--primary), #000)` }} />
                <div className="absolute inset-0 mix-blend-overlay opacity-40">
                    <EditableImage
                        id="hero-bg"
                        initialValue={config.content.images['hero-bg'] || 'https://images.unsplash.com/photo-1600596542815-27b88e54e618?q=80&w=2076&auto=format&fit=crop'}
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center" ref={revealRef}>
                <span
                    className="inline-block py-1 px-3 rounded-full text-sm font-semibold tracking-wider mb-6 border"
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'var(--secondary)',
                        borderColor: 'var(--secondary)'
                    }}
                >
                    PREMIUM REAL ESTATE
                </span>
                <EditableText
                    id="hero.title"
                    initialValue={config.content.text['hero.title']}
                    as="h1"
                    multiline
                    className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight"
                />
                <EditableText
                    id="hero.subtitle"
                    initialValue={config.content.text['hero.subtitle']}
                    as="p"
                    className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
                />
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <EditableText
                        id="hero.cta"
                        initialValue={config.content.text['hero.cta']}
                        as="a"
                        className="px-8 py-4 text-slate-900 rounded-full font-bold transition-all transform hover:scale-105 inline-block"
                        style={{ backgroundColor: 'var(--secondary)' }}
                    />
                    <a
                        href="#contact"
                        className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-sm"
                    >
                        Contact Me
                    </a>
                </div>
            </div>
        </section>
    );
};

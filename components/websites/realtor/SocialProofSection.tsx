"use client";

import React from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { Star } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";
import { EditableText } from "@/components/builder/EditableText";

export const SocialProofSection = () => {
    const { config } = useBuilder();
    const revealRef = useSectionReveal();

    const testimonials = [
        {
            text: "We couldn't have asked for a better agent. Their knowledge of the market and negotiation skills got us our dream home under asking price!",
            author: "Sarah & James M.",
            location: "Beverly Hills, CA",
        },
        {
            text: "Professional, attentive, and incredibly hardworking. Sold our property in record time for a price we didn't think was possible.",
            author: "Robert T.",
            location: "Hollywood Hills, CA",
        },
        {
            text: "Guided us through every step of the process with patience and expertise. Truly went above and beyond our expectations.",
            author: "Emily R.",
            location: "Santa Monica, CA",
        },
    ];

    return (
        <section id="testimonials" className="py-24" style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16" ref={revealRef}>
                    <EditableText
                        id="social.title"
                        initialValue={config.content.text['social.title']}
                        as="h2"
                        className="font-semibold tracking-wide uppercase mb-3 inline-block"
                        style={{ color: 'var(--secondary)' }}
                    />
                    <EditableText
                        id="social.subtitle"
                        initialValue={config.content.text['social.subtitle']}
                        as="h3"
                        className="text-4xl font-serif font-bold mb-6"
                        style={{ color: 'var(--primary)' }}
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <TestimonialCard
                        textKey="social.testimonial1.text"
                        authorKey="social.testimonial1.author"
                        locationKey="social.testimonial1.location"
                    />
                    <TestimonialCard
                        textKey="social.testimonial2.text"
                        authorKey="social.testimonial2.author"
                        locationKey="social.testimonial2.location"
                    />
                    <TestimonialCard
                        textKey="social.testimonial3.text"
                        authorKey="social.testimonial3.author"
                        locationKey="social.testimonial3.location"
                    />
                </div>
            </div>
        </section>
    );
};

const TestimonialCard = ({ textKey, authorKey, locationKey }: { textKey: string; authorKey: string; locationKey: string }) => {
    const cardRef = useSectionReveal();
    const { config } = useBuilder();

    return (
        <div ref={cardRef} className="p-8 rounded-2xl relative text-white" style={{ backgroundColor: '#1A2D49' }}>
            <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className="w-4 h-4"
                        style={{ color: 'var(--secondary)', fill: 'var(--secondary)' }}
                    />
                ))}
            </div>
            <div className="mb-6">
                <span className="italic text-lg opacity-60">"</span>
                <EditableText
                    id={textKey}
                    initialValue={config.content.text[textKey]}
                    as="span"
                    multiline
                    className="italic leading-relaxed inline opacity-80"
                />
                <span className="italic text-lg opacity-60">"</span>
            </div>
            <div>
                <EditableText
                    id={authorKey}
                    initialValue={config.content.text[authorKey]}
                    as="p"
                    className="font-bold"
                    style={{ color: 'var(--primary)' }}
                />
                <EditableText
                    id={locationKey}
                    initialValue={config.content.text[locationKey]}
                    as="p"
                    className="text-sm opacity-60"
                />
            </div>
        </div>
    )
}

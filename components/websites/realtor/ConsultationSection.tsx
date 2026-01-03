"use client";

import React from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useBuilder } from "@/context/BuilderContext";
import { EditableText } from "@/components/builder/EditableText";

export const ConsultationSection = () => {
    const { config } = useBuilder();
    const revealRef = useSectionReveal();

    return (
        <section id="consultation" className="py-24" style={{ backgroundColor: 'var(--secondary)' }}>
            <div className="container mx-auto px-4 text-center" ref={revealRef}>
                <EditableText
                    id="consultation.title"
                    initialValue={config.content.text['consultation.title']}
                    as="h2"
                    className="text-3xl md:text-5xl font-serif font-bold mb-6"
                    style={{ color: 'var(--primary)' }}
                />
                <EditableText
                    id="consultation.text"
                    initialValue={config.content.text['consultation.text']}
                    as="p"
                    multiline
                    className="text-xl max-w-2xl mx-auto mb-10 opacity-90"
                    style={{ color: 'var(--primary)' }}
                />
                <EditableText
                    id="consultation.cta"
                    initialValue={config.content.text['consultation.cta']}
                    as="a"
                    className="inline-block text-white px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-transform hover:scale-105 shadow-lg"
                    style={{ backgroundColor: 'var(--primary)' }}
                />
            </div>
        </section>
    );
};

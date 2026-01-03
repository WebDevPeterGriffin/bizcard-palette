"use client";

import React from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { CheckCircle2 } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";
import { EditableText } from "@/components/builder/EditableText";

export const AboutSection = () => {
    const { config } = useBuilder();
    const revealRef = useSectionReveal();

    return (
        <section id="about" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Image Side */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 relative shadow-2xl">
                            {/* Placeholder for Realtor Image - using a high quality Unsplash image */}
                            <img
                                src={config.content.images.headshot || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"}
                                alt="Realtor Portrait"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
                            <EditableText
                                id="about.stat.number"
                                initialValue={config.content.text['about.stat.number']}
                                as="p"
                                className="text-4xl font-serif font-bold mb-1"
                                style={{ color: 'var(--secondary)' }}
                            />
                            <EditableText
                                id="about.stat.label"
                                initialValue={config.content.text['about.stat.label']}
                                as="p"
                                multiline
                                className="text-slate-600 font-medium"
                            />
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-1/2" ref={revealRef}>
                        <h2
                            className="font-semibold tracking-wide uppercase mb-3 inline-block"
                            style={{ color: 'var(--secondary)' }}
                        >
                            About Me
                        </h2>
                        <EditableText
                            id="about.title"
                            initialValue={config.content.text['about.title']}
                            as="h3"
                            className="text-4xl md:text-5xl font-serif font-bold mb-6"
                            style={{ color: 'var(--primary)' }}
                        />
                        <EditableText
                            id="about.description"
                            initialValue={config.content.text['about.description']}
                            as="p"
                            multiline
                            className="text-slate-600 text-lg leading-relaxed mb-8"
                        />

                        <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--secondary)' }} />
                                <EditableText
                                    id="about.checklist1"
                                    initialValue={config.content.text['about.checklist1']}
                                    as="span"
                                    className="text-slate-800 font-medium"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--secondary)' }} />
                                <EditableText
                                    id="about.checklist2"
                                    initialValue={config.content.text['about.checklist2']}
                                    as="span"
                                    className="text-slate-800 font-medium"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--secondary)' }} />
                                <EditableText
                                    id="about.checklist3"
                                    initialValue={config.content.text['about.checklist3']}
                                    as="span"
                                    className="text-slate-800 font-medium"
                                />
                            </div>
                        </div>

                        <EditableText
                            id="about.cta"
                            initialValue={config.content.text['about.cta']}
                            as="a"
                            href="#contact"
                            className="font-bold border-b-2 pb-1 hover:opacity-80 transition-colors inline-block"
                            style={{
                                color: 'var(--primary)',
                                borderColor: 'var(--secondary)'
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

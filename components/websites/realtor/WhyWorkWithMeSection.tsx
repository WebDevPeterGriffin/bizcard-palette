"use client";

import React from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { Award, Clock, Users, ShieldCheck } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";
import { EditableText } from "@/components/builder/EditableText";

export const WhyWorkWithMeSection = () => {
    const { config } = useBuilder();
    const revealRef = useSectionReveal();

    const reasons = [
        {
            icon: <Award className="w-8 h-8" />,
            title: "Award Winning",
            description: "Recognized excellence in luxury real estate sales.",
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "24/7 Availability",
            description: "Always available to answer your questions and concerns.",
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Vast Network",
            description: "Access to exclusive off-market listings and buyers.",
        },
        {
            icon: <ShieldCheck className="w-8 h-8" />,
            title: "Trusted Advisor",
            description: "Honest, transparent, and ethical representation.",
        },
    ];

    return (
        <section className="py-24 text-white" style={{ backgroundColor: 'var(--primary)' }}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="w-full lg:w-1/2" ref={revealRef}>
                        <EditableText
                            id="why.title"
                            initialValue={config.content.text['why.title']}
                            as="h2"
                            className="font-semibold tracking-wide uppercase mb-3 inline-block"
                            style={{ color: 'var(--secondary)' }}
                        />
                        <EditableText
                            id="why.subtitle"
                            initialValue={config.content.text['why.subtitle']}
                            as="h3"
                            className="text-4xl font-serif font-bold mb-6"
                        />
                        <EditableText
                            id="why.description"
                            initialValue={config.content.text['why.description']}
                            as="p"
                            multiline
                            className="text-slate-300 text-lg leading-relaxed mb-8"
                        />

                        <div className="grid grid-cols-2 gap-8">
                            <div className="border-l-4 pl-4" style={{ borderColor: 'var(--secondary)' }}>
                                <EditableText
                                    id="why.stat1.number"
                                    initialValue={config.content.text['why.stat1.number']}
                                    as="p"
                                    className="text-4xl font-bold text-white mb-1"
                                />
                                <EditableText
                                    id="why.stat1.label"
                                    initialValue={config.content.text['why.stat1.label']}
                                    as="p"
                                    className="text-slate-400 text-sm uppercase tracking-wider"
                                />
                            </div>
                            <div className="border-l-4 pl-4" style={{ borderColor: 'var(--secondary)' }}>
                                <EditableText
                                    id="why.stat2.number"
                                    initialValue={config.content.text['why.stat2.number']}
                                    as="p"
                                    className="text-4xl font-bold text-white mb-1"
                                />
                                <EditableText
                                    id="why.stat2.label"
                                    initialValue={config.content.text['why.stat2.label']}
                                    as="p"
                                    className="text-slate-400 text-sm uppercase tracking-wider"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <ReasonCard
                            icon={<Award className="w-8 h-8" />}
                            titleKey="why.reason1.title"
                            descKey="why.reason1.description"
                        />
                        <ReasonCard
                            icon={<Clock className="w-8 h-8" />}
                            titleKey="why.reason2.title"
                            descKey="why.reason2.description"
                        />
                        <ReasonCard
                            icon={<Users className="w-8 h-8" />}
                            titleKey="why.reason3.title"
                            descKey="why.reason3.description"
                        />
                        <ReasonCard
                            icon={<ShieldCheck className="w-8 h-8" />}
                            titleKey="why.reason4.title"
                            descKey="why.reason4.description"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const ReasonCard = ({ icon, titleKey, descKey }: { icon: React.ReactNode; titleKey: string; descKey: string }) => {
    const cardRef = useSectionReveal();
    const { config } = useBuilder();

    return (
        <div ref={cardRef} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
            <div className="mb-4" style={{ color: 'var(--secondary)' }}>{icon}</div>
            <EditableText
                id={titleKey}
                initialValue={config.content.text[titleKey]}
                as="h4"
                className="text-xl font-bold mb-2"
            />
            <EditableText
                id={descKey}
                initialValue={config.content.text[descKey]}
                as="p"
                multiline
                className="text-slate-400 text-sm"
            />
        </div>
    )
}

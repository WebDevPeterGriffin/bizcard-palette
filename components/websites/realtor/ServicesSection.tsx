"use client";

import React from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { Home, Key, LineChart } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";
import { EditableText } from "@/components/builder/EditableText";

export const ServicesSection = () => {
    const { config } = useBuilder();
    const revealRef = useSectionReveal();

    const services = [
        {
            icon: <Home className="w-10 h-10" />,
            title: "Buying a Home",
            description: "Find your perfect sanctuary with our curated property search and expert guidance through every step.",
        },
        {
            icon: <Key className="w-10 h-10" />,
            title: "Selling Your Home",
            description: "Maximize your property's value with our strategic marketing, staging advice, and negotiation skills.",
        },
        {
            icon: <LineChart className="w-10 h-10" />,
            title: "Market Analysis",
            description: "Make informed decisions with our comprehensive market reports and investment insights.",
        },
    ];

    return (
        <section id="services" className="py-24" style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}>
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16" ref={revealRef}>
                    <EditableText
                        id="services.title"
                        initialValue={config.content.text['services.title']}
                        as="h2"
                        className="font-semibold tracking-wide uppercase mb-3 inline-block"
                        style={{ color: 'var(--secondary)' }}
                    />
                    <EditableText
                        id="services.subtitle"
                        initialValue={config.content.text['services.subtitle']}
                        as="h3"
                        className="text-4xl font-serif font-bold mb-4"
                        style={{ color: 'var(--primary)' }}
                    />
                    <EditableText
                        id="services.description"
                        initialValue={config.content.text['services.description']}
                        as="p"
                        multiline
                        className="text-lg opacity-80"
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <ServiceCard
                        icon={<Home className="w-10 h-10" />}
                        titleKey="services.buying.title"
                        descKey="services.buying.description"
                    />
                    <ServiceCard
                        icon={<Key className="w-10 h-10" />}
                        titleKey="services.selling.title"
                        descKey="services.selling.description"
                    />
                    <ServiceCard
                        icon={<LineChart className="w-10 h-10" />}
                        titleKey="services.market.title"
                        descKey="services.market.description"
                    />
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ icon, titleKey, descKey }: { icon: React.ReactNode; titleKey: string; descKey: string }) => {
    const cardRef = useSectionReveal();
    const { config } = useBuilder();

    return (
        <div
            ref={cardRef}
            className="p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            style={{ backgroundColor: 'var(--background)', borderColor: 'rgba(0,0,0,0.1)' }}
        >
            <div
                className="mb-6 w-20 h-20 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
            >
                <div style={{ color: 'var(--secondary)' }}>
                    {icon}
                </div>
            </div>
            <EditableText
                id={titleKey}
                initialValue={config.content.text[titleKey]}
                as="h4"
                className="text-2xl font-bold mb-3"
                style={{ color: 'var(--primary)' }}
            />
            <EditableText
                id={descKey}
                initialValue={config.content.text[descKey]}
                as="p"
                multiline
                className="leading-relaxed opacity-80"
            />
        </div>
    )
}

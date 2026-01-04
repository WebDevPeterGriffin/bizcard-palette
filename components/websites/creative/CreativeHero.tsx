"use client";

import React from "react";
import { motion } from "framer-motion";
import { WebsiteConfig, useBuilder } from "@/context/BuilderContext";
import { EditableText } from "@/components/builder/EditableText";

interface CreativeHeroProps {
    config: WebsiteConfig;
}

export const CreativeHero = ({ config }: CreativeHeroProps) => {
    const { isReadOnly } = useBuilder();
    const title = config.content.text['hero.title'] || "Visionary Design";
    const subtitle = config.content.text['hero.subtitle'] || "We craft digital experiences that defy expectations.";
    const cta = config.content.text['hero.cta'] || "Explore Work";

    const words = title.split(" ");

    return (
        <section className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden bg-black text-white" style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}>
            {/* Background Abstract Elements */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" style={{ backgroundColor: 'var(--primary)', opacity: 0.2 }} />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" style={{ backgroundColor: 'var(--secondary)', opacity: 0.1 }} />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="max-w-5xl">
                    {isReadOnly ? (
                        <motion.h1
                            className="text-[12vw] leading-[0.9] font-black tracking-tighter mb-8 uppercase"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {words.map((word, i) => (
                                <span key={i} className="inline-block mr-[2vw] overflow-hidden align-top">
                                    <motion.span
                                        className="inline-block"
                                        variants={{
                                            hidden: { y: "100%" },
                                            visible: {
                                                y: 0,
                                                transition: {
                                                    duration: 0.8,
                                                    ease: [0.2, 0.65, 0.3, 0.9]
                                                }
                                            }
                                        }}
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                            ))}
                        </motion.h1>
                    ) : (
                        <EditableText
                            id="hero.title"
                            initialValue={title}
                            as="h1"
                            multiline
                            className="text-[12vw] leading-[0.9] font-black tracking-tighter mb-8 uppercase outline-none empty:before:content-['Title'] empty:before:text-zinc-700"
                        />
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16"
                    >
                        <EditableText
                            id="hero.subtitle"
                            initialValue={subtitle}
                            as="p"
                            className="text-xl md:text-2xl max-w-lg font-light leading-relaxed outline-none opacity-60"
                        />

                        <EditableText
                            id="hero.cta"
                            initialValue={cta}
                            as="button"
                            className="px-8 py-4 bg-white text-black font-bold rounded-full text-lg tracking-wide hover:opacity-90 transition-opacity outline-none"
                            style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                style={{ color: 'var(--text)', opacity: 0.5 }}
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <motion.div
                    className="w-[1px] h-12 bg-zinc-800 overflow-hidden"
                >
                    <motion.div
                        className="w-full h-1/2 bg-white"
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        style={{ backgroundColor: 'var(--text)' }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

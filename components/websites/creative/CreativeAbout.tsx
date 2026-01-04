"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WebsiteConfig } from "@/context/BuilderContext";
import { EditableText } from "@/components/builder/EditableText";
import { EditableImage } from "@/components/builder/EditableImage";

interface CreativeAboutProps {
    config: WebsiteConfig;
}

export const CreativeAbout = ({ config }: CreativeAboutProps) => {
    const title = config.content.text['about.title'] || "About Me";
    const description = config.content.text['about.description'] || "I am a dedicated professional with a passion for excellence.";
    const image = config.content.images['headshot'] || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop";

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="min-h-screen py-24 relative overflow-hidden flex items-center" style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}>
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <motion.div
                            style={{ y, opacity }}
                            className="relative z-10 aspect-[3/4] overflow-hidden rounded-sm"
                        >
                            <EditableImage
                                id="headshot"
                                initialValue={image}
                                alt="Profile"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </motion.div>
                        {/* Decorative border */}
                        <div className="absolute top-8 -left-8 w-full h-full border border-zinc-800 -z-0" />
                    </div>

                    <div className="space-y-8">


                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <EditableText
                                id="about.title"
                                initialValue={title}
                                as="h2"
                                className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600 outline-none"
                                style={{ backgroundImage: 'linear-gradient(to right, var(--text), var(--primary))' }}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <EditableText
                                id="about.description"
                                initialValue={description}
                                as="p"
                                multiline
                                className="text-xl md:text-2xl font-light leading-relaxed outline-none opacity-60"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="grid grid-cols-2 gap-8 pt-8 border-t"
                            style={{ borderColor: 'var(--text)', borderTopWidth: '1px', borderTopStyle: 'solid', opacity: 0.8 }}
                        >
                            <div>
                                <EditableText
                                    id="about.stat.number"
                                    initialValue={config.content.text['about.stat.number'] || "15+"}
                                    as="h3"
                                    className="text-4xl font-bold mb-2 outline-none"
                                />
                                <EditableText
                                    id="about.stat.label"
                                    initialValue={config.content.text['about.stat.label'] || "Years Experience"}
                                    as="p"
                                    className="text-sm uppercase tracking-widest outline-none opacity-50"
                                />
                            </div>
                            <div>
                                <EditableText
                                    id="about.stat2.number"
                                    initialValue={config.content.text['about.stat2.number'] || "100%"}
                                    as="h3"
                                    className="text-4xl font-bold mb-2 outline-none"
                                />
                                <EditableText
                                    id="about.stat2.label"
                                    initialValue={config.content.text['about.stat2.label'] || "Client Satisfaction"}
                                    as="p"
                                    className="text-sm uppercase tracking-widest outline-none opacity-50"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

"use client";

import React from "react";
import { motion } from "framer-motion";
import { WebsiteConfig } from "@/context/BuilderContext";
import { EditableText } from "@/components/builder/EditableText";
import { EditableImage } from "@/components/builder/EditableImage";

interface CreativeGalleryProps {
    config: WebsiteConfig;
}

export const CreativeGallery = ({ config }: CreativeGalleryProps) => {
    // Use images from config or fallbacks
    const images = [
        config.content.images['gallery1'] || "https://images.unsplash.com/photo-1600596542815-2495db98dada?q=80&w=2688&auto=format&fit=crop",
        config.content.images['gallery2'] || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
        config.content.images['gallery3'] || "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop",
        config.content.images['gallery4'] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
    ];

    return (
        <section className="py-32" style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}>
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <EditableText
                        id="gallery.title"
                        initialValue={config.content.text['gallery.title'] || "SELECTED WORK"}
                        as="h2"
                        className="text-5xl md:text-7xl font-black tracking-tighter mb-6 outline-none"
                    />
                    <div className="h-1 w-32 bg-white" style={{ backgroundColor: 'var(--text)' }} />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    {[1, 2, 3, 4].map((num, index) => {
                        const key = `gallery${num}`;
                        const src = config.content.images[key] || "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop";

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                className={`group relative aspect-[4/3] overflow-hidden ${index % 2 === 1 ? 'md:mt-24' : ''}`}
                            >
                                <motion.div
                                    className="w-full h-full"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <EditableImage
                                        id={key}
                                        initialValue={src}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

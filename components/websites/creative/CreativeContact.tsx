"use client";

import React from "react";
import { motion } from "framer-motion";
import { WebsiteConfig } from "@/context/BuilderContext";
import { ArrowUpRight } from "lucide-react";
import { EditableText } from "@/components/builder/EditableText";

interface CreativeContactProps {
    config: WebsiteConfig;
}

export const CreativeContact = ({ config }: CreativeContactProps) => {
    const email = config.content.text['contact.email'] || "hello@example.com";
    const phone = config.content.text['contact.phone'] || "+1 (555) 000-0000";

    return (
        <section className="py-32 border-t border-zinc-900" style={{ backgroundColor: 'var(--background)', color: 'var(--text)', borderColor: 'var(--text)', opacity: 0.9 }}>
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid md:grid-cols-2 gap-16">


                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <EditableText
                                id="contact.title"
                                initialValue={config.content.text['contact.title'] || "LET'S\nWORK\nTOGETHER"}
                                as="h2"
                                multiline
                                className="text-6xl md:text-8xl font-black tracking-tighter mb-8 outline-none"
                            />
                        </motion.div>
                    </div>

                    <div className="flex flex-col justify-between">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="group flex items-center gap-4 text-3xl md:text-4xl font-light hover:text-purple-400 transition-colors">
                                <EditableText
                                    id="contact.email"
                                    initialValue={email}
                                    as="a"
                                    href={`mailto:${email}`}
                                    className="outline-none"
                                    style={{ color: 'var(--text)' }}
                                />
                                <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2 group-hover:-translate-y-2" style={{ color: 'var(--accent)' }} />
                            </div>
                            <div className="block text-2xl md:text-3xl transition-colors opacity-60 hover:opacity-100">
                                <EditableText
                                    id="contact.phone"
                                    initialValue={phone}
                                    as="a"
                                    href={`tel:${phone}`}
                                    className="outline-none"
                                />
                            </div>
                        </motion.div>

                        <div className="mt-16 flex gap-8">
                            {config.content.socialLinks.map((link, i) => (
                                <motion.a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="text-sm uppercase tracking-widest border-b border-transparent hover:border-current pb-1 transition-all"
                                >
                                    {link.platform}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-32 pt-8 border-t flex justify-between text-sm opacity-50" style={{ borderColor: 'var(--text)' }}>
                    <p>&copy; {new Date().getFullYear()} {config.content.text['brand.name'] || "Brand Name"}. All rights reserved.</p>
                    <p>Designed by MildTech Studios</p>
                </div>
            </div>
        </section>
    );
};

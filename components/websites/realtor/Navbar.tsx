"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";
import { EditableText } from "@/components/builder/EditableText";

export const Navbar = () => {
    const { config } = useBuilder();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Services", href: "#services" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a href="#" className="flex items-center gap-2">
                    {config.content.logos.personal ? (
                        <img
                            src={config.content.logos.personal}
                            alt="Logo"
                            className="h-10 w-auto object-contain transition-all"
                        />
                    ) : (
                        <EditableText
                            id="brand.name"
                            initialValue={config.content.text['brand.name']}
                            as="span"
                            className={cn(
                                "font-serif text-2xl font-bold tracking-tight transition-colors",
                                !isScrolled && "text-white"
                            )}
                            style={isScrolled ? { color: 'var(--primary)' } : {}}
                        />
                    )}
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-medium transition-colors hover:opacity-70"
                            style={{ color: isScrolled ? 'var(--primary)' : 'white' }}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#consultation"
                        className="text-white px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-colors"
                        style={{ backgroundColor: isScrolled ? 'var(--primary)' : 'rgba(255,255,255,0.2)' }}
                    >
                        Book Consultation
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden"
                    style={{ color: isScrolled ? 'var(--primary)' : 'white' }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-lg p-4 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-medium py-2 hover:opacity-70"
                            style={{ color: 'var(--primary)' }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#consultation"
                        className="text-white px-6 py-3 rounded-full font-medium text-center hover:opacity-90 transition-colors"
                        style={{ backgroundColor: 'var(--primary)' }}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Book Consultation
                    </a>
                </div>
            )}
        </nav>
    );
};

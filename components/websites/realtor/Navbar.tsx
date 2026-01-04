"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";
import { EditableText } from "@/components/builder/EditableText";
import { EditableImage } from "@/components/builder/EditableImage";

export const Navbar = () => {
    const { config, isReadOnly } = useBuilder();
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
                    ? "backdrop-blur-md shadow-sm py-4"
                    : "bg-transparent py-6"
            )}
            style={{
                backgroundColor: isScrolled ? 'var(--background)' : 'transparent',
                opacity: isScrolled ? 0.95 : 1
            }}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a href="#" className="flex items-center gap-2">
                    {isReadOnly ? (
                        // Read-only mode: Show logo if exists, else show text
                        config.content.logos.personal ? (
                            <img
                                src={config.content.logos.personal}
                                alt="Logo"
                                className="h-10 w-auto object-contain"
                            />
                        ) : (
                            <span
                                className={cn(
                                    "font-serif text-2xl font-bold tracking-tight transition-colors",
                                    !isScrolled && "text-white"
                                )}
                                style={isScrolled ? { color: 'var(--primary)' } : {}}
                            >
                                {config.content.text['brand.name'] || 'Brand Name'}
                            </span>
                        )
                    ) : (
                        // Editor mode: Show editable logo with upload, or editable text
                        <div className="flex items-center gap-3">
                            <EditableImage
                                id="personal"
                                initialValue={config.content.logos.personal || ''}
                                uploadType="logo"
                                alt="Logo"
                                className="h-10 w-auto object-contain"
                            >
                                {!config.content.logos.personal && (
                                    <div className={cn(
                                        "border border-dashed px-3 py-1.5 rounded text-xs font-medium cursor-pointer hover:bg-white/10 transition-colors",
                                        isScrolled ? "border-slate-400 text-slate-600" : "border-white/50 text-white/70"
                                    )}>
                                        + Upload Logo
                                    </div>
                                )}
                            </EditableImage>
                            {!config.content.logos.personal && (
                                <EditableText
                                    id="brand.name"
                                    initialValue={config.content.text['brand.name'] || ''}
                                    as="span"
                                    className={cn(
                                        "font-serif text-2xl font-bold tracking-tight transition-colors",
                                        !isScrolled && "text-white"
                                    )}
                                    style={isScrolled ? { color: 'var(--primary)' } : {}}
                                />
                            )}
                        </div>
                    )}
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-medium transition-colors hover:opacity-70"
                            style={{ color: isScrolled ? 'var(--text)' : 'white' }}
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
                    style={{ color: isScrolled ? 'var(--text)' : 'white' }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden absolute top-full left-0 right-0 border-t border-slate-100 shadow-lg p-4 flex flex-col space-y-4"
                    style={{ backgroundColor: 'var(--background)' }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-medium py-2 hover:opacity-70"
                            style={{ color: 'var(--text)' }}
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

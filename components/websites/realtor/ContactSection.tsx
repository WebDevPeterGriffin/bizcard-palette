"use client";

import React from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook, Twitter, Youtube } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";
import { EditableText } from "@/components/builder/EditableText";
import { EditableImage } from "@/components/builder/EditableImage";
import { Turnstile } from "@marsidev/react-turnstile";
import { createClient } from "@/lib/supabase/client";

export const ContactSection = () => {
    const revealRef = useSectionReveal();
    const { config, userId, isReadOnly } = useBuilder();
    const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const [token, setToken] = React.useState<string | null>(null);
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            console.error("No userId found for submission");
            return;
        }

        if (!token) {
            alert("Please complete the captcha");
            return;
        }

        setStatus('submitting');
        try {
            const { data, error } = await supabase.functions.invoke('submit-contact', {
                body: {
                    type: 'website_inquiry',
                    data: {
                        userId,
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        message: formData.message
                    },
                    token
                }
            });

            if (error) throw error;
            if (data?.error) throw new Error(data.error);

            setStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
            setToken(null);
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    return (
        <footer id="contact" className="text-white pt-24 pb-12" style={{ backgroundColor: 'var(--primary)' }}>
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 mb-16">
                    {/* Contact Info */}
                    <div ref={revealRef}>
                        <EditableText
                            id="contact.title"
                            initialValue={config.content.text['contact.title']}
                            as="h2"
                            className="font-semibold tracking-wide uppercase mb-3 inline-block"
                            style={{ color: 'var(--secondary)' }}
                        />
                        <EditableText
                            id="contact.subtitle"
                            initialValue={config.content.text['contact.subtitle']}
                            as="h3"
                            className="text-4xl font-serif font-bold mb-8"
                        />

                        <div className="space-y-6 mb-10">
                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-full">
                                    <Phone className="w-6 h-6" style={{ color: 'var(--secondary)' }} />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Call Me</p>
                                    <p className="text-xl font-medium">
                                        {config.content.text['contact.phone']}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-full">
                                    <Mail className="w-6 h-6" style={{ color: 'var(--secondary)' }} />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Email Me</p>
                                    <p className="text-xl font-medium">
                                        {config.content.text['contact.email']}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-full">
                                    <MapPin className="w-6 h-6" style={{ color: 'var(--secondary)' }} />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Office</p>
                                    <p className="text-xl font-medium whitespace-pre-line">
                                        {config.content.text['contact.address']}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {config.content.socialLinks.length > 0 && (
                            <div className="flex gap-4">
                                {config.content.socialLinks.map((link) => {
                                    const Icon = {
                                        instagram: Instagram,
                                        linkedin: Linkedin,
                                        facebook: Facebook,
                                        twitter: Twitter,
                                        youtube: Youtube,
                                        tiktok: () => (
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                                            </svg>
                                        ),
                                    }[link.platform];
                                    return (
                                        <a
                                            key={link.platform}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                                        >
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Simple Form */}
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-medium text-slate-300">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors"
                                        style={{ borderColor: 'var(--secondary)' }}
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-medium text-slate-300">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors"
                                        style={{ borderColor: 'var(--secondary)' }}
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors"
                                    style={{ borderColor: 'var(--secondary)' }}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors"
                                    style={{ borderColor: 'var(--secondary)' }}
                                    placeholder="I'm interested in buying a home..."
                                ></textarea>
                            </div>

                            <div className="flex justify-center">
                                <Turnstile
                                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                                    onSuccess={setToken}
                                    onExpire={() => setToken(null)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full text-slate-900 font-bold py-4 rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
                                style={{ backgroundColor: 'var(--secondary)' }}
                            >
                                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                            </button>
                            {status === 'success' && (
                                <p className="text-sm text-green-400 text-center">Message sent successfully!</p>
                            )}
                            {status === 'error' && (
                                <p className="text-sm text-red-400 text-center">Failed to send message. Please try again.</p>
                            )}
                            <p className="text-xs text-center text-slate-400 mt-4">
                                Messages will be sent to: <span className="text-white">{config.content.text['contact.email']}</span>
                            </p>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                        {/* Broker Logo - only show if logo exists in read-only, or always show in editor */}
                        {(config.content.logos.broker || !isReadOnly) && (
                            <div className="h-20 w-auto opacity-80 hover:opacity-100 transition-opacity">
                                {isReadOnly ? (
                                    config.content.logos.broker && (
                                        <img
                                            src={config.content.logos.broker}
                                            alt="Broker Logo"
                                            className="h-20 w-auto object-contain"
                                        />
                                    )
                                ) : (
                                    <EditableImage
                                        id="broker"
                                        uploadType="logo"
                                        initialValue={config.content.logos.broker || ''}
                                        alt="Broker Logo"
                                        className="h-20 w-auto object-contain"
                                    >
                                        {!config.content.logos.broker && (
                                            <div className="border border-dashed border-white/50 px-4 py-3 rounded text-sm font-medium text-white/70 cursor-pointer hover:bg-white/10 transition-colors">
                                                + Upload Broker Logo
                                            </div>
                                        )}
                                    </EditableImage>
                                )}
                            </div>
                        )}

                        {/* Trademarks */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1" title="Equal Housing Opportunity">
                                <img
                                    src="/images/realtor/equal-housing.png"
                                    alt="Equal Housing Opportunity"
                                    className="h-8 w-auto object-contain invert brightness-0"
                                />
                            </div>
                            <div className="flex items-center gap-1" title="REALTOR®">
                                <img
                                    src="/images/realtor/realtor-logo.png"
                                    alt="REALTOR®"
                                    className="h-8 w-auto object-contain invert brightness-0"
                                />
                            </div>
                        </div>
                    </div>

                    <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} {config.content.text['brand.name'] || 'Luxe Estates'}. All rights reserved.</p>
                    <p className="text-slate-500 text-sm">Designed by MildTech Studios</p>
                </div>
            </div>
        </footer>
    );
};

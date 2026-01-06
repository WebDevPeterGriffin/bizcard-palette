"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { TemplateSchema } from '@/types/builder';
import { realtorSchema } from '@/config/templates/realtor.schema';
import { creativeSchema } from '@/config/templates/creative.schema';

export interface SocialLink {
    platform: 'instagram' | 'linkedin' | 'facebook' | 'twitter' | 'youtube' | 'tiktok';
    url: string;
}

export interface WebsiteConfig {
    template: 'realtor' | 'creative';
    colors: {
        primary: string;
        secondary: string;
        text: string;
        background: string;
        accent: string;
    };
    content: {
        logos: {
            personal?: string | null;
            broker?: string | null;
        };
        text: {
            [key: string]: string;
        };
        images: {
            [key: string]: string;
        };
        socialLinks: SocialLink[];
    };
}

interface BuilderContextType {
    config: WebsiteConfig;
    schema: TemplateSchema;
    slug: string | null;
    updateTemplate: (template: 'realtor' | 'creative') => void;
    updateColor: (key: keyof WebsiteConfig['colors'], value: string) => void;
    updateLogo: (type: 'personal' | 'broker', url: string | null) => void;
    updateText: (key: string, value: string) => void;
    updateImage: (key: string, url: string) => void;
    updateSocialLink: (platform: SocialLink['platform'], url: string) => void;
    removeSocialLink: (platform: SocialLink['platform']) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    saveConfig: (slug?: string) => Promise<boolean>;
    loadConfig: (template?: 'realtor' | 'creative') => Promise<void>;
    deleteConfig: () => Promise<boolean>;
    isSaving: boolean;
    isLoading: boolean;
    hasUnsavedChanges: boolean;
    isReadOnly: boolean;
    setConfig: (config: WebsiteConfig) => void;
    userId?: string;
}

const realtorConfig: WebsiteConfig = {
    template: 'realtor',
    colors: {
        primary: '#1A2D49', // Slate 900
        secondary: '#F59E0B', // Amber 500
        text: '#0f172a', // Slate 900
        background: '#ffffff',
        accent: '#F59E0B',
    },
    content: {
        logos: {},
        text: {
            'brand.name': 'LUXE ESTATES',
            'hero.title': 'Find Your Dream \nSanctuary',
            'hero.subtitle': 'Exclusive properties for exclusive lifestyles. We help you find the perfect home that matches your vision and ambition.',
            'hero.cta': 'Explore Properties',
            'about.title': 'About Me',
            'about.description': 'I am a dedicated real estate professional with over 15 years of experience in the luxury market. My mission is to help you find not just a house, but a place where you can truly belong.',
            'about.stat.number': '15+',
            'about.stat.label': 'Years of Experience in Luxury Real Estate',
            'about.checklist1': 'Certified Luxury Home Marketing Specialist',
            'about.checklist2': 'Top 1% Producer in the Region',
            'about.checklist3': 'Expert in Negotiation and Market Analysis',
            'about.cta': 'Read Full Bio',
            'services.title': 'Our Services',
            'services.subtitle': 'Comprehensive real estate solutions tailored to your unique needs.',
            'services.description': "Whether you're buying, selling, or investing, we provide the expertise and support you need to achieve your goals.",
            'services.buying.title': 'Buying a Home',
            'services.buying.description': 'Find your perfect sanctuary with our curated property search and expert guidance through every step.',
            'services.selling.title': 'Selling Your Home',
            'services.selling.description': "Maximize your property's value with our strategic marketing, staging advice, and negotiation skills.",
            'services.market.title': 'Market Analysis',
            'services.market.description': 'Make informed decisions with our comprehensive market reports and investment insights.',
            'why.title': 'Why Choose Me',
            'why.subtitle': 'Unmatched Dedication to Your Success',
            'why.description': 'In a crowded market, experience and integrity matter. My proven track record and client-first approach ensure that your real estate journey is smooth, successful, and stress-free.',
            'why.stat1.number': '150+',
            'why.stat1.label': 'Homes Sold',
            'why.stat2.number': '$250M',
            'why.stat2.label': 'Sales Volume',
            'why.reason1.title': 'Award Winning',
            'why.reason1.description': 'Recognized excellence in luxury real estate sales.',
            'why.reason2.title': '24/7 Availability',
            'why.reason2.description': 'Always available to answer your questions and concerns.',
            'why.reason3.title': 'Vast Network',
            'why.reason3.description': 'Access to exclusive off-market listings and buyers.',
            'why.reason4.title': 'Trusted Advisor',
            'why.reason4.description': 'Honest, transparent, and ethical representation.',
            'social.title': 'Testimonials',
            'social.subtitle': 'What My Clients Say',
            'social.testimonial1.text': "We couldn't have asked for a better agent. Their knowledge of the market and negotiation skills got us our dream home under asking price!",
            'social.testimonial1.author': 'Sarah & James M.',
            'social.testimonial1.location': 'Beverly Hills, CA',
            'social.testimonial2.text': 'Professional, attentive, and incredibly hardworking. Sold our property in record time for a price we didn\'t think was possible.',
            'social.testimonial2.author': 'Robert T.',
            'social.testimonial2.location': 'Hollywood Hills, CA',
            'social.testimonial3.text': 'Guided us through every step of the process with patience and expertise. Truly went above and beyond our expectations.',
            'social.testimonial3.author': 'Emily R.',
            'social.testimonial3.location': 'Santa Monica, CA',
            'consultation.title': 'Ready to Find Your Dream Home?',
            'consultation.text': "Let's discuss your real estate goals. Schedule a free, no-obligation consultation today.",
            'consultation.cta': 'Book a Call',
            'contact.title': 'Get in Touch',
            'contact.subtitle': "Let's Start a Conversation",
            'contact.phone': '+1 (555) 123-4567',
            'contact.email': 'hello@luxeestates.com',
            'contact.address': '123 Luxury Blvd, Beverly Hills, CA 90210',
        },
        images: {
            headshot: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop',
        },
        socialLinks: [
            { platform: 'instagram', url: 'https://instagram.com' },
            { platform: 'linkedin', url: 'https://linkedin.com' },
            { platform: 'facebook', url: 'https://facebook.com' },
        ],
    },
};

const creativeConfig: WebsiteConfig = {
    template: 'creative',
    colors: {
        primary: '#8B5CF6', // Violet 500
        secondary: '#EC4899', // Pink 500
        text: '#ffffff',
        background: '#09090b', // Zinc 950
        accent: '#8B5CF6',
    },
    content: {
        logos: {},
        text: {
            'hero.title': 'Visionary Design',
            'hero.subtitle': 'We craft digital experiences that defy expectations.',
            'hero.cta': 'Explore Work',
            'about.title': 'About Me',
            'about.description': 'I am a dedicated professional with a passion for excellence.',
            'about.stat.number': '15+',
            'about.stat.label': 'Years Experience',
            'gallery.title': 'SELECTED WORK',
            'contact.email': 'hello@example.com',
            'contact.phone': '+1 (555) 000-0000',
            'brand.name': 'Creative Brand',
            'contact.title': "LET'S\nWORK\nTOGETHER",
            'about.stat2.number': '100%',
            'about.stat2.label': 'Client Satisfaction',
        },
        images: {
            headshot: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop',
        },
        socialLinks: [
            { platform: 'instagram', url: 'https://instagram.com' },
            { platform: 'twitter', url: 'https://twitter.com' },
        ],
    },
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

interface BuilderProviderProps {
    children: ReactNode;
    initialConfig?: WebsiteConfig;
    readOnly?: boolean;
    userId?: string;
}

export const BuilderProvider = ({ children, initialConfig, readOnly = false, userId }: BuilderProviderProps) => {
    const [config, setConfig] = useState<WebsiteConfig>(realtorConfig);
    const [schema, setSchema] = useState<TemplateSchema>(realtorSchema);
    const [slug, setSlug] = useState<string | null>(null);
    const [savedConfig, setSavedConfig] = useState<WebsiteConfig | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<{ past: WebsiteConfig[]; future: WebsiteConfig[] }>({
        past: [],
        future: [],
    });

    useEffect(() => {
        if (initialConfig) {
            setConfig(initialConfig);
            setSchema(initialConfig.template === 'creative' ? creativeSchema : realtorSchema);
        }
    }, [initialConfig]);

    const addToHistory = (currentConfig: WebsiteConfig) => {
        if (readOnly) return;
        setHistory((prev) => ({
            past: [...prev.past.slice(-49), currentConfig],
            future: [],
        }));
    };

    const undo = () => {
        if (history.past.length === 0) return;

        const previous = history.past[history.past.length - 1];
        const newPast = history.past.slice(0, -1);

        setHistory({
            past: newPast,
            future: [config, ...history.future].slice(0, 50),
        });
        setConfig(previous);
    };

    const redo = () => {
        if (history.future.length === 0) return;

        const next = history.future[0];
        const newFuture = history.future.slice(1);

        setHistory({
            past: [...history.past, config],
            future: newFuture,
        });
        setConfig(next);
    };

    // Keyboard shortcuts
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                if (e.shiftKey) {
                    redo();
                } else {
                    undo();
                }
            } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
                e.preventDefault();
                redo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [config, history]);

    const updateTemplate = (template: 'realtor' | 'creative') => {
        addToHistory(config);
        setConfig((prev) => ({
            ...prev,
            template,
        }));
        setSchema(template === 'creative' ? creativeSchema : realtorSchema);
    };

    const updateColor = (key: keyof WebsiteConfig['colors'], value: string) => {
        addToHistory(config);
        setConfig((prev) => ({
            ...prev,
            colors: { ...prev.colors, [key]: value },
        }));
    };

    const updateLogo = (type: 'personal' | 'broker', url: string | null) => {
        addToHistory(config);
        setConfig((prev) => ({
            ...prev,
            content: {
                ...prev.content,
                logos: { ...prev.content.logos, [type]: url },
            },
        }));
    };

    const updateText = (key: string, value: string) => {
        addToHistory(config);
        setConfig((prev) => ({
            ...prev,
            content: {
                ...prev.content,
                text: { ...prev.content.text, [key]: value },
            },
        }));
    };

    const updateImage = (key: string, url: string) => {
        addToHistory(config);
        setConfig((prev) => ({
            ...prev,
            content: {
                ...prev.content,
                images: { ...prev.content.images, [key]: url },
            },
        }));
    };

    const updateSocialLink = (platform: SocialLink['platform'], url: string) => {
        addToHistory(config);
        setConfig((prev) => {
            const existing = prev.content.socialLinks.find(l => l.platform === platform);
            if (existing) {
                return {
                    ...prev,
                    content: {
                        ...prev.content,
                        socialLinks: prev.content.socialLinks.map(l =>
                            l.platform === platform ? { ...l, url } : l
                        ),
                    },
                };
            } else {
                return {
                    ...prev,
                    content: {
                        ...prev.content,
                        socialLinks: [...prev.content.socialLinks, { platform, url }],
                    },
                };
            }
        });
    };

    const removeSocialLink = (platform: SocialLink['platform']) => {
        addToHistory(config);
        setConfig((prev) => ({
            ...prev,
            content: {
                ...prev.content,
                socialLinks: prev.content.socialLinks.filter(l => l.platform !== platform),
            },
        }));
    };

    const hasUnsavedChanges = savedConfig !== null
        ? JSON.stringify(config) !== JSON.stringify(savedConfig)
        : history.past.length > 0;

    const saveConfig = useCallback(async (newSlug?: string): Promise<boolean> => {
        setIsSaving(true);
        try {
            const response = await fetch('/api/websites/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ config, slug: newSlug, template: config.template }),
            });
            if (!response.ok) {
                const data = await response.json();
                console.error('Save failed:', data.error);
                return false;
            }
            setSavedConfig(config);
            if (newSlug) setSlug(newSlug);
            return true;
        } catch (error) {
            console.error('Save error:', error);
            return false;
        } finally {
            setIsSaving(false);
        }
    }, [config]);

    const loadConfig = useCallback(async (template?: 'realtor' | 'creative'): Promise<void> => {
        setIsLoading(true);
        try {
            const url = template ? `/api/websites/config?template=${template}` : '/api/websites/config';
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                if (data.config) {
                    const loadedConfig = { ...data.config, template: data.template || template || 'realtor' };
                    setConfig(loadedConfig);
                    setSchema(loadedConfig.template === 'creative' ? creativeSchema : realtorSchema);
                    setSavedConfig(loadedConfig);
                    setHistory({ past: [], future: [] });
                } else {
                    const targetTemplate = template || 'realtor';
                    const defaultConfig = targetTemplate === 'creative' ? creativeConfig : realtorConfig;
                    setConfig(defaultConfig);
                    setSchema(targetTemplate === 'creative' ? creativeSchema : realtorSchema);
                    setSavedConfig(null);
                    setHistory({ past: [], future: [] });
                }
                if (data.slug) {
                    setSlug(data.slug);
                } else {
                    setSlug(null);
                }
            }
        } catch (error) {
            console.error('Load error:', error);
            const targetTemplate = template || 'realtor';
            const defaultConfig = targetTemplate === 'creative' ? creativeConfig : realtorConfig;
            setConfig(defaultConfig);
            setSchema(targetTemplate === 'creative' ? creativeSchema : realtorSchema);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteConfig = async (): Promise<boolean> => {
        setIsSaving(true);
        try {
            const response = await fetch('/api/websites/config', { method: 'DELETE' });
            if (!response.ok) {
                const data = await response.json();
                console.error('Delete failed:', data.error);
                return false;
            }
            const defaultConfig = config.template === 'creative' ? creativeConfig : realtorConfig;
            setConfig(defaultConfig);
            setSchema(config.template === 'creative' ? creativeSchema : realtorSchema);
            setSavedConfig(null);
            setHistory({ past: [], future: [] });
            return true;
        } catch (error) {
            console.error('Delete error:', error);
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <BuilderContext.Provider value={{
            config,
            schema,
            slug,
            setConfig,
            updateTemplate,
            updateColor,
            updateLogo,
            updateText,
            updateImage,
            updateSocialLink,
            removeSocialLink,
            undo,
            redo,
            canUndo: history.past.length > 0,
            canRedo: history.future.length > 0,
            saveConfig,
            loadConfig,
            deleteConfig,
            isSaving,
            isLoading,
            hasUnsavedChanges,

            isReadOnly: readOnly,
            userId,
        }}>
            {children}
        </BuilderContext.Provider>
    );
};

export const useBuilder = () => {
    const context = useContext(BuilderContext);
    if (context === undefined) {
        throw new Error('useBuilder must be used within a BuilderProvider');
    }
    return context;
};

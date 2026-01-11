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
    isPublished: boolean;
    setIsPublished: (published: boolean) => void;
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
    saveConfig: (slug?: string, isPublishedOverride?: boolean) => Promise<boolean>;
    loadConfig: (template?: 'realtor' | 'creative') => Promise<void>;
    deleteConfig: () => Promise<boolean>;
    isSaving: boolean;
    isLoading: boolean;
    hasUnsavedChanges: boolean;
    isReadOnly: boolean;
    setConfig: (config: WebsiteConfig) => void;
    userId?: string;
}

import { realtorConfig } from '@/config/templates/realtor.config';
import { creativeConfig } from '@/config/templates/creative.config';

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
    const [isPublished, setIsPublished] = useState(false);
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

    const saveConfig = useCallback(async (newSlug?: string, isPublishedOverride?: boolean): Promise<boolean> => {
        setIsSaving(true);
        try {
            const publishedState = isPublishedOverride !== undefined ? isPublishedOverride : isPublished;
            const response = await fetch('/api/websites/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ config, slug: newSlug, template: config.template, is_published: publishedState }),
            });
            if (!response.ok) {
                const data = await response.json();
                console.error('Save failed:', data.error);
                return false;
            }
            setSavedConfig(config);
            if (newSlug) setSlug(newSlug);
            if (isPublishedOverride !== undefined) setIsPublished(isPublishedOverride);
            return true;
        } catch (error) {
            console.error('Save error:', error);
            return false;
        } finally {
            setIsSaving(false);
        }
    }, [config, isPublished]);

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
                setIsPublished(data.is_published || false);
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
            isPublished,
            setIsPublished,
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

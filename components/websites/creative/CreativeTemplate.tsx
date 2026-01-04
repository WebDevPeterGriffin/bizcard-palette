import React from "react";
import { useBuilder } from "@/context/BuilderContext";
import { CreativeHero } from "./CreativeHero";
import { CreativeAbout } from "./CreativeAbout";
import { CreativeGallery } from "./CreativeGallery";
import { CreativeContact } from "./CreativeContact";

export const CreativeTemplate = () => {
    const { config } = useBuilder();

    // Force dark theme for this template, but allow overrides via config
    const themeStyles = {
        backgroundColor: config.colors.background || '#000000',
        color: config.colors.text || '#ffffff',
        '--background': config.colors.background || '#000000',
        '--text': config.colors.text || '#ffffff',
        '--primary': config.colors.primary,
        '--secondary': config.colors.secondary,
        '--accent': config.colors.accent,
        fontFamily: 'system-ui, -apple-system, sans-serif',
    } as React.CSSProperties;

    return (
        <div style={themeStyles} className="min-h-screen w-full overflow-x-hidden bg-black selection:bg-purple-500/30 selection:text-purple-200">
            <CreativeHero config={config} />
            <CreativeAbout config={config} />
            <CreativeGallery config={config} />
            <CreativeContact config={config} />
        </div>
    );
};

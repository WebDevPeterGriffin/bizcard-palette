import { WebsiteConfig } from "@/context/BuilderContext";

export const creativeConfig: WebsiteConfig = {
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

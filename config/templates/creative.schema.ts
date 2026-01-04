import { TemplateSchema } from "@/types/builder";

export const creativeSchema: TemplateSchema = {
    template: 'creative',
    colors: [
        { key: 'primary', label: 'Primary Color', defaultValue: '#8B5CF6' },
        { key: 'secondary', label: 'Secondary Color', defaultValue: '#EC4899' },
        { key: 'text', label: 'Text Color', defaultValue: '#ffffff' },
        { key: 'background', label: 'Background Color', defaultValue: '#09090b' },
        { key: 'accent', label: 'Accent Color', defaultValue: '#8B5CF6' },
    ],
    assets: [
        { key: 'headshot', label: 'Headshot', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop' },
        { key: 'gallery1', label: 'Gallery Image 1', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop' },
        { key: 'gallery2', label: 'Gallery Image 2', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2070&auto=format&fit=crop' },
        { key: 'gallery3', label: 'Gallery Image 3', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop' },
        { key: 'gallery4', label: 'Gallery Image 4', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop' },
    ],
    content: [
        {
            section: 'Brand',
            fields: [
                { key: 'brand.name', label: 'Brand Name', type: 'text', defaultValue: 'Creative Brand' },
            ]
        },
        {
            section: 'Hero Section',
            fields: [
                { key: 'hero.title', label: 'Headline', type: 'textarea', defaultValue: 'Visionary Design' },
                { key: 'hero.subtitle', label: 'Subtitle', type: 'textarea', defaultValue: 'We craft digital experiences that defy expectations.' },
                { key: 'hero.cta', label: 'Button Text', type: 'text', defaultValue: 'Explore Work' },
            ]
        },
        {
            section: 'About Section',
            fields: [
                { key: 'about.title', label: 'Title', type: 'text', defaultValue: 'About Me' },
                { key: 'about.description', label: 'Bio', type: 'textarea', defaultValue: 'I am a dedicated professional with a passion for excellence.' },
                { key: 'about.stat.number', label: 'Stat Number', type: 'text', defaultValue: '15+' },
                { key: 'about.stat.label', label: 'Stat Label', type: 'text', defaultValue: 'Years Experience' },
            ]
        },
        {
            section: 'Gallery',
            fields: [
                { key: 'gallery.title', label: 'Section Title', type: 'text', defaultValue: 'SELECTED WORK' },
            ]
        },
        {
            section: 'Contact',
            fields: [
                { key: 'contact.email', label: 'Email', type: 'text', defaultValue: 'hello@example.com' },
                { key: 'contact.phone', label: 'Phone', type: 'text', defaultValue: '+1 (555) 000-0000' },
            ]
        }
    ]
};

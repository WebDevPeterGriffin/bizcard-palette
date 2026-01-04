import { TemplateSchema } from "@/types/builder";

export const realtorSchema: TemplateSchema = {
    template: 'realtor',
    colors: [
        { key: 'primary', label: 'Primary Color', defaultValue: '#1A2D49' },
        { key: 'secondary', label: 'Secondary Color', defaultValue: '#F59E0B' },
        { key: 'text', label: 'Text Color', defaultValue: '#0f172a' },
        { key: 'background', label: 'Background Color', defaultValue: '#ffffff' },
        { key: 'accent', label: 'Accent Color', defaultValue: '#F59E0B' },
    ],
    assets: [
        { key: 'headshot', label: 'Headshot', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop' },
        { key: 'hero-bg', label: 'Hero Background', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1600596542815-27b88e54e618?q=80&w=2076&auto=format&fit=crop' },
        { key: 'personal', label: 'Personal Logo', type: 'logo' },
        { key: 'broker', label: 'Broker Logo', type: 'logo' },
    ],
    content: [
        {
            section: 'Brand',
            fields: [
                { key: 'brand.name', label: 'Brand Name', type: 'text', defaultValue: 'LUXE ESTATES' },
            ]
        },
        {
            section: 'Hero Section',
            fields: [
                { key: 'hero.title', label: 'Headline', type: 'textarea', defaultValue: 'Find Your Dream \nSanctuary' },
                { key: 'hero.subtitle', label: 'Subtitle', type: 'textarea', defaultValue: 'Exclusive properties for exclusive lifestyles. We help you find the perfect home that matches your vision and ambition.' },
                { key: 'hero.cta', label: 'Button Text', type: 'text', defaultValue: 'Explore Properties' },
            ]
        },
        {
            section: 'About Section',
            fields: [
                { key: 'about.title', label: 'Title', type: 'text', defaultValue: 'About Me' },
                { key: 'about.description', label: 'Bio', type: 'textarea', defaultValue: 'I am a dedicated real estate professional with over 15 years of experience in the luxury market. My mission is to help you find not just a house, but a place where you can truly belong.' },
                { key: 'about.stat.number', label: 'Stat Number', type: 'text', defaultValue: '15+' },
                { key: 'about.stat.label', label: 'Stat Label', type: 'text', defaultValue: 'Years of Experience in Luxury Real Estate' },
                { key: 'about.checklist1', label: 'Checklist Item 1', type: 'text', defaultValue: 'Certified Luxury Home Marketing Specialist' },
                { key: 'about.checklist2', label: 'Checklist Item 2', type: 'text', defaultValue: 'Top 1% Producer in the Region' },
                { key: 'about.checklist3', label: 'Checklist Item 3', type: 'text', defaultValue: 'Expert in Negotiation and Market Analysis' },
                { key: 'about.cta', label: 'Button Text', type: 'text', defaultValue: 'Read Full Bio' },
            ]
        },
        {
            section: 'Services',
            fields: [
                { key: 'services.title', label: 'Section Title', type: 'text', defaultValue: 'Our Services' },
                { key: 'services.subtitle', label: 'Subtitle', type: 'text', defaultValue: 'Comprehensive real estate solutions tailored to your unique needs.' },
                { key: 'services.description', label: 'Description', type: 'textarea', defaultValue: "Whether you're buying, selling, or investing, we provide the expertise and support you need to achieve your goals." },
                { key: 'services.buying.title', label: 'Buying Title', type: 'text', defaultValue: 'Buying a Home' },
                { key: 'services.buying.description', label: 'Buying Description', type: 'textarea', defaultValue: 'Find your perfect sanctuary with our curated property search and expert guidance through every step.' },
                { key: 'services.selling.title', label: 'Selling Title', type: 'text', defaultValue: 'Selling Your Home' },
                { key: 'services.selling.description', label: 'Selling Description', type: 'textarea', defaultValue: "Maximize your property's value with our strategic marketing, staging advice, and negotiation skills." },
                { key: 'services.market.title', label: 'Market Title', type: 'text', defaultValue: 'Market Analysis' },
                { key: 'services.market.description', label: 'Market Description', type: 'textarea', defaultValue: 'Make informed decisions with our comprehensive market reports and investment insights.' },
            ]
        },
        {
            section: 'Why Choose Me',
            fields: [
                { key: 'why.title', label: 'Title', type: 'text', defaultValue: 'Why Choose Me' },
                { key: 'why.subtitle', label: 'Subtitle', type: 'text', defaultValue: 'Unmatched Dedication to Your Success' },
                { key: 'why.description', label: 'Description', type: 'textarea', defaultValue: 'In a crowded market, experience and integrity matter. My proven track record and client-first approach ensure that your real estate journey is smooth, successful, and stress-free.' },
                { key: 'why.stat1.number', label: 'Stat 1 Number', type: 'text', defaultValue: '150+' },
                { key: 'why.stat1.label', label: 'Stat 1 Label', type: 'text', defaultValue: 'Homes Sold' },
                { key: 'why.stat2.number', label: 'Stat 2 Number', type: 'text', defaultValue: '$250M' },
                { key: 'why.stat2.label', label: 'Stat 2 Label', type: 'text', defaultValue: 'Sales Volume' },
                { key: 'why.reason1.title', label: 'Reason 1 Title', type: 'text', defaultValue: 'Award Winning' },
                { key: 'why.reason1.description', label: 'Reason 1 Desc', type: 'textarea', defaultValue: 'Recognized excellence in luxury real estate sales.' },
                { key: 'why.reason2.title', label: 'Reason 2 Title', type: 'text', defaultValue: '24/7 Availability' },
                { key: 'why.reason2.description', label: 'Reason 2 Desc', type: 'textarea', defaultValue: 'Always available to answer your questions and concerns.' },
                { key: 'why.reason3.title', label: 'Reason 3 Title', type: 'text', defaultValue: 'Vast Network' },
                { key: 'why.reason3.description', label: 'Reason 3 Desc', type: 'textarea', defaultValue: 'Access to exclusive off-market listings and buyers.' },
                { key: 'why.reason4.title', label: 'Reason 4 Title', type: 'text', defaultValue: 'Trusted Advisor' },
                { key: 'why.reason4.description', label: 'Reason 4 Desc', type: 'textarea', defaultValue: 'Honest, transparent, and ethical representation.' },
            ]
        },
        {
            section: 'Testimonials',
            fields: [
                { key: 'social.title', label: 'Title', type: 'text', defaultValue: 'Testimonials' },
                { key: 'social.subtitle', label: 'Subtitle', type: 'text', defaultValue: 'What My Clients Say' },
                { key: 'social.testimonial1.text', label: 'Testimonial 1', type: 'textarea', defaultValue: "We couldn't have asked for a better agent. Their knowledge of the market and negotiation skills got us our dream home under asking price!" },
                { key: 'social.testimonial1.author', label: 'Author 1', type: 'text', defaultValue: 'Sarah & James M.' },
                { key: 'social.testimonial1.location', label: 'Location 1', type: 'text', defaultValue: 'Beverly Hills, CA' },
                { key: 'social.testimonial2.text', label: 'Testimonial 2', type: 'textarea', defaultValue: 'Professional, attentive, and incredibly hardworking. Sold our property in record time for a price we didn\'t think was possible.' },
                { key: 'social.testimonial2.author', label: 'Author 2', type: 'text', defaultValue: 'Robert T.' },
                { key: 'social.testimonial2.location', label: 'Location 2', type: 'text', defaultValue: 'Hollywood Hills, CA' },
                { key: 'social.testimonial3.text', label: 'Testimonial 3', type: 'textarea', defaultValue: 'Guided us through every step of the process with patience and expertise. Truly went above and beyond our expectations.' },
                { key: 'social.testimonial3.author', label: 'Author 3', type: 'text', defaultValue: 'Emily R.' },
                { key: 'social.testimonial3.location', label: 'Location 3', type: 'text', defaultValue: 'Santa Monica, CA' },
            ]
        },
        {
            section: 'Consultation',
            fields: [
                { key: 'consultation.title', label: 'Title', type: 'text', defaultValue: 'Ready to Find Your Dream Home?' },
                { key: 'consultation.text', label: 'Text', type: 'textarea', defaultValue: "Let's discuss your real estate goals. Schedule a free, no-obligation consultation today." },
                { key: 'consultation.cta', label: 'Button Text', type: 'text', defaultValue: 'Book a Call' },
            ]
        },
        {
            section: 'Contact',
            fields: [
                { key: 'contact.title', label: 'Title', type: 'text', defaultValue: 'Get in Touch' },
                { key: 'contact.subtitle', label: 'Subtitle', type: 'text', defaultValue: "Let's Start a Conversation" },
                { key: 'contact.phone', label: 'Phone', type: 'text', defaultValue: '+1 (555) 123-4567' },
                { key: 'contact.email', label: 'Email', type: 'text', defaultValue: 'hello@luxeestates.com' },
                { key: 'contact.address', label: 'Address', type: 'text', defaultValue: '123 Luxury Blvd, Beverly Hills, CA 90210' },
            ]
        }
    ]
};

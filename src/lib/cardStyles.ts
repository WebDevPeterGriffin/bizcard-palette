export const getBackgroundClass = (style: string) => {
    switch (style) {
        case 'minimal':
            return 'bg-gradient-minimal';
        case 'bold':
            return 'bg-gradient-bold';
        case 'elegant':
            return 'bg-gradient-elegant';
        case 'creative':
            return 'bg-gradient-creative';
        case 'neon':
            return 'bg-gray-900';
        case 'floating':
            return 'bg-gradient-to-br from-blue-50 to-indigo-100';
        case 'liquid':
            return 'bg-gradient-liquid-bg';
        case 'cosmic':
            return 'bg-gradient-to-b from-black via-indigo-950 to-black';
        default:
            return 'bg-background';
    }
};

export const isDarkStyle = (style: string) => {
    return ['bold', 'creative', 'neon', 'liquid', 'cosmic'].includes(style);
};

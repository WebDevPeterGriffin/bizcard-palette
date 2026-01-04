export interface TemplateSchema {
    template: 'realtor' | 'creative';
    colors: {
        key: string;
        label: string;
        defaultValue: string;
    }[];
    assets: {
        key: string;
        label: string;
        type: 'image' | 'logo';
        defaultValue?: string;
    }[];
    content: {
        section: string;
        fields: {
            key: string;
            label: string;
            type: 'text' | 'textarea' | 'rich-text';
            defaultValue: string;
        }[];
    }[];
}

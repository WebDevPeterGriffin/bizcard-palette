import React from 'react';
import { Mail, Phone, Globe } from 'lucide-react';

interface ContactInfoProps {
    email?: string;
    phone?: string;
    website?: string;
    className?: string;
    itemClassName?: string;
    iconClassName?: string;
    textClassName?: string;
    showIcons?: boolean;
}

/**
 * Shared contact information component
 * Displays email, phone, and website with optional icons
 */
export const ContactInfo: React.FC<ContactInfoProps> = ({
    email,
    phone,
    website,
    className = "space-y-2",
    itemClassName = "flex items-center gap-2",
    iconClassName = "w-4 h-4",
    textClassName = "",
    showIcons = true
}) => {
    const contactItems = [
        { icon: Mail, text: email, label: 'Email' },
        { icon: Phone, text: phone, label: 'Phone' },
        { icon: Globe, text: website, label: 'Website' }
    ].filter(item => item.text);

    if (contactItems.length === 0) return null;

    return (
        <div className={className}>
            {contactItems.map((item, index) => (
                <div key={index} className={itemClassName}>
                    {showIcons && <item.icon className={iconClassName} />}
                    <span className={textClassName}>{item.text}</span>
                </div>
            ))}
        </div>
    );
};

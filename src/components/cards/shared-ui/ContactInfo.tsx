import React from 'react';
import { Mail, Phone, Globe } from 'lucide-react';

interface ContactInfoProps {
    emails?: string[];
    phones?: string[];
    website?: string;
    className?: string;
    itemClassName?: string;
    iconClassName?: string;
    textClassName?: string;
    showIcons?: boolean;
}

/**
 * Shared contact information component
 * Displays emails, phones, and website with clickable links
 */
export const ContactInfo: React.FC<ContactInfoProps> = ({
    emails = [],
    phones = [],
    website,
    className = "space-y-2",
    itemClassName = "flex items-center gap-2",
    iconClassName = "w-4 h-4",
    textClassName = "",
    showIcons = true
}) => {
    // Helper to clean phone numbers for tel: links
    const cleanPhoneNumber = (phone: string): string => {
        return phone.replace(/[\s\-().]/g, '');
    };

    // Helper to format website URL
    const formatWebsiteUrl = (url: string): string => {
        if (!url) return '';
        // Add https:// if no protocol is present
        if (!/^https?:\/\//i.test(url)) {
            return `https://${url}`;
        }
        return url;
    };

    const hasContacts = emails.length > 0 || phones.length > 0 || website;
    if (!hasContacts) return null;

    return (
        <div className={className}>
            {emails.map((email, index) => (
                <div key={`email-${index}`} className={itemClassName}>
                    {showIcons && <Mail className={iconClassName} />}
                    <a
                        href={`mailto:${email}`}
                        className={`${textClassName} hover:underline`}
                    >
                        {email}
                    </a>
                </div>
            ))}
            {phones.map((phone, index) => (
                <div key={`phone-${index}`} className={itemClassName}>
                    {showIcons && <Phone className={iconClassName} />}
                    <a
                        href={`tel:${cleanPhoneNumber(phone)}`}
                        className={`${textClassName} hover:underline`}
                    >
                        {phone}
                    </a>
                </div>
            ))}
            {website && (
                <div className={itemClassName}>
                    {showIcons && <Globe className={iconClassName} />}
                    <a
                        href={formatWebsiteUrl(website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${textClassName} hover:underline`}
                    >
                        {website}
                    </a>
                </div>
            )}
        </div>
    );
};

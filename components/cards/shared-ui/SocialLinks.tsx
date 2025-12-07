import React from 'react';
import { SocialLink } from '../shared';
import { getSocialIcon, getSocialUrl } from '@/lib/socialUtils';

interface SocialLinksProps {
    socialLinks: SocialLink[];
    className?: string;
    linkClassName?: string;
    iconClassName?: string;
}

/**
 * Shared social links component
 * Renders social media links with icons using the centralized social utilities
 */
export const SocialLinks: React.FC<SocialLinksProps> = ({
    socialLinks,
    className = "flex gap-4 justify-center",
    linkClassName = "hover:opacity-70 transition-opacity",
    iconClassName = "w-6 h-6"
}) => {
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
        <div className={className}>
            {socialLinks.map((link, index) => {
                const icon = getSocialIcon(link.platform);
                const url = getSocialUrl(link.platform, link.url);

                return (
                    <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClassName}
                        aria-label={link.label || link.platform}
                    >
                        {React.cloneElement(icon, { className: iconClassName })}
                    </a>
                );
            })}
        </div>
    );
};

import { useMemo } from 'react';
import { SocialLink } from '@/components/cards/shared';

interface UseSocialLinksProps {
    socialLinks?: SocialLink[];
    linkedin?: string;
    twitter?: string;
}

/**
 * Hook to handle social links with graceful migration from legacy props
 * Consolidates socialLinks array with legacy linkedin/twitter props
 */
export const useSocialLinks = ({
    socialLinks = [],
    linkedin,
    twitter
}: UseSocialLinksProps): SocialLink[] => {
    return useMemo(() => {
        // If we have socialLinks, use them directly
        if (socialLinks.length > 0) {
            return socialLinks;
        }

        // Otherwise, migrate legacy props
        const legacyLinks: SocialLink[] = [];

        if (linkedin) {
            legacyLinks.push({
                platform: 'linkedin',
                url: linkedin,
                label: 'LinkedIn'
            });
        }

        if (twitter) {
            legacyLinks.push({
                platform: 'twitter',
                url: twitter,
                label: 'Twitter'
            });
        }

        return legacyLinks;
    }, [socialLinks, linkedin, twitter]);
};

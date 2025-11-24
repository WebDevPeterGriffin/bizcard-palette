/**
 * Unified Type System for Business Cards
 * Single source of truth for all card-related types
 */

import { SocialLink } from '@/components/cards/shared';
import { Json } from '@/integrations/supabase/types';

/**
 * Valid card style identifiers (matching database style_id values)
 */
export type CardStyleId =
    | 'minimal'
    | 'bold'
    | 'elegant'
    | 'neon'
    | 'floating'
    | 'watercolor'
    | 'modern'
    | 'dynamic'
    | 'premium'
    | 'vintage'
    | 'glitch'
    | 'monochrome'
    | 'ethereal';

/**
 * Database record structure (raw data from Supabase cards table)
 */
export interface CardRecord {
    id: string;
    created_at: string;
    updated_at: string;
    full_name: string;
    role: string | null;
    company: string | null;
    email: string | null;
    phone: string | null;
    website: string | null;
    headshot_url: string | null;
    style_id: string;
    socials: Json | null;
    slug: string;
    booking_enabled: boolean;
    booking_instructions: string | null;
    booking_calendar_url: string | null;
    scheduled_deletion_at: string | null;
}

/**
 * Normalized card data structure (for application use)
 * All optional fields with consistent camelCase naming
 */
export interface CardData {
    id: string;
    name: string;
    title: string;
    company: string;
    email: string;
    phone: string;
    website: string;
    headshotUrl?: string;
    style: string;
    socialLinks: SocialLink[];
    slug: string;
    createdAt: string;
    bookingEnabled: boolean;
    bookingInstructions?: string;
    bookingCalendarUrl?: string;
}

/**
 * Converts a database record to normalized card data
 * Handles legacy socials object migration and field normalization
 */
export const recordToCardData = (record: CardRecord, headshotUrl?: string): CardData => {
    // Parse socials JSON to SocialLink array
    const socialsObj = (record.socials as Record<string, string>) || {};
    const socialLinks: SocialLink[] = Object.entries(socialsObj)
        .map(([platform, url]) => ({
            platform,
            url: url as string,
            label: platform.charAt(0).toUpperCase() + platform.slice(1),
        }))
        .filter((link) => link.url && link.url.trim() !== '');

    return {
        id: record.id,
        name: record.full_name,
        title: record.role || '',
        company: record.company || '',
        email: record.email || '',
        phone: record.phone || '',
        website: record.website || '',
        headshotUrl: headshotUrl,
        style: record.style_id,
        socialLinks,
        slug: record.slug,
        createdAt: record.created_at,
        bookingEnabled: !!record.booking_enabled,
        bookingInstructions: record.booking_instructions || '',
        bookingCalendarUrl: record.booking_calendar_url || undefined,
    };
};

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface BaseCardProps {
  cardId?: string;
  name?: string;
  title?: string;
  company?: string;
  phones?: string[];
  emails?: string[];
  website?: string;
  location?: string;
  headshotUrl?: string;
  socialLinks?: SocialLink[];
  slug?: string;
  bookingEnabled?: boolean;
  bookingInstructions?: string;
  // Legacy social link properties for backward compatibility
  linkedin?: string;
  twitter?: string;
}
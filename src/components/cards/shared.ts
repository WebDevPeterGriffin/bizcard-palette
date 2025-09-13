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
  phone?: string;
  email?: string;
  website?: string;
  location?: string;
  headshotUrl?: string;
  socialLinks?: SocialLink[];
  slug?: string;
  bookingEnabled?: boolean;
  bookingInstructions?: string;
}
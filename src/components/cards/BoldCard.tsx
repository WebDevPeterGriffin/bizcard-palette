import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BaseCardProps } from './shared';
import { ProfileSection, ContactInfo, SocialLinks, QRSection } from './shared-ui';
import { ContactActions } from '@/components/ContactActions';
import { useSocialLinks } from '@/hooks/useSocialLinks';

const BoldCard: React.FC<BaseCardProps> = (props) => {
  const {
    cardId = '',
    name = 'Sarah Johnson',
    title = 'Creative Director',
    company = 'Design Studio Pro',
    phone = '+1 (555) 987-6543',
    email = 'sarah.j@designpro.com',
    website = 'www.sarahdesigns.com',
    headshotUrl,
    socialLinks = [],
    slug = '',
    bookingEnabled = false,
    bookingInstructions = '',
    linkedin,
    twitter,
  } = props;

  // Handle legacy social links migration
  const displaySocialLinks = useSocialLinks({ socialLinks, linkedin, twitter });

  // Generate QR code URL
  const qrValue = typeof window !== 'undefined'
    ? `${window.location.origin}/${slug}`
    : '';

  return (
    <Card className="mx-auto w-full max-w-md bg-gradient-bold border-bold-accent shadow-card">
      <CardContent className="p-8 text-center">
        {/* Profile Section */}
        <ProfileSection
          headshotUrl={headshotUrl}
          name={name}
          title={title}
          company={company}
          className="mb-6"
          headshotClassName="mx-auto mb-4 h-32 w-32 md:h-36 md:w-36 rounded-full bg-bold-accent flex items-center justify-center overflow-hidden"
          nameClassName="mb-1 text-2xl font-bold text-white"
          titleClassName="text-lg text-bold-accent"
          companyClassName="text-sm font-medium text-white/80"
        />

        {/* Contact Info */}
        <ContactInfo
          email={email}
          phone={phone}
          website={website}
          className="space-y-4 border-t border-white/20 pt-6"
          itemClassName="rounded-lg bg-white/5 p-3 hover:bg-white/10 transition-colors block"
          iconClassName="h-5 w-5 text-bold-accent"
          textClassName="text-white font-medium"
          showIcons={true}
        />

        {/* Social Links */}
        {displaySocialLinks.length > 0 && (
          <SocialLinks
            socialLinks={displaySocialLinks}
            className="mt-6 border-t border-white/20 pt-6 flex justify-center gap-4"
            linkClassName="rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors"
            iconClassName="w-6 h-6 text-white"
          />
        )}

        {/* Contact Actions */}
        {cardId && (
          <ContactActions
            cardId={cardId}
            name={name}
            title={title}
            company={company}
            phone={phone}
            email={email}
            website={website}
            socialLinks={displaySocialLinks}
            headshotUrl={headshotUrl}
            bookingEnabled={bookingEnabled}
            bookingInstructions={bookingInstructions}
            style="bold"
            className="mt-6 border-t border-white/20 pt-6"
          />
        )}

        {/* QR Code */}
        {slug && qrValue && (
          <QRSection
            value={qrValue}
            size={160}
            className="mt-6 border-t border-white/20 pt-6"
            fgColor="#ffffff"
            bgColor="transparent"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default BoldCard;
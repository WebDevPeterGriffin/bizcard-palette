import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BaseCardProps } from './shared';
import { ProfileSection, ContactInfo, SocialLinks, QRSection } from './shared-ui';
import { ContactActions } from '@/components/ContactActions';
import { useSocialLinks } from '@/hooks/useSocialLinks';

const MinimalCard: React.FC<BaseCardProps> = (props) => {
  const {
    cardId = '',
    name = 'John Doe',
    title = 'Senior Product Manager',
    company = 'Tech Innovations Inc.',
    phone = '+1 (555) 123-4567',
    email = 'john.doe@techinn.com',
    website = 'www.johndoe.com',
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
    <Card className="mx-auto w-full max-w-md bg-gradient-minimal border-minimal-accent/20 shadow-card">
      <CardContent className="p-8 text-center">
        {/* Profile Section */}
        <ProfileSection
          headshotUrl={headshotUrl}
          name={name}
          title={title}
          company={company}
          className="mb-6"
          headshotClassName="mx-auto mb-4 h-32 w-32 md:h-36 md:w-36 rounded-full bg-minimal-accent/10 flex items-center justify-center overflow-hidden"
          nameClassName="mb-1 text-2xl font-bold text-minimal-accent"
          titleClassName="text-lg text-muted-foreground"
          companyClassName="text-sm font-medium text-minimal-accent/80"
        />

        {/* Contact Info */}
        <ContactInfo
          email={email}
          phone={phone}
          website={website}
          className="space-y-3 border-t border-minimal-accent/10 pt-6"
          itemClassName="flex items-center justify-center space-x-2 hover:text-minimal-accent/80 transition-colors"
          iconClassName="h-4 w-4 text-minimal-accent"
          textClassName="text-sm"
          showIcons={true}
        />

        {/* Social Links */}
        {displaySocialLinks.length > 0 && (
          <SocialLinks
            socialLinks={displaySocialLinks}
            className="mt-6 border-t border-minimal-accent/10 pt-6 flex justify-center flex-wrap gap-4"
            linkClassName="flex items-center space-x-1 text-minimal-accent hover:text-minimal-accent/80 transition-colors"
            iconClassName="w-5 h-5"
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
            style="minimal"
            className="mt-6 border-t border-minimal-accent/10 pt-6"
          />
        )}

        {/* QR Code */}
        {slug && qrValue && (
          <QRSection
            value={qrValue}
            size={180}
            className="mt-6 border-t border-minimal-accent/10 pt-6"
            fgColor="#000000"
            bgColor="#ffffff"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default MinimalCard;
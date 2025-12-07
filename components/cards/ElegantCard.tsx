"use client";
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BaseCardProps } from './shared';
import { ProfileSection, ContactInfo, SocialLinks, QRSection } from './shared-ui';
import { ContactActions } from '@/components/ContactActions';
import { useSocialLinks } from '@/hooks/useSocialLinks';

const ElegantCard: React.FC<BaseCardProps> = (props) => {
  const {
    cardId = '',
    name = 'Alexander Reed',
    title = 'Managing Partner',
    company = 'Reed & Associates Law',
    phones = ['+1 (555) 246-8135'],
    emails = ['a.reed@reedlaw.com'],
    website = 'www.reedlawfirm.com',
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
    <Card className="mx-auto w-full max-w-md bg-gradient-elegant border-elegant-accent/30 shadow-card">
      <CardContent className="p-8">
        {/* Header with gold accent line */}
        <div className="border-b-2 border-elegant-accent pb-6 mb-6">
          {/* Profile Section */}
          <ProfileSection
            headshotUrl={headshotUrl}
            name={name}
            title={title}
            company={company}
            className="text-center"
            headshotClassName="mx-auto mb-4 h-32 w-32 md:h-36 md:w-36 rounded-full bg-elegant-accent/20 flex items-center justify-center border-2 border-elegant-accent/30 overflow-hidden"
            nameClassName="mb-2 text-2xl font-serif font-bold text-gray-800"
            titleClassName="text-lg font-medium text-elegant-accent"
            companyClassName="text-sm font-serif text-gray-600 italic"
          />
        </div>

        {/* Contact Information */}
        <ContactInfo
          emails={emails}
          phones={phones}
          website={website}
          className="space-y-3"
          itemClassName="flex items-center space-x-3 p-2 rounded-md hover:bg-elegant-accent/5 transition-colors"
          iconClassName="h-4 w-4 text-elegant-accent"
          textClassName="text-sm font-medium text-gray-700"
          showIcons={true}
        />

        {/* Social Links */}
        {displaySocialLinks.length > 0 && (
          <SocialLinks
            socialLinks={displaySocialLinks}
            className="mt-6 border-t border-elegant-accent/20 pt-6 flex justify-center gap-4"
            linkClassName="rounded-full border border-elegant-accent/30 p-2 hover:bg-elegant-accent/10 transition-colors"
            iconClassName="w-5 h-5 text-elegant-accent"
          />
        )}

        {/* Contact Actions */}
        {cardId && (
          <ContactActions
            cardId={cardId}
            name={name}
            title={title}
            company={company}
            phones={phones}
            emails={emails}
            website={website}
            socialLinks={displaySocialLinks}
            headshotUrl={headshotUrl}
            bookingEnabled={bookingEnabled}
            bookingInstructions={bookingInstructions}
            style="elegant"
            isDark={false}
            className="mt-6 border-t border-elegant-accent/20 pt-6"
          />
        )}

        {/* QR Code */}
        {slug && qrValue && (
          <QRSection
            value={qrValue}
            size={140}
            className="mt-6 border-t border-elegant-accent/20 pt-6"
            fgColor="#6B5B47"
            bgColor="#ffffff"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(ElegantCard);
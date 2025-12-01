import React from 'react';
import { Sparkles, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BaseCardProps } from './shared';
import { ProfileSection, ContactInfo, SocialLinks, QRSection } from './shared-ui';
import { ContactActions } from '@/components/ContactActions';
import { useSocialLinks } from '@/hooks/useSocialLinks';

const CreativeCard: React.FC<BaseCardProps> = (props) => {
  const {
    cardId = '',
    name = 'Maya Chen',
    title = 'UX/UI Designer',
    company = 'Creative Pixel Studio',
    phones = ['+1 (555) 369-2580'],
    emails = ['maya@creativepixel.com'],
    website = 'www.mayachen.design',
    headshotUrl,
    socialLinks = [],
    slug = '',
    bookingEnabled = false,
    bookingInstructions = '',
    linkedin,
    twitter,
  } = props;

  const displaySocialLinks = useSocialLinks({ socialLinks, linkedin, twitter });

  const qrValue = typeof window !== 'undefined'
    ? `${window.location.origin}/${slug}`
    : '';

  return (
    <div className="mx-auto w-full max-w-md">
      <Card className="relative overflow-hidden bg-gradient-creative shadow-card">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4">
          <Sparkles className="h-6 w-6 text-white/40 animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Heart className="h-5 w-5 text-white/30" />
        </div>

        <CardContent className="relative p-8 text-center text-white">
          {/* Profile Section */}
          <ProfileSection
            headshotUrl={headshotUrl}
            name={name}
            title={title}
            company={company}
            className="mb-6"
            headshotClassName="mx-auto mb-4 h-32 w-32 md:h-36 md:w-36 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30 overflow-hidden"
            nameClassName="mb-1 text-2xl font-bold drop-shadow-lg"
            titleClassName="rounded-full bg-white/20 backdrop-blur-sm px-4 py-1 mb-2 text-base font-semibold inline-block"
            companyClassName="text-sm font-medium text-white/90"
          />

          {/* Contact Info */}
          <ContactInfo
            emails={emails}
            phones={phones}
            website={website}
            className="space-y-3 border-t border-white/20 pt-6"
            itemClassName="flex items-center justify-center space-x-2 backdrop-blur-sm bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
            iconClassName="h-4 w-4"
            textClassName="text-sm"
            showIcons={true}
          />

          {/* Social Links */}
          {displaySocialLinks.length > 0 && (
            <SocialLinks
              socialLinks={displaySocialLinks}
              className="mt-6 border-t border-white/20 pt-6 flex justify-center gap-3"
              linkClassName="backdrop-blur-sm bg-white/10 p-3 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-200"
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
              phones={phones}
              emails={emails}
              website={website}
              socialLinks={displaySocialLinks}
              headshotUrl={headshotUrl}
              bookingEnabled={bookingEnabled}
              bookingInstructions={bookingInstructions}
              style="creative"
              className="mt-6 border-t border-white/20 pt-6"
            />
          )}

          {/* QR Code */}
          {slug && qrValue && (
            <QRSection
              value={qrValue}
              size={140}
              className="mt-6 border-t border-white/20 pt-6"
              fgColor="#ffffff"
              bgColor="transparent"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreativeCard;
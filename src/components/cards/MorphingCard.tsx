import React from 'react';
import { Card } from "@/components/ui/card";
import { BaseCardProps } from './shared';
import { ProfileSection, ContactInfo, SocialLinks, QRSection } from './shared-ui';
import { ContactActions } from '@/components/ContactActions';
import { useSocialLinks } from '@/hooks/useSocialLinks';

const MorphingCard: React.FC<BaseCardProps> = (props) => {
  const {
    cardId = '',
    name = 'Alex Rivera',
    title = 'Creative Director',
    company = 'Design Studio',
    phone = '+1 (555) 456-7890',
    email = 'alex@design.com',
    website = 'www.alexrivera.com',
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
    ? `${window.location.origin}/card/${slug}`
    : '';

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Card className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 border-0 rounded-3xl p-8 text-white overflow-hidden">
        {/* Morphing background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-600/30 animate-[morph_8s_ease-in-out_infinite]"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-cyan-600/20 via-blue-600/20 to-indigo-600/20 animate-[morph_6s_ease-in-out_infinite_reverse]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/25 via-pink-600/25 to-red-600/25 animate-[morph_10s_ease-in-out_infinite]"></div>
        </div>

        {/* Morphing shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full animate-[morphing-blob_12s_ease-in-out_infinite] blur-xl"></div>
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full animate-[morphing-blob_15s_ease-in-out_infinite_reverse] blur-xl"></div>
        </div>

        <div className="relative z-10">
          <ProfileSection
            headshotUrl={headshotUrl}
            name={name}
            title={title}
            company={company}
            className="text-center mb-6"
            headshotClassName="mx-auto mb-4 h-32 w-32 md:h-36 md:w-36 rounded-full border-4 border-white/30 overflow-hidden shadow-2xl"
            nameClassName="text-3xl font-bold mb-2"
            titleClassName="text-lg font-medium text-purple-200 mb-1"
            companyClassName="text-sm text-indigo-200"
          />

          <ContactInfo
            email={email}
            phone={phone}
            website={website}
            className="space-y-3 mb-5"
            itemClassName="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 hover:bg-white/20 transition-all duration-300 flex items-center space-x-3"
            iconClassName="h-4 w-4"
            textClassName="text-sm"
            showIcons={true}
          />

          {displaySocialLinks.length > 0 && (
            <SocialLinks
              socialLinks={displaySocialLinks}
              className="mb-5 flex justify-center gap-3"
              linkClassName="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300"
              iconClassName="w-5 h-5"
            />
          )}

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
              style="morphing"
              className="mb-5"
            />
          )}

          {slug && qrValue && (
            <QRSection
              value={qrValue}
              size={120}
              className="flex flex-col items-center"
              fgColor="#ffffff"
              bgColor="transparent"
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default MorphingCard;
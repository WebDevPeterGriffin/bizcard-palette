import React from 'react';
import { Card } from "@/components/ui/card";
import { BaseCardProps } from './shared';
import { ProfileSection, ContactInfo, SocialLinks, QRSection } from './shared-ui';
import { ContactActions } from '@/components/ContactActions';
import { useSocialLinks } from '@/hooks/useSocialLinks';

const PrismCard: React.FC<BaseCardProps> = (props) => {
  const {
    cardId = '',
    name = 'Riley Prism',
    title = 'Motion Designer',
    company = 'Spectra Labs',
    phone = '+1 (555) 321-9876',
    email = 'riley@spectra.io',
    website = 'www.rileyprism.art',
    headshotUrl,
    socialLinks = [],
    slug = '',
    bookingEnabled = true,
    bookingInstructions = 'Book a session to craft animated brand visuals.',
    linkedin,
    twitter,
  } = props;

  const displaySocialLinks = useSocialLinks({ socialLinks, linkedin, twitter });

  const qrValue = typeof window !== 'undefined'
    ? `${window.location.origin}/${slug}`
    : '';

  return (
    <Card className="relative w-80 h-auto min-h-[26rem] overflow-hidden border border-white/10 bg-gradient-to-b from-[#0b0b10] via-[#12121a] to-[#0b0b10] backdrop-blur-md mx-auto">
      {/* Animated luxury background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radiant conic halo */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-30 animate-spin"
          style={{
            background: 'conic-gradient(from 0deg, #ec4899, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ec4899)',
            filter: 'blur(60px)',
            animationDuration: '20s',
          }}
        />
        {/* Prismatic light beams */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-pink-500/30 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 p-6 text-white">
        <ProfileSection
          headshotUrl={headshotUrl}
          name={name}
          title={title}
          company={company}
          className="text-center mb-6"
          headshotClassName="mx-auto mb-4 h-32 w-32 md:h-36 md:w-36 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl shadow-purple-500/30"
          nameClassName="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mb-2"
          titleClassName="text-lg text-purple-300 mb-1"
          companyClassName="text-sm text-cyan-300"
        />

        <ContactInfo
          email={email}
          phone={phone}
          website={website}
          className="space-y-3 mb-5"
          itemClassName="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 hover:bg-gradient-to-r hover:from-purple-900/20 hover:to-pink-900/20 transition-all duration-300 flex items-center space-x-3"
          iconClassName="h-4 w-4 text-purple-400"
          textClassName="text-sm"
          showIcons={true}
        />

        {displaySocialLinks.length > 0 && (
          <SocialLinks
            socialLinks={displaySocialLinks}
            className="mb-5 flex justify-center gap-3"
            linkClassName="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-3 hover:bg-gradient-to-r hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-300"
            iconClassName="w-5 h-5 text-cyan-400"
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
            style="prism"
            className="mb-5"
          />
        )}

        {slug && qrValue && (
          <QRSection
            value={qrValue}
            size={120}
            className="flex flex-col items-center"
            fgColor="#a855f7"
            bgColor="transparent"
          />
        )}
      </div>
    </Card>
  );
};

export default PrismCard;

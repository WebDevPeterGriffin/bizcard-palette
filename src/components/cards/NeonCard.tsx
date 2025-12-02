import React from 'react';
import { Card } from "@/components/ui/card";
import { BaseCardProps } from './shared';
import { ProfileSection, ContactInfo, SocialLinks, QRSection } from './shared-ui';
import { ContactActions } from '@/components/ContactActions';
import { useSocialLinks } from '@/hooks/useSocialLinks';

const NeonCard: React.FC<BaseCardProps> = (props) => {
  const {
    cardId = '',
    name = 'Alex Cyber',
    title = 'Digital Architect',
    company = 'Neo Corp',
    phones = ['+1 (555) 123-4567'],
    emails = ['alex@neocorp.io'],
    website = 'www.alexcyber.dev',
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
    <Card className="w-80 h-auto min-h-[26rem] bg-black border-2 border-cyan-500 overflow-hidden relative group mx-auto">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(cyan 1px, transparent 1px),
            linear-gradient(90deg, cyan 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          animation: 'grid-move 3s linear infinite'
        }}></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/2 left-2 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 p-6 pb-6 flex flex-col">
        {/* Profile Section */}
        <ProfileSection
          headshotUrl={headshotUrl}
          name={name}
          title={title}
          company={company}
          className="text-center mb-6"
          headshotClassName="w-32 h-32 md:w-36 md:h-36 mx-auto rounded-full border-2 border-cyan-400 overflow-hidden relative group-hover:border-pink-400 transition-all duration-300 mb-4"
          nameClassName="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2 tracking-wider"
          titleClassName="text-base md:text-lg font-semibold text-cyan-300 mb-1"
          companyClassName="text-sm text-purple-300"
        />

        {/* Contact Info */}
        <ContactInfo
          emails={emails}
          phones={phones}
          website={website}
          className="space-y-3 mb-5"
          itemClassName="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 hover:border-pink-400/50 hover:bg-black/60 transition-all duration-300 flex items-center space-x-3"
          iconClassName="h-4 w-4 text-cyan-400"
          textClassName="text-sm text-gray-200"
          showIcons={true}
        />

        {/* Social Links */}
        {displaySocialLinks.length > 0 && (
          <SocialLinks
            socialLinks={displaySocialLinks}
            className="flex justify-center gap-4 mb-5"
            linkClassName="bg-black/40 backdrop-blur-sm border border-cyan-500/50 rounded-full p-3 hover:border-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300"
            iconClassName="w-5 h-5 text-cyan-300"
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
            style="neon"
            className="mb-5"
          />
        )}

        {/* QR Code */}
        {slug && qrValue && (
          <QRSection
            value={qrValue}
            size={120}
            className="flex flex-col items-center mt-auto"
            fgColor="#22d3ee"
            bgColor="#000000"
          />
        )}
      </div>
    </Card>
  );
};

export default React.memo(NeonCard);
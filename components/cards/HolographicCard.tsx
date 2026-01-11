"use client";
import React from 'react';
import { Card } from "@/components/ui/card";
import { BaseCardProps } from './shared';
import { ProfileSection, ContactInfo, SocialLinks, QRSection } from './shared-ui';
import { ContactActions } from '@/components/ContactActions';
import { useSocialLinks } from '@/hooks/useSocialLinks';

const HolographicCard: React.FC<BaseCardProps> = (props) => {
  const {
    cardId = '',
    name = 'John Doe',
    title = 'Software Engineer',
    company = 'Tech Company',
    phones = ['+1 (555) 123-4567'],
    emails = ['john@tech.com'],
    website = 'www.johndoe.com',
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
    <div className="relative w-full max-w-md mx-auto">
      {/* Holographic glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-75 blur-xl animate-pulse"></div>

      <Card className="relative backdrop-blur-lg bg-black/20 border-2 border-white/10 rounded-3xl p-8 text-white overflow-hidden">
        {/* Animated holographic background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/20 via-transparent to-purple-500/20 animate-[spin_15s_linear_infinite_reverse]"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[slide-in-right_3s_ease-in-out_infinite]"></div>
        </div>

        <div className="relative z-10">
          <ProfileSection
            headshotUrl={headshotUrl}
            name={name}
            title={title}
            company={company}
            className="text-center mb-6"
            headshotClassName="mx-auto mb-4 h-32 w-32 md:h-36 md:w-36 rounded-full border-4 border-white/30 overflow-hidden shadow-2xl hover:shadow-purple-500/50 transition-all object-cover"
            nameClassName="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-2"
            titleClassName="text-lg text-purple-300 mb-1"
            companyClassName="text-sm text-cyan-300"
          />

          <ContactInfo
            emails={emails}
            phones={phones}
            website={website}
            className="space-y-3 mb-5"
            itemClassName="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 flex items-center space-x-3"
            iconClassName="h-4 w-4 text-purple-400"
            textClassName="text-sm"
            showIcons={true}
          />

          {displaySocialLinks.length > 0 && (
            <SocialLinks
              socialLinks={displaySocialLinks}
              className="mb-5 flex justify-center gap-3"
              linkClassName="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-3 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              iconClassName="w-5 h-5 text-cyan-400"
            />
          )}

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
              style="holographic"
              isDark={false}
              className="mb-5"
            />
          )}

          {slug && qrValue && (
            <QRSection
              value={qrValue}
              size={120}
              className="flex flex-col items-center"
              fgColor="#a855f7"
              bgColor="#00000000"
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default React.memo(HolographicCard);
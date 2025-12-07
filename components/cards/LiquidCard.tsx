"use client";
import React from 'react';
import { Waves, Droplets } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BaseCardProps } from './shared';
import { ProfileSection, ContactInfo, SocialLinks, QRSection } from './shared-ui';
import { ContactActions } from '@/components/ContactActions';
import { useSocialLinks } from '@/hooks/useSocialLinks';

const LiquidCard: React.FC<BaseCardProps> = (props) => {
  const {
    cardId = '',
    name = 'Flow Rivera',
    title = 'UX Fluid Designer',
    company = 'Liquid Labs',
    phones = ['+1 (555) 345-6789'],
    emails = ['flow@liquidlabs.design'],
    website = 'www.flowrivera.studio',
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
    <div className="relative w-80 h-auto min-h-[26rem] mx-auto">
      {/* Liquid background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-400"></div>
        {/* Liquid waves */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full"
            style={{
              height: `${30 + i * 15}%`,
              bottom: `-${i * 10}%`,
              background: `radial-gradient(ellipse at center, rgba(6,182,212,${0.3 - i * 0.05}) 0%, transparent 70%)`,
              animation: `liquid-wave ${6 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              borderRadius: '40%',
            }}
          />
        ))}
      </div>

      {/* Liquid droplets */}
      <div className="absolute top-8 right-6 z-20">
        <Droplets className="h-5 w-5 text-white/60 animate-bounce" style={{ animationDuration: '2s' }} />
      </div>
      <div className="absolute bottom-12 left-6 z-20">
        <Waves className="h-6 w-6 text-white/50 animate-pulse" />
      </div>

      <Card className="relative z-10 bg-white/10 backdrop-blur-lg border-2 border-white/20 rounded-3xl shadow-2xl min-h-[26rem]">
        <div className="p-6 text-white">
          <ProfileSection
            headshotUrl={headshotUrl}
            name={name}
            title={title}
            company={company}
            className="text-center mb-6"
            headshotClassName="mx-auto mb-4 h-32 w-32 md:h-36 md:w-36 rounded-full border-4 border-white/40 overflow-hidden shadow-xl"
            nameClassName="text-2xl md:text-3xl font-bold drop-shadow-lg mb-2"
            titleClassName="text-base md:text-lg text-cyan-100 font-semibold mb-1"
            companyClassName="text-sm text-white/90"
          />

          <ContactInfo
            emails={emails}
            phones={phones}
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
              phones={phones}
              emails={emails}
              website={website}
              socialLinks={displaySocialLinks}
              headshotUrl={headshotUrl}
              bookingEnabled={bookingEnabled}
              bookingInstructions={bookingInstructions}
              style="liquid"
              isDark={true}
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

export default React.memo(LiquidCard);
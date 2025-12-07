"use client";
import React from 'react';
import { Star, Sparkles, Zap, Moon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BaseCardProps } from './shared';
import { ProfileSection, ContactInfo, SocialLinks, QRSection } from './shared-ui';
import { ContactActions } from '@/components/ContactActions';
import { useSocialLinks } from '@/hooks/useSocialLinks';

const CosmicCard: React.FC<BaseCardProps> = (props) => {
  const {
    cardId = '',
    name = 'Nova Stellar',
    title = 'Cosmic Designer',
    company = 'Galaxy Studios',
    phones = ['+1 (555) 456-7890'],
    emails = ['nova@galaxystudios.space'],
    website = 'www.novastellar.universe',
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
    <div className="relative w-80 h-auto min-h-[26rem] overflow-hidden mx-auto">
      {/* Cosmic background with moving stars */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden">
        {/* Floating stars with different sizes and animation delays */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
        {/* Shooting stars */}
        <div className="absolute top-10 right-10 w-16 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 left-5 w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Decorative cosmic elements */}
      <div className="absolute top-4 right-4 z-20">
        <Star className="h-5 w-5 text-yellow-400 animate-spin" style={{ animationDuration: '10s' }} />
      </div>
      <div className="absolute top-8 left-4 z-20">
        <Sparkles className="h-4 w-4 text-purple-300 animate-pulse" />
      </div>
      <div className="absolute bottom-8 right-6 z-20">
        <Moon className="h-6 w-6 text-blue-200" />
      </div>

      <Card className="relative z-10 bg-black/40 backdrop-blur-md border-2 border-indigo-500/50 shadow-2xl min-h-[26rem]">
        <div className="p-6">
          {/* Profile Section */}
          <ProfileSection
            headshotUrl={headshotUrl}
            name={name}
            title={title}
            company={company}
            className="text-center mb-6"
            headshotClassName="mx-auto mb-4 h-32 w-32 md:h-36 md:w-36 rounded-full border-4 border-purple-500/50 overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.6)]"
            nameClassName="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mb-2"
            titleClassName="text-base md:text-lg text-purple-300 font-semibold mb-1"
            companyClassName="text-sm text-indigo-300"
          />

          {/* Contact Info */}
          <ContactInfo
            emails={emails}
            phones={phones}
            website={website}
            className="space-y-3 mb-5"
            itemClassName="bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 hover:border-pink-500/50 hover:bg-purple-800/40 transition-all duration-300 flex items-center space-x-3"
            iconClassName="h-4 w-4 text-purple-300"
            textClassName="text-sm text-gray-200"
            showIcons={true}
          />

          {/* Social Links */}
          {displaySocialLinks.length > 0 && (
            <SocialLinks
              socialLinks={displaySocialLinks}
              className="mb-5 flex justify-center gap-3"
              linkClassName="bg-purple-900/30 backdrop-blur-sm border border-purple-500/50 rounded-full p-3 hover:border-pink-400 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all duration-300"
              iconClassName="w-5 h-5 text-purple-200"
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
              style="cosmic"
              isDark={true}
              className="mb-5"
            />
          )}

          {/* QR Code */}
          {slug && qrValue && (
            <QRSection
              value={qrValue}
              size={120}
              className="flex flex-col items-center"
              fgColor="#a78bfa"
              bgColor="#000000"
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default React.memo(CosmicCard);
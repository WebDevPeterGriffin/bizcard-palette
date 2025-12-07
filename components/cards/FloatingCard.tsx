"use client";
import React from 'react';
import { Cloud, Wind, Feather } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BaseCardProps } from './shared';
import { ProfileSection, ContactInfo, SocialLinks, QRSection } from './shared-ui';
import { ContactActions } from '@/components/ContactActions';
import { useSocialLinks } from '@/hooks/useSocialLinks';

const FloatingCard: React.FC<BaseCardProps> = (props) => {
  const {
    cardId = '',
    name = 'Luna Sky',
    title = 'Cloud Architect',
    company = 'Elevate Studios',
    phones = ['+1 (555) 234-5678'],
    emails = ['luna@elevate.cloud'],
    website = 'www.lunasky.design',
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
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-200"></div>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-4 right-4 z-20">
        <Cloud className="h-6 w-6 text-blue-400 animate-bounce" style={{ animationDuration: '3s' }} />
      </div>
      <div className="absolute bottom-8 left-4 z-20">
        <Wind className="h-5 w-5 text-sky-500 animate-pulse" />
      </div>
      <div className="absolute top-1/3 right-8 z-20">
        <Feather className="h-4 w-4 text-indigo-400 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      </div>

      <Card className="relative z-10 bg-white/60 backdrop-blur-md border-2 border-sky-300/50 shadow-2xl min-h-[26rem]">
        <div className="p-6">
          <ProfileSection
            headshotUrl={headshotUrl}
            name={name}
            title={title}
            company={company}
            className="text-center mb-6"
            headshotClassName="mx-auto mb-4 h-32 w-32 md:h-36 md:w-36 rounded-full border-4 border-sky-400/50 overflow-hidden shadow-lg"
            nameClassName="text-2xl md:text-3xl font-bold text-indigo-900 mb-2"
            titleClassName="text-base md:text-lg text-sky-700 font-semibold mb-1"
            companyClassName="text-sm text-blue-600"
          />

          <ContactInfo
            emails={emails}
            phones={phones}
            website={website}
            className="space-y-3 mb-5"
            itemClassName="bg-white/50 backdrop-blur-sm border border-sky-300/40 rounded-lg p-3 hover:border-indigo-400/60 hover:bg-white/70 transition-all duration-300 flex items-center space-x-3"
            iconClassName="h-4 w-4 text-sky-600"
            textClassName="text-sm text-indigo-900"
            showIcons={true}
          />

          {displaySocialLinks.length > 0 && (
            <SocialLinks
              socialLinks={displaySocialLinks}
              className="mb-5 flex justify-center gap-3"
              linkClassName="bg-white/50 backdrop-blur-sm border border-sky-300/50 rounded-full p-3 hover:border-indigo-400 hover:shadow-lg transition-all duration-300"
              iconClassName="w-5 h-5 text-indigo-700"
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
              style="floating"
              isDark={false}
              className="mb-5"
            />
          )}

          {slug && qrValue && (
            <QRSection
              value={qrValue}
              size={120}
              className="flex flex-col items-center"
              fgColor="#3b82f6"
              bgColor="#ffffff"
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default React.memo(FloatingCard);
import React from 'react';
import { Sparkles, Droplet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BaseCardProps } from './shared';
import { ProfileSection, ContactInfo, SocialLinks, QRSection } from './shared-ui';
import { ContactActions } from '@/components/ContactActions';
import { useSocialLinks } from '@/hooks/useSocialLinks';

const LiquidGlassCard: React.FC<BaseCardProps> = (props) => {
  const {
    cardId = '',
    name = 'Alex Glass',
    title = 'Design Architect',
    company = 'Crystal Studios',
    phones = ['+1 (555) 789-0123'],
    emails = ['alex@crystalstudios.co'],
    website = 'www.alexglass.design',
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
      {/* Glassmorphic background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900"></div>
        {/* Liquid glass blobs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: `${100 + Math.random() * 100}px`,
              height: `${100 + Math.random() * 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)`,
              animation: `float ${10 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-6 right-6 z-20">
        <Sparkles className="h-5 w-5 text-white/60 animate-pulse" />
      </div>
      <div className="absolute bottom-10 left-6 z-20">
        <Droplet className="h-6 w-6 text-white/50 animate-bounce" style={{ animationDuration: '3s' }} />
      </div>

      <Card className="relative z-10 bg-white/20 backdrop-blur-2xl border-2 border-white/30 rounded-3xl shadow-2xl min-h-[26rem]">
        <div className="p-6 text-white">
          <ProfileSection
            headshotUrl={headshotUrl}
            name={name}
            title={title}
            company={company}
            className="text-center mb-6"
            headshotClassName="mx-auto mb-4 h-32 w-32 md:h-36 md:w-36 rounded-full border-4 border-white/50 overflow-hidden shadow-xl backdrop-blur-sm"
            nameClassName="text-2xl md:text-3xl font-bold drop-shadow-lg mb-2"
            titleClassName="text-base md:text-lg text-emerald-100 font-semibold mb-1"
            companyClassName="text-sm text-white/90"
          />

          <ContactInfo
            emails={emails}
            phones={phones}
            website={website}
            className="space-y-3 mb-5"
            itemClassName="bg-white/15 backdrop-blur-md border border-white/30 rounded-xl p-3 hover:bg-white/25 transition-all duration-300 flex items-center space-x-3"
            iconClassName="h-4 w-4"
            textClassName="text-sm"
            showIcons={true}
          />

          {displaySocialLinks.length > 0 && (
            <SocialLinks
              socialLinks={displaySocialLinks}
              className="mb-5 flex justify-center gap-3"
              linkClassName="bg-white/15 backdrop-blur-md border border-white/30 rounded-full p-3 hover:bg-white/25 transition-all duration-300"
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
              style="liquid-glass"
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

export default React.memo(LiquidGlassCard);
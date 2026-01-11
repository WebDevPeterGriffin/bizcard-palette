"use client";
import React, { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { BaseCardProps } from './shared';
import { ProfileSection, ContactInfo, SocialLinks, QRSection } from './shared-ui';
import { ContactActions } from '@/components/ContactActions';
import { useSocialLinks } from '@/hooks/useSocialLinks';

const ParticleCard: React.FC<BaseCardProps> = (props) => {
  const {
    cardId = '',
    name = 'Jane Smith',
    title = 'Data Scientist',
    company = 'Analytics Corp',
    phones = ['+1 (555) 987-6543'],
    emails = ['jane@analytics.com'],
    website = 'www.janesmith.com',
    headshotUrl,
    socialLinks = [],
    slug = '',
    bookingEnabled = false,
    bookingInstructions = '',
    linkedin,
    twitter,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const displaySocialLinks = useSocialLinks({ socialLinks, linkedin, twitter });

  const qrValue = typeof window !== 'undefined'
    ? `${window.location.origin}/${slug}`
    : '';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.fillStyle = 'rgba(139, 92, 246, 0.5)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Card className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border border-purple-500/30 rounded-3xl overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div className="relative z-10 p-8 text-white">
          <ProfileSection
            headshotUrl={headshotUrl}
            name={name}
            title={title}
            company={company}
            className="text-center mb-6"
            headshotClassName="mx-auto mb-4 h-32 w-32 md:h-36 md:w-36 rounded-full border-4 border-purple-500/50 overflow-hidden shadow-2xl object-cover"
            nameClassName="text-3xl font-bold mb-2"
            titleClassName="text-lg text-purple-300 mb-1"
            companyClassName="text-sm text-purple-200"
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
              linkClassName="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-3 hover:bg-white/10 transition-all duration-300"
              iconClassName="w-5 h-5 text-purple-300"
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
              style="particle"
              isDark={true}
              className="mb-5"
            />
          )}

          {slug && qrValue && (
            <QRSection
              value={qrValue}
              size={120}
              className="flex flex-col items-center"
              fgColor="#a78bfa"
              bgColor="#00000000"
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default React.memo(ParticleCard);
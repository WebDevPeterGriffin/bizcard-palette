import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { SocialIcon, buildSocialUrl } from "@/components/SocialIcon";
import { ContactActions } from "@/components/ContactActions";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { useEffect, useRef } from "react";

interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

interface ParticleCardProps {
  cardId?: string;
  name?: string;
  title?: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  location?: string;
  headshotUrl?: string;
  socialLinks?: SocialLink[];
  slug?: string;
}

export const ParticleCard = ({
  cardId,
  name = "Jane Smith",
  title = "Data Scientist",
  company = "Analytics Corp",
  phone = "+1 (555) 987-6543",
  email = "jane@analytics.com",
  website = "www.janesmith.com",
  location = "New York, NY",
  headshotUrl,
  socialLinks = [],
  slug
}: ParticleCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.offsetWidth;
        if (particle.x > canvas.offsetWidth) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.offsetHeight;
        if (particle.y > canvas.offsetHeight) particle.y = 0;

        // Draw particle
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections to nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.globalAlpha = (80 - distance) / 80 * 0.2;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Card className="relative bg-gradient-to-br from-slate-900 via-blue-900/50 to-purple-900/50 border border-blue-500/20 rounded-3xl p-8 text-white overflow-hidden backdrop-blur-sm">
        {/* Animated particle background */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Animated geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-400/30 rotate-45 animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-purple-400/30 rotate-12 animate-[spin_15s_linear_infinite_reverse]"></div>
          <div className="absolute top-1/2 left-5 w-8 h-8 bg-cyan-400/20 rounded-full animate-bounce"></div>
        </div>

        <div className="relative z-10 space-y-6">
          {/* Profile section */}
          <div className="text-center space-y-4">
            <div className="relative mx-auto w-24 h-24 md:w-24 md:h-24 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse p-0.5">
                <div className="w-full h-full rounded-full bg-slate-900/60 flex items-center justify-center overflow-hidden">
                  {headshotUrl ? (
                    <img
                      src={headshotUrl}
                      alt={name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-xl font-bold text-white/90">
                      {name?.trim()?.split(' ').slice(0,2).map(n => n.charAt(0)).join('') || 'NA'}
                    </span>
                  )}
                </div>
              </div>
              {/* Orbiting particles around profile */}
              <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1"></div>
              </div>
              <div className="absolute inset-0 animate-[spin_6s_linear_infinite_reverse]">
                <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-purple-400 rounded-full translate-x-1 -translate-y-1/2"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-[fade-in_1s_ease-out]">
                {name}
              </h2>
              <p className="text-blue-300 font-medium animate-[scale-in_1.5s_ease-out]">{title}</p>
              <p className="text-purple-300 animate-[scale-in_2s_ease-out]">{company}</p>
            </div>
          </div>

          {/* Contact info with particle effects */}
          <div className="space-y-3">
            {phone && (
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-all duration-500 animate-[slide-in-right_2.5s_ease-out] relative">
                <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30 group-hover:bg-blue-500/40 group-hover:border-blue-400/60 transition-all duration-300 relative">
                  <Phone size={16} className="text-blue-300" />
                  <div className="absolute inset-0 bg-blue-400/20 rounded-lg opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                </div>
                <span className="text-white/90">{phone}</span>
              </div>
            )}
            
            {email && (
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-all duration-500 animate-[slide-in-right_3s_ease-out] relative">
                <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30 group-hover:bg-purple-500/40 group-hover:border-purple-400/60 transition-all duration-300 relative">
                  <Mail size={16} className="text-purple-300" />
                  <div className="absolute inset-0 bg-purple-400/20 rounded-lg opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                </div>
                <span className="text-white/90">{email}</span>
              </div>
            )}
            
            {website && (
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-all duration-500 animate-[slide-in-right_3.5s_ease-out] relative">
                <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/30 group-hover:bg-cyan-500/40 group-hover:border-cyan-400/60 transition-all duration-300 relative">
                  <Globe size={16} className="text-cyan-300" />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-lg opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                </div>
                <span className="text-white/90">{website}</span>
              </div>
            )}
            
            {cardId && location && (
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-all duration-500 animate-[slide-in-right_4s_ease-out] relative">
                <div className="p-2 rounded-lg bg-green-500/20 border border-green-400/30 group-hover:bg-green-500/40 group-hover:border-green-400/60 transition-all duration-300 relative">
                  <MapPin size={16} className="text-green-300" />
                  <div className="absolute inset-0 bg-green-400/20 rounded-lg opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                </div>
                <span className="text-white/90">{location}</span>
              </div>
            )}
          </div>

          {/* Social links with particle trails */}
          {socialLinks.length > 0 && (
            <div className="space-y-3 animate-[fade-in_4.5s_ease-out]">
              <h3 className="text-lg font-semibold text-white/90">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className="relative transform hover:scale-110 transition-all duration-300 hover:-translate-y-1 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <a
                      href={buildSocialUrl(link.platform, link.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 hover:from-blue-500/40 hover:to-purple-500/40 hover:border-blue-400/60 relative z-10 flex items-center justify-center"
                    >
                      <SocialIcon 
                        platform={link.platform} 
                        className="w-5 h-5 text-white" 
                      />
                    </a>
                    {/* Particle effect on hover */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/40 to-purple-400/40 opacity-0 group-hover:opacity-100 animate-ping"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions with animated border */}
          {cardId && (
            <div className="pt-4 space-y-4 animate-[fade-in_5s_ease-out]">
              <ContactActions
                cardId={cardId}
                name={name}
                phone={phone}
                email={email}
                website={website}
                company={company}
                title={title}
                socialLinks={socialLinks}
                headshotUrl={headshotUrl}
                style="minimal"
                bookingEnabled={true}
                bookingInstructions="Book a consultation to explore data-driven solutions and analytics opportunities."
              />
              
              {slug && (
                <div className="flex justify-center">
                  <div className="relative p-3 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-blue-400/30">
                    <QRCodeGenerator url={`${window.location.origin}/card/${slug}`} size={120} showControls={false} />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
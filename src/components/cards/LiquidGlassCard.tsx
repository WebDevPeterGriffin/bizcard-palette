import { Mail, Phone, Globe, Sparkles, Droplet } from "lucide-react";
import { Card } from "@/components/ui/card";
import SocialIcon, { buildSocialUrl } from "@/components/SocialIcon";
import { ContactActions } from "@/components/ContactActions";
import { BaseCardProps } from "./shared";
import QRCodeGenerator from "@/components/QRCodeGenerator";

const LiquidGlassCard = ({
  cardId,
  slug,
  name = "Alex Glass",
  title = "Design Architect",
  company = "Crystal Studios",
  phone = "+1 (555) 789-0123",
  email = "alex@crystalstudios.co",
  website = "www.alexglass.design",
  socialLinks = [],
  headshotUrl,
  bookingEnabled = false,
  bookingInstructions = "Book a design consultation with me",
}: BaseCardProps) => {
  const cardUrl = slug ? `${window.location.origin}/card/${slug}` : "";
  return (
    <div className="relative w-80 h-auto min-h-[28rem] mx-auto perspective-1000">
      {/* Subtle floating glass orbs background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute top-1/4 left-1/5 w-16 h-16 bg-white/5 rounded-full blur-sm animate-float-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/3 rounded-full blur-sm animate-float-slower"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-white/4 rounded-full blur-md animate-float-slowest"></div>
      </div>

      {/* Main glass card */}
      <Card className="relative z-10 w-full h-auto min-h-[28rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden rounded-2xl hover:shadow-3xl transition-all duration-500 animate-glass-entrance">
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 animate-glass-shimmer pointer-events-none"></div>
        
        {/* Subtle highlight strip */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-liquid-ripple"></div>
        
        <div className="relative z-10 p-8 flex flex-col text-white">
          {/* Profile section with glass morphing */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="relative mb-6">
              {headshotUrl ? (
                <div className="w-32 h-32 md:w-36 md:h-36 mx-auto rounded-full border border-white/30 overflow-hidden shadow-xl backdrop-blur-sm bg-white/10 animate-glass-morph">
                  <img 
                    src={headshotUrl} 
                    alt={name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-glass-overlay"></div>
                </div>
              ) : (
                <div className="w-32 h-32 md:w-36 md:h-36 mx-auto rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl animate-glass-morph">
                  <span className="text-3xl font-light text-white/90">{name.charAt(0)}</span>
                </div>
              )}
              
              {/* Glass reflection highlights */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white/20 rounded-full blur-sm animate-glass-highlight"></div>
              <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-white/60 animate-sparkle" />
            </div>
            
            <h2 className="text-2xl font-light text-white mb-2 animate-text-float" style={{animationDelay: '0.2s'}}>
              {name}
            </h2>
            <p className="text-white/80 text-base font-light mb-1 animate-text-float" style={{animationDelay: '0.4s'}}>
              {title}
            </p>
            <p className="text-white/60 text-sm font-light animate-text-float" style={{animationDelay: '0.6s'}}>
              {company}
            </p>
          </div>

          {/* Glass contact info panels */}
          <div className="space-y-4 mb-8 flex-1">
            {phone && (
              <div className="flex items-center space-x-4 p-3 rounded-xl bg-white/8 backdrop-blur-sm border border-white/15 hover:bg-white/12 transition-all duration-300 animate-glass-slide-in" style={{animationDelay: '0.8s'}}>
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Phone className="h-4 w-4 text-white/80" />
                </div>
                <a 
                  href={`tel:${phone}`} 
                  className="text-sm text-white/90 hover:text-white transition-colors duration-200 flex-1"
                >
                  {phone}
                </a>
              </div>
            )}
            
            {email && (
              <div className="flex items-center space-x-4 p-3 rounded-xl bg-white/8 backdrop-blur-sm border border-white/15 hover:bg-white/12 transition-all duration-300 animate-glass-slide-in" style={{animationDelay: '1s'}}>
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Mail className="h-4 w-4 text-white/80" />
                </div>
                <a 
                  href={`mailto:${email}`} 
                  className="text-sm text-white/90 hover:text-white transition-colors duration-200 flex-1 truncate"
                >
                  {email}
                </a>
              </div>
            )}
            
            {website && (
              <div className="flex items-center space-x-4 p-3 rounded-xl bg-white/8 backdrop-blur-sm border border-white/15 hover:bg-white/12 transition-all duration-300 animate-glass-slide-in" style={{animationDelay: '1.2s'}}>
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Globe className="h-4 w-4 text-white/80" />
                </div>
                <a 
                  href={`https://${website}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-white/90 hover:text-white transition-colors duration-200 flex-1 truncate"
                >
                  {website}
                </a>
              </div>
            )}
          </div>

          {/* Glass social bubbles */}
          {socialLinks.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-6 animate-glass-bubble-up" style={{animationDelay: '1.4s'}}>
              {socialLinks.map((social, index) => (
                <a
                  key={social.platform}
                  href={buildSocialUrl(social.platform, social.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/15 hover:border-white/30 hover:text-white transition-all duration-300 hover:scale-105 animate-glass-social"
                  style={{animationDelay: `${1.6 + index * 0.1}s`}}
                >
                  <SocialIcon platform={social.platform} className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}

          {/* QR Code Section */}
          {slug && cardUrl && (
            <div className="flex justify-center mb-6 animate-glass-bubble-up" style={{animationDelay: '1.8s'}}>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <QRCodeGenerator 
                  url={cardUrl} 
                  size={120}
                  className="bg-white p-2 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Contact Actions */}
          {cardId && (
            <div className="border-t border-white/20 pt-6">
              <ContactActions
                cardId={cardId}
                name={name}
                title={title}
                company={company}
                phone={phone}
                email={email}
                website={website}
                socialLinks={socialLinks}
                headshotUrl={headshotUrl}
                bookingEnabled={bookingEnabled}
                bookingInstructions={bookingInstructions}
                style="liquid"
              />
            </div>
          )}
        </div>
      </Card>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(-8px); }
        }
        
        @keyframes float-slowest {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(5px); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes glass-entrance {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes glass-shimmer {
          0%, 100% { opacity: 0.1; transform: translateX(-100%); }
          50% { opacity: 0.3; transform: translateX(100%); }
        }
        
        @keyframes liquid-ripple {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes glass-morph {
          0%, 100% { border-radius: 50%; transform: scale(1); }
          25% { border-radius: 60% 40% 50% 50%; transform: scale(1.02); }
          50% { border-radius: 40% 60% 50% 50%; transform: scale(0.98); }
          75% { border-radius: 50% 50% 60% 40%; transform: scale(1.01); }
        }
        
        @keyframes glass-overlay {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes glass-highlight {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.6; transform: translateX(-50%) scale(1.1); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0.4; transform: rotate(0deg) scale(1); }
          50% { opacity: 1; transform: rotate(180deg) scale(1.2); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes text-float {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes glass-slide-in {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes glass-bubble-up {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes glass-social {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 10s ease-in-out infinite 2s; }
        .animate-float-slowest { animation: float-slowest 12s ease-in-out infinite 4s; }
        .animate-gradient-shift { animation: gradient-shift 6s ease-in-out infinite; }
        .animate-glass-entrance { animation: glass-entrance 1s ease-out; }
        .animate-glass-shimmer { animation: glass-shimmer 4s ease-in-out infinite; }
        .animate-liquid-ripple { animation: liquid-ripple 3s ease-in-out infinite; }
        .animate-glass-morph { animation: glass-morph 6s ease-in-out infinite; }
        .animate-glass-overlay { animation: glass-overlay 3s ease-in-out infinite; }
        .animate-glass-highlight { animation: glass-highlight 2s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 4s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
        .animate-text-float { animation: text-float 0.8s ease-out; }
        .animate-glass-slide-in { animation: glass-slide-in 0.8s ease-out; }
        .animate-glass-bubble-up { animation: glass-bubble-up 1s ease-out; }
        .animate-glass-social { animation: glass-social 0.6s ease-out; }
        
        .perspective-1000 { perspective: 1000px; }
        .shadow-3xl { box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25); }
        `
      }} />
    </div>
  );
};

export default LiquidGlassCard;
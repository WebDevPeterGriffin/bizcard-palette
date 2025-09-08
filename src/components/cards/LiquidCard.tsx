import { Mail, Phone, Globe, Waves, Droplets, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import SocialIcon, { buildSocialUrl } from "@/components/SocialIcon";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface LiquidCardProps {
  name?: string;
  title?: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  socialLinks?: SocialLink[];
  headshotUrl?: string;
  linkedin?: string;
  twitter?: string;
}

const LiquidCard = ({
  name = "Flow Rivera",
  title = "UX Fluid Designer",
  company = "Liquid Labs",
  phone = "+1 (555) 345-6789",
  email = "flow@liquidlabs.design",
  website = "www.flowrivera.studio",
  socialLinks = [],
  headshotUrl,
  linkedin = "",
  twitter = ""
}: LiquidCardProps) => {
  
  // Social helpers moved to a shared component for consistency

  const legacySocials = [];
  if (linkedin) legacySocials.push({ platform: 'linkedin', url: linkedin });
  if (twitter) legacySocials.push({ platform: 'twitter', url: twitter });
  
  const displaySocialLinks = socialLinks.length > 0 ? socialLinks : legacySocials;

  return (
    <div className="relative w-80 h-auto min-h-[26rem]">
      {/* Animated liquid background */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        {/* Flowing background waves */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-teal-400 to-cyan-400 animate-liquid-flow"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-300/30 to-teal-300/50 animate-liquid-flow-reverse"></div>
        
        {/* Floating bubbles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/30 rounded-full animate-bubble-float"></div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-white/20 rounded-full animate-bubble-float-delayed"></div>
        <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-white/40 rounded-full animate-bubble-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-white/50 rounded-full animate-bubble-float"></div>
        
        {/* Liquid drops */}
        <Droplets className="absolute top-8 right-8 h-6 w-6 text-white/40 animate-drip" />
        <Circle className="absolute bottom-8 left-8 h-4 w-4 text-white/30 animate-pulse" />
        <Waves className="absolute top-1/2 right-4 h-5 w-5 text-white/40 animate-wave" />
      </div>

      {/* Main content card with liquid morphing effect */}
      <Card className="relative z-10 w-full h-auto min-h-[26rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden animate-morph">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent animate-shimmer"></div>
        
        <div className="relative z-10 p-6 pb-6 flex flex-col text-white">
          {/* Morphing header */}
          <div className="text-center mb-6 animate-wave-in">
            <div className="relative mb-4">
              {headshotUrl ? (
                <div className="w-20 h-20 mx-auto rounded-full border-2 border-white/50 overflow-hidden shadow-xl animate-liquid-morph relative">
                  <img 
                    src={headshotUrl} 
                    alt={name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 animate-liquid-overlay"></div>
                </div>
              ) : (
                <div className="w-20 h-20 mx-auto rounded-full border-2 border-white/50 bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center shadow-xl animate-liquid-morph backdrop-blur-sm">
                  <span className="text-2xl font-bold text-white">{name.charAt(0)}</span>
                </div>
              )}
              {/* Liquid ripple effect */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ripple"></div>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-1 animate-text-wave" style={{animationDelay: '0.2s'}}>
              {name}
            </h2>
            <p className="text-white/90 text-sm font-medium mb-1 animate-text-wave" style={{animationDelay: '0.4s'}}>
              {title}
            </p>
            <p className="text-white/80 text-xs animate-text-wave" style={{animationDelay: '0.6s'}}>
              {company}
            </p>
          </div>

          {/* Flowing contact info */}
          <div className="space-y-4 mb-6 flex-1">
            <div className="flex items-center space-x-3 animate-flow-in hover:scale-105 transition-all duration-500" style={{animationDelay: '0.8s'}}>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 animate-liquid-pulse">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <a 
                href={`tel:${phone}`} 
                className="text-sm text-white/90 hover:text-white transition-colors duration-200 truncate"
              >
                {phone}
              </a>
            </div>
            
            <div className="flex items-center space-x-3 animate-flow-in hover:scale-105 transition-all duration-500" style={{animationDelay: '1s'}}>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 animate-liquid-pulse">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <a 
                href={`mailto:${email}`} 
                className="text-sm text-white/90 hover:text-white transition-colors duration-200 truncate"
              >
                {email}
              </a>
            </div>
            
            <div className="flex items-center space-x-3 animate-flow-in hover:scale-105 transition-all duration-500" style={{animationDelay: '1.2s'}}>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 animate-liquid-pulse">
                <Globe className="h-4 w-4 text-white" />
              </div>
              <a 
                href={`https://${website}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-white/90 hover:text-white transition-colors duration-200 truncate"
              >
                {website}
              </a>
            </div>
          </div>

          {/* Liquid social bubbles */}
          {displaySocialLinks.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 px-4 py-2 animate-bubble-up" style={{animationDelay: '1.4s'}}>
              {displaySocialLinks.map((social, index) => (
                <a
                  key={social.platform}
                  href={buildSocialUrl(social.platform, social.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/25 hover:border-white/50 transition-all duration-300 hover:scale-105 animate-liquid-bubble"
                  style={{animationDelay: `${1.6 + index * 0.2}s`}}
                >
                  <SocialIcon platform={social.platform} className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </Card>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes liquid-flow {
          0%, 100% { transform: translateX(0%) translateY(0%) rotate(0deg); }
          25% { transform: translateX(5%) translateY(-2%) rotate(1deg); }
          50% { transform: translateX(-3%) translateY(3%) rotate(-1deg); }
          75% { transform: translateX(2%) translateY(-1%) rotate(0.5deg); }
        }
        
        @keyframes liquid-flow-reverse {
          0%, 100% { transform: translateX(0%) translateY(0%) rotate(0deg); }
          25% { transform: translateX(-3%) translateY(2%) rotate(-1deg); }
          50% { transform: translateX(4%) translateY(-3%) rotate(1deg); }
          75% { transform: translateX(-2%) translateY(1%) rotate(-0.5deg); }
        }
        
        @keyframes bubble-float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
        }
        
        @keyframes bubble-float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 0.9; }
        }
        
        @keyframes bubble-float-slow {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.8; }
          50% { transform: translateY(-15px) scale(1.05); opacity: 1; }
        }
        
        @keyframes morph {
          0%, 100% { border-radius: 12px; }
          25% { border-radius: 20px 12px 16px 8px; }
          50% { border-radius: 8px 20px 12px 16px; }
          75% { border-radius: 16px 8px 20px 12px; }
        }
        
        @keyframes liquid-morph {
          0%, 100% { border-radius: 50%; transform: scale(1); }
          25% { border-radius: 60% 40% 50% 50%; transform: scale(1.02); }
          50% { border-radius: 40% 60% 50% 50%; transform: scale(0.98); }
          75% { border-radius: 50% 50% 60% 40%; transform: scale(1.01); }
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes wave-in {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes text-wave {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes flow-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes bubble-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes liquid-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes liquid-bubble {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }
        
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes drip {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        
        @keyframes liquid-overlay {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-liquid-flow { animation: liquid-flow 8s ease-in-out infinite; }
        .animate-liquid-flow-reverse { animation: liquid-flow-reverse 10s ease-in-out infinite; }
        .animate-bubble-float { animation: bubble-float 4s ease-in-out infinite; }
        .animate-bubble-float-delayed { animation: bubble-float-delayed 5s ease-in-out infinite 1s; }
        .animate-bubble-float-slow { animation: bubble-float-slow 6s ease-in-out infinite; }
        .animate-morph { animation: morph 6s ease-in-out infinite; }
        .animate-liquid-morph { animation: liquid-morph 4s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
        .animate-wave-in { animation: wave-in 0.8s ease-out; }
        .animate-text-wave { animation: text-wave 0.6s ease-out; }
        .animate-flow-in { animation: flow-in 0.6s ease-out; }
        .animate-bubble-up { animation: bubble-up 0.8s ease-out; }
        .animate-liquid-pulse { animation: liquid-pulse 2s ease-in-out infinite; }
        .animate-liquid-bubble { animation: liquid-bubble 3s ease-in-out infinite; }
        .animate-ripple { animation: ripple 2s linear infinite; }
        .animate-drip { animation: drip 3s ease-in-out infinite; }
        .animate-wave { animation: wave 4s ease-in-out infinite; }
        .animate-liquid-overlay { animation: liquid-overlay 2s ease-in-out infinite; }
        `
      }} />
    </div>
  );
};

export default LiquidCard;
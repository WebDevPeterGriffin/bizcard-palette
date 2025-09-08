import { Mail, Phone, Globe, Star, Sparkles, Zap, Moon } from "lucide-react";
import { Card } from "@/components/ui/card";
import SocialIcon, { buildSocialUrl } from "@/components/SocialIcon";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface CosmicCardProps {
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

const CosmicCard = ({
  name = "Nova Stellar",
  title = "Cosmic Designer",
  company = "Galaxy Studios",
  phone = "+1 (555) 456-7890",
  email = "nova@galaxystudios.space",
  website = "www.novastellar.universe",
  socialLinks = [],
  headshotUrl,
  linkedin = "",
  twitter = ""
}: CosmicCardProps) => {
  
  // Social helpers moved to a shared component for consistency

  const legacySocials = [];
  if (linkedin) legacySocials.push({ platform: 'linkedin', url: linkedin });
  if (twitter) legacySocials.push({ platform: 'twitter', url: twitter });
  
  const displaySocialLinks = socialLinks.length > 0 ? socialLinks : legacySocials;

  return (
    <div className="relative w-80 h-auto min-h-[26rem] overflow-hidden">
      {/* Cosmic background with moving stars */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden">
        {/* Animated starfield */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(2px 2px at 20px 30px, white, transparent),
            radial-gradient(2px 2px at 40px 70px, white, transparent),
            radial-gradient(1px 1px at 90px 40px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, white, transparent),
            radial-gradient(2px 2px at 160px 30px, white, transparent)
          `,
          backgroundSize: '200px 100px',
          animation: 'star-move 20s linear infinite'
        }}></div>
        
        {/* Additional star layers */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(1px 1px at 10px 10px, #60a5fa, transparent),
            radial-gradient(1px 1px at 60px 60px, #a78bfa, transparent),
            radial-gradient(1px 1px at 110px 20px, #f472b6, transparent),
            radial-gradient(1px 1px at 170px 90px, #fbbf24, transparent)
          `,
          backgroundSize: '180px 90px',
          animation: 'star-move-slow 30s linear infinite'
        }}></div>
        
        {/* Nebula effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 animate-nebula"></div>
        
        {/* Floating cosmic elements */}
        <Star className="absolute top-8 right-8 h-4 w-4 text-yellow-400 animate-twinkle" />
        <Star className="absolute top-16 left-12 h-3 w-3 text-blue-400 animate-twinkle-delayed" />
        <Sparkles className="absolute bottom-20 right-12 h-5 w-5 text-purple-400 animate-cosmic-spin" />
        <Moon className="absolute top-1/4 left-8 h-6 w-6 text-gray-300 animate-orbit" />
        <Zap className="absolute bottom-8 left-8 h-4 w-4 text-cyan-400 animate-pulse" />
        
        {/* Particle effects */}
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full animate-particle-float"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-400 rounded-full animate-particle-drift"></div>
        <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-60 animate-particle-glow"></div>
      </div>

      {/* Main cosmic card */}
      <Card className="relative z-10 w-full h-auto min-h-[26rem] bg-black/30 backdrop-blur-md border border-purple-500/50 shadow-2xl overflow-hidden animate-cosmic-float">
        {/* Cosmic energy border */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 animate-energy-flow"></div>
        <div className="absolute inset-0 border border-cyan-400/30 animate-pulse"></div>
        
        <div className="relative z-10 p-6 pb-6 flex flex-col text-white">
          {/* Cosmic header with orbital elements */}
          <div className="text-center mb-6 animate-cosmic-emerge">
            <div className="relative mb-4">
              {headshotUrl ? (
                <div className="w-20 h-20 mx-auto rounded-full border-2 border-purple-400 overflow-hidden shadow-xl animate-cosmic-rotate relative">
                  <img 
                    src={headshotUrl} 
                    alt={name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 animate-cosmic-glow"></div>
                </div>
              ) : (
                <div className="w-20 h-20 mx-auto rounded-full border-2 border-purple-400 bg-gradient-to-br from-purple-800/50 to-blue-800/50 flex items-center justify-center shadow-xl animate-cosmic-rotate backdrop-blur-sm">
                  <span className="text-2xl font-bold text-white">{name.charAt(0)}</span>
                </div>
              )}
              
              {/* Orbiting elements */}
              <div className="absolute inset-0 animate-orbit-fast">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2"></div>
              </div>
              <div className="absolute inset-0 animate-orbit-reverse">
                <div className="absolute bottom-0 right-0 w-1 h-1 bg-pink-400 rounded-full"></div>
              </div>
              
              {/* Cosmic aura */}
              <div className="absolute inset-0 rounded-full border border-purple-400/30 animate-cosmic-pulse scale-125"></div>
            </div>
            
            <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-1 animate-text-shimmer">
              {name}
            </h2>
            <p className="text-purple-300 text-sm font-medium mb-1 animate-cosmic-fade-in" style={{animationDelay: '0.2s'}}>
              {title}
            </p>
            <p className="text-blue-300 text-xs animate-cosmic-fade-in" style={{animationDelay: '0.4s'}}>
              {company}
            </p>
          </div>

          {/* Cosmic contact info */}
          <div className="space-y-4 mb-6 flex-1">
            <div className="flex items-center space-x-3 animate-cosmic-slide-in hover:scale-105 transition-all duration-500" style={{animationDelay: '0.6s'}}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-sm border border-purple-400/50 flex items-center justify-center hover:border-cyan-400/70 transition-all duration-300 animate-energy-pulse">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <a 
                href={`tel:${phone}`} 
                className="text-sm text-gray-200 hover:text-cyan-300 transition-colors duration-200 truncate"
              >
                {phone}
              </a>
            </div>
            
            <div className="flex items-center space-x-3 animate-cosmic-slide-in hover:scale-105 transition-all duration-500" style={{animationDelay: '0.8s'}}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 backdrop-blur-sm border border-blue-400/50 flex items-center justify-center hover:border-purple-400/70 transition-all duration-300 animate-energy-pulse">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <a 
                href={`mailto:${email}`} 
                className="text-sm text-gray-200 hover:text-purple-300 transition-colors duration-200 truncate"
              >
                {email}
              </a>
            </div>
            
            <div className="flex items-center space-x-3 animate-cosmic-slide-in hover:scale-105 transition-all duration-500" style={{animationDelay: '1s'}}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 backdrop-blur-sm border border-pink-400/50 flex items-center justify-center hover:border-yellow-400/70 transition-all duration-300 animate-energy-pulse">
                <Globe className="h-4 w-4 text-white" />
              </div>
              <a 
                href={`https://${website}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-gray-200 hover:text-pink-300 transition-colors duration-200 truncate"
              >
                {website}
              </a>
            </div>
          </div>

          {/* Cosmic social constellation */}
          {displaySocialLinks.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 px-4 py-2 animate-cosmic-constellation" style={{animationDelay: '1.2s'}}>
              {displaySocialLinks.map((social, index) => (
                <a
                  key={social.platform}
                  href={buildSocialUrl(social.platform, social.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-purple-400/40 flex items-center justify-center text-white hover:border-cyan-400/70 hover:bg-purple-500/20 transition-all duration-300 hover:scale-105 animate-cosmic-orbit relative"
                  style={{animationDelay: `${1.4 + index * 0.2}s`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-cyan-400/10 animate-energy-flow"></div>
                  <span className="relative z-10"><SocialIcon platform={social.platform} className="h-3.5 w-3.5" /></span>
                </a>
              ))}
            </div>
          )}
        </div>
      </Card>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes star-move {
          0% { transform: translateX(0px) translateY(0px); }
          100% { transform: translateX(-200px) translateY(-100px); }
        }
        
        @keyframes star-move-slow {
          0% { transform: translateX(0px) translateY(0px); }
          100% { transform: translateX(-180px) translateY(-90px); }
        }
        
        @keyframes nebula {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
        
        @keyframes twinkle-delayed {
          0%, 100% { opacity: 0.7; transform: scale(1.2); }
          50% { opacity: 1; transform: scale(0.9); }
        }
        
        @keyframes cosmic-spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
        }
        
        @keyframes orbit-fast {
          0% { transform: rotate(0deg) translateX(25px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(25px) rotate(-360deg); }
        }
        
        @keyframes orbit-reverse {
          0% { transform: rotate(360deg) translateX(20px) rotate(360deg); }
          100% { transform: rotate(0deg) translateX(20px) rotate(0deg); }
        }
        
        @keyframes particle-float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.8; }
          25% { transform: translateY(-10px) translateX(5px); opacity: 1; }
          50% { transform: translateY(-5px) translateX(-3px); opacity: 0.6; }
          75% { transform: translateY(-15px) translateX(8px); opacity: 0.9; }
        }
        
        @keyframes particle-drift {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          33% { transform: translateX(10px) translateY(-5px); }
          66% { transform: translateX(-8px) translateY(7px); }
        }
        
        @keyframes particle-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
        
        @keyframes cosmic-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes energy-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes cosmic-emerge {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        @keyframes cosmic-rotate {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(5deg) scale(1.05); }
        }
        
        @keyframes cosmic-glow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        
        @keyframes cosmic-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
        
        @keyframes text-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes cosmic-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes cosmic-slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes cosmic-constellation {
          from { opacity: 0; transform: translateY(30px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes cosmic-orbit {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }
        
        @keyframes energy-pulse {
          0%, 100% { box-shadow: 0 0 5px rgba(168, 85, 247, 0.3); }
          50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.6), 0 0 30px rgba(59, 130, 246, 0.4); }
        }
        
        .animate-nebula { animation: nebula 8s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-twinkle-delayed { animation: twinkle-delayed 3s ease-in-out infinite 1s; }
        .animate-cosmic-spin { animation: cosmic-spin 4s linear infinite; }
        .animate-orbit { animation: orbit 10s linear infinite; }
        .animate-orbit-fast { animation: orbit-fast 6s linear infinite; }
        .animate-orbit-reverse { animation: orbit-reverse 8s linear infinite; }
        .animate-particle-float { animation: particle-float 6s ease-in-out infinite; }
        .animate-particle-drift { animation: particle-drift 8s ease-in-out infinite; }
        .animate-particle-glow { animation: particle-glow 3s ease-in-out infinite; }
        .animate-cosmic-float { animation: cosmic-float 4s ease-in-out infinite; }
        .animate-energy-flow { animation: energy-flow 3s ease infinite; }
        .animate-cosmic-emerge { animation: cosmic-emerge 1s ease-out; }
        .animate-cosmic-rotate { animation: cosmic-rotate 4s ease-in-out infinite; }
        .animate-cosmic-glow { animation: cosmic-glow 2s ease-in-out infinite; }
        .animate-cosmic-pulse { animation: cosmic-pulse 3s ease-in-out infinite; }
        .animate-text-shimmer { animation: text-shimmer 3s ease-in-out infinite; background-size: 200% 200%; }
        .animate-cosmic-fade-in { animation: cosmic-fade-in 0.8s ease-out; }
        .animate-cosmic-slide-in { animation: cosmic-slide-in 0.8s ease-out; }
        .animate-cosmic-constellation { animation: cosmic-constellation 1s ease-out; }
        .animate-cosmic-orbit { animation: cosmic-orbit 4s ease-in-out infinite; }
        .animate-energy-pulse { animation: energy-pulse 2s ease-in-out infinite; }
        `
      }} />
    </div>
  );
};

export default CosmicCard;
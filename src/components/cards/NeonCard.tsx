import { Mail, Phone, Globe, Zap, Star, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface NeonCardProps {
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

const NeonCard = ({
  name = "Alex Cyber",
  title = "Digital Architect",
  company = "Neo Corp",
  phone = "+1 (555) 123-4567",
  email = "alex@neocorp.io",
  website = "www.alexcyber.dev",
  socialLinks = [],
  headshotUrl,
  linkedin = "",
  twitter = ""
}: NeonCardProps) => {
  
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return <span className="text-sm font-bold">in</span>;
      case 'twitter': return <span className="text-sm font-bold">𝕏</span>;
      case 'github': return <span className="text-sm font-bold">⧉</span>;
      case 'instagram': return <span className="text-sm font-bold">📷</span>;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const getSocialUrl = (platform: string, url: string) => {
    if (url.startsWith('http')) return url;
    
    const baseUrls: { [key: string]: string } = {
      linkedin: 'https://linkedin.com/in/',
      twitter: 'https://twitter.com/',
      github: 'https://github.com/',
      instagram: 'https://instagram.com/'
    };
    
    return `${baseUrls[platform.toLowerCase()] || 'https://'}${url}`;
  };

  const legacySocials = [];
  if (linkedin) legacySocials.push({ platform: 'linkedin', url: linkedin });
  if (twitter) legacySocials.push({ platform: 'twitter', url: twitter });
  
  const displaySocialLinks = socialLinks.length > 0 ? socialLinks : legacySocials;

  return (
    <Card className="w-80 h-96 bg-black border-2 border-cyan-500 overflow-visible relative group">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(cyan 1px, transparent 1px),
            linear-gradient(90deg, cyan 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          animation: 'grid-move 3s linear infinite'
        }}></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/2 left-2 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>

      <div className="relative z-10 p-6 pb-4 h-full flex flex-col">
        {/* Header with electric effect */}
        <div className="text-center mb-6">
          <div className="relative mb-4">
            {headshotUrl ? (
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-cyan-400 overflow-hidden relative group-hover:border-pink-400 transition-all duration-300">
                <img 
                  src={headshotUrl} 
                  alt={name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-pink-400/20 animate-pulse"></div>
              </div>
            ) : (
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-cyan-400 bg-gradient-to-br from-cyan-900 to-purple-900 flex items-center justify-center group-hover:border-pink-400 transition-all duration-300 relative overflow-hidden">
                <span className="text-2xl font-bold text-cyan-300 z-10">{name.charAt(0)}</span>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-pink-400/20 animate-pulse"></div>
              </div>
            )}
            <Zap className="absolute -top-1 -right-1 h-6 w-6 text-yellow-400 animate-bounce" />
          </div>
          
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse mb-1">
            {name}
          </h2>
          <p className="text-cyan-300 text-sm font-medium mb-1 animate-pulse" style={{animationDelay: '0.2s'}}>
            {title}
          </p>
          <p className="text-purple-300 text-xs animate-pulse" style={{animationDelay: '0.4s'}}>
            {company}
          </p>
        </div>

        {/* Contact Info with glowing effects */}
        <div className="space-y-3 mb-6 flex-1">
          <div className="flex items-center space-x-3 group/item hover:scale-105 transition-transform duration-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center group-hover/item:shadow-lg group-hover/item:shadow-cyan-500/50 transition-all duration-300">
              <Phone className="h-4 w-4 text-white" />
            </div>
            <a 
              href={`tel:${phone}`} 
              className="text-sm text-gray-300 hover:text-cyan-300 transition-colors duration-200 truncate"
            >
              {phone}
            </a>
          </div>
          
          <div className="flex items-center space-x-3 group/item hover:scale-105 transition-transform duration-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover/item:shadow-lg group-hover/item:shadow-purple-500/50 transition-all duration-300">
              <Mail className="h-4 w-4 text-white" />
            </div>
            <a 
              href={`mailto:${email}`} 
              className="text-sm text-gray-300 hover:text-purple-300 transition-colors duration-200 truncate"
            >
              {email}
            </a>
          </div>
          
          <div className="flex items-center space-x-3 group/item hover:scale-105 transition-transform duration-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center group-hover/item:shadow-lg group-hover/item:shadow-pink-500/50 transition-all duration-300">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <a 
              href={`https://${website}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-gray-300 hover:text-pink-300 transition-colors duration-200 truncate"
            >
              {website}
            </a>
          </div>
        </div>

        {/* Social Links with electric animations */}
        {displaySocialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 px-2 pb-4">
            {displaySocialLinks.map((social, index) => (
              <a
                key={social.platform}
                href={getSocialUrl(social.platform, social.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black border border-cyan-500 flex items-center justify-center text-cyan-400 hover:border-pink-500 hover:text-pink-400 transition-all duration-300 hover:scale-105 hover:rotate-3 hover:shadow-lg hover:shadow-cyan-500/50 relative overflow-hidden group/social"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">{getSocialIcon(social.platform)}</span>
                <Star className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 opacity-0 group-hover/social:opacity-100 group-hover/social:animate-spin transition-all duration-300" />
              </a>
            ))}
          </div>
        )}

        {/* Floating particles */}
        <Sparkles className="absolute top-8 right-8 h-4 w-4 text-cyan-400 animate-pulse opacity-60" />
        <Sparkles className="absolute bottom-12 left-8 h-3 w-3 text-pink-400 animate-pulse opacity-60" style={{animationDelay: '1s'}} />
        <Star className="absolute top-1/2 right-6 h-3 w-3 text-purple-400 animate-ping opacity-40" style={{animationDelay: '2s'}} />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20px, 20px); }
        }
        `
      }} />
    </Card>
  );
};

export default NeonCard;
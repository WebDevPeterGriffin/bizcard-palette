import { Mail, Phone, Globe, Cloud, Wind, Feather } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface FloatingCardProps {
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

const FloatingCard = ({
  name = "Luna Sky",
  title = "Cloud Architect",
  company = "Elevate Studios",
  phone = "+1 (555) 234-5678",
  email = "luna@elevate.cloud",
  website = "www.lunasky.design",
  socialLinks = [],
  headshotUrl,
  linkedin = "",
  twitter = ""
}: FloatingCardProps) => {
  
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
    <div className="relative w-80 h-96">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <Cloud className="absolute top-8 left-4 h-12 w-12 text-blue-200 opacity-60 animate-float" />
        <Cloud className="absolute top-16 right-8 h-8 w-8 text-blue-300 opacity-40 animate-float-delayed" />
        <Wind className="absolute bottom-20 left-8 h-6 w-6 text-blue-200 opacity-50 animate-sway" />
        <Feather className="absolute top-1/2 right-4 h-5 w-5 text-blue-300 opacity-60 animate-float-slow" />
        <div className="absolute top-12 right-12 w-3 h-3 bg-blue-300 rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute bottom-24 left-12 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
      </div>

      {/* Main card with floating effect */}
      <Card className="relative z-10 w-full h-full bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 border-2 border-blue-200 shadow-xl animate-hover-float overflow-visible">
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-indigo-100/30 animate-gradient-shift"></div>
        
        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Floating header */}
          <div className="text-center mb-6 animate-fade-in-up">
            <div className="relative mb-4">
              {headshotUrl ? (
                <div className="w-20 h-20 mx-auto rounded-full border-3 border-blue-300 overflow-hidden shadow-lg animate-float-gentle relative">
                  <img 
                    src={headshotUrl} 
                    alt={name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-indigo-200/20"></div>
                </div>
              ) : (
                <div className="w-20 h-20 mx-auto rounded-full border-3 border-blue-300 bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center shadow-lg animate-float-gentle">
                  <span className="text-2xl font-bold text-blue-800">{name.charAt(0)}</span>
                </div>
              )}
              {/* Floating accent */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full opacity-70 animate-bounce"></div>
            </div>
            
            <h2 className="text-xl font-bold text-blue-900 mb-1 animate-slide-in" style={{animationDelay: '0.2s'}}>
              {name}
            </h2>
            <p className="text-blue-700 text-sm font-medium mb-1 animate-slide-in" style={{animationDelay: '0.4s'}}>
              {title}
            </p>
            <p className="text-blue-600 text-xs animate-slide-in" style={{animationDelay: '0.6s'}}>
              {company}
            </p>
          </div>

          {/* Floating contact info */}
          <div className="space-y-4 mb-6 flex-1">
            <div className="flex items-center space-x-3 animate-slide-in-right hover:translate-x-2 transition-transform duration-300" style={{animationDelay: '0.8s'}}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 animate-float-gentle">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <a 
                href={`tel:${phone}`} 
                className="text-sm text-blue-800 hover:text-blue-600 transition-colors duration-200 truncate"
              >
                {phone}
              </a>
            </div>
            
            <div className="flex items-center space-x-3 animate-slide-in-right hover:translate-x-2 transition-transform duration-300" style={{animationDelay: '1s'}}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 animate-float-gentle">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <a 
                href={`mailto:${email}`} 
                className="text-sm text-blue-800 hover:text-indigo-600 transition-colors duration-200 truncate"
              >
                {email}
              </a>
            </div>
            
            <div className="flex items-center space-x-3 animate-slide-in-right hover:translate-x-2 transition-transform duration-300" style={{animationDelay: '1.2s'}}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 animate-float-gentle">
                <Globe className="h-4 w-4 text-white" />
              </div>
              <a 
                href={`https://${website}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-blue-800 hover:text-sky-600 transition-colors duration-200 truncate"
              >
                {website}
              </a>
            </div>
          </div>

          {/* Floating social links */}
          {displaySocialLinks.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 px-4 py-2 animate-fade-in-up" style={{animationDelay: '1.4s'}}>
              {displaySocialLinks.map((social, index) => (
                <a
                  key={social.platform}
                  href={getSocialUrl(social.platform, social.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-white to-blue-50 border-2 border-blue-300 flex items-center justify-center text-blue-700 hover:border-blue-500 hover:text-blue-900 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg animate-float-gentle"
                  style={{animationDelay: `${1.6 + index * 0.2}s`}}
                >
                  <span className="text-xs">{getSocialIcon(social.platform)}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </Card>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(10deg); }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes hover-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes sway {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          25% { transform: translateX(5px) rotate(2deg); }
          75% { transform: translateX(-5px) rotate(-2deg); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 4s ease-in-out infinite 1s; }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle 2s ease-in-out infinite; }
        .animate-hover-float { animation: hover-float 4s ease-in-out infinite; }
        .animate-sway { animation: sway 6s ease-in-out infinite; }
        .animate-gradient-shift { animation: gradient-shift 3s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-slide-in { animation: slide-in 0.6s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
        `
      }} />
    </div>
  );
};

export default FloatingCard;
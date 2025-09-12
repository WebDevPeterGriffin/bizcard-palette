import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { SocialIcon, buildSocialUrl } from "@/components/SocialIcon";
import { ContactActions } from "@/components/ContactActions";
import QRCodeGenerator from "@/components/QRCodeGenerator";

interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

interface HolographicCardProps {
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

export const HolographicCard = ({
  cardId,
  name = "John Doe",
  title = "Software Engineer",
  company = "Tech Company",
  phone = "+1 (555) 123-4567",
  email = "john@tech.com",
  website = "www.johndoe.com",
  location = "San Francisco, CA",
  headshotUrl,
  socialLinks = [],
  slug
}: HolographicCardProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Holographic glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-75 blur-xl animate-pulse"></div>
      
      <Card className="relative backdrop-blur-lg bg-black/20 border-2 border-white/10 rounded-3xl p-8 text-white overflow-hidden">
        {/* Animated holographic background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/20 via-transparent to-purple-500/20 animate-[spin_15s_linear_infinite_reverse]"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[slide-in-right_3s_ease-in-out_infinite]"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white/30 rounded-full animate-[float_${3 + i}s_ease-in-out_infinite] opacity-60`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 12}%`,
                animationDelay: `${i * 0.5}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 space-y-6">
          {/* Profile section with holographic border */}
          <div className="text-center space-y-4">
            <div className="relative mx-auto w-24 h-24 md:w-24 md:h-24">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-[spin_3s_linear_infinite] p-1">
                <div className="w-full h-full rounded-full bg-black p-1 flex items-center justify-center overflow-hidden">
                  {headshotUrl ? (
                    <img
                      src={headshotUrl}
                      alt={name}
                      className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-xl font-bold text-white/90">
                      {name?.trim()?.split(' ').slice(0,2).map(n => n.charAt(0)).join('') || 'NA'}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-[fade-in_1s_ease-out]">
                {name}
              </h2>
              <p className="text-purple-200 font-medium animate-[fade-in_1.5s_ease-out]">{title}</p>
              <p className="text-cyan-200 animate-[fade-in_2s_ease-out]">{company}</p>
            </div>
          </div>

          {/* Contact info with staggered animations */}
          <div className="space-y-3">
            {phone && (
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300 animate-[fade-in_2.5s_ease-out]">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all duration-300">
                  <Phone size={16} className="text-purple-200" />
                </div>
                <span className="text-white/90">{phone}</span>
              </div>
            )}
            
            {email && (
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300 animate-[fade-in_3s_ease-out]">
                <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-white/10 group-hover:from-pink-500/40 group-hover:to-cyan-500/40 transition-all duration-300">
                  <Mail size={16} className="text-pink-200" />
                </div>
                <span className="text-white/90">{email}</span>
              </div>
            )}
            
            {website && (
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300 animate-[fade-in_3.5s_ease-out]">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 group-hover:from-cyan-500/40 group-hover:to-purple-500/40 transition-all duration-300">
                  <Globe size={16} className="text-cyan-200" />
                </div>
                <span className="text-white/90">{website}</span>
              </div>
            )}
            
            {cardId && location && (
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300 animate-[fade-in_4s_ease-out]">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/10 group-hover:from-purple-500/40 group-hover:to-cyan-500/40 transition-all duration-300">
                  <MapPin size={16} className="text-purple-200" />
                </div>
                <span className="text-white/90">{location}</span>
              </div>
            )}
          </div>

          {/* Social links with holographic effect */}
          {socialLinks.length > 0 && (
            <div className="space-y-3 animate-[fade-in_4.5s_ease-out]">
              <h3 className="text-lg font-semibold text-white/90">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className="transform hover:scale-110 transition-all duration-300 hover:rotate-6"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <a
                      href={buildSocialUrl(link.platform, link.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-10 h-10 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 hover:from-purple-500/30 hover:to-cyan-500/30 hover:border-white/40 flex items-center justify-center"
                    >
                      <SocialIcon 
                        platform={link.platform} 
                        className="w-5 h-5 text-white" 
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions with QR code */}
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
                bookingInstructions="Schedule a meeting to discuss your next project or collaboration opportunity."
              />
              
              {slug && (
                <div className="flex justify-center">
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <QRCodeGenerator url={`${window.location.origin}/card/${slug}`} size={120} showControls={false} />
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
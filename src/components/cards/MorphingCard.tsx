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

interface MorphingCardProps {
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

export const MorphingCard = ({
  cardId,
  name = "Alex Rivera",
  title = "Creative Director",
  company = "Design Studio",
  phone = "+1 (555) 456-7890",
  email = "alex@design.com",
  website = "www.alexrivera.com",
  location = "Los Angeles, CA",
  headshotUrl,
  socialLinks = [],
  slug
}: MorphingCardProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <Card className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 border-0 rounded-3xl p-8 text-white overflow-hidden">
        {/* Morphing background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-600/30 animate-[morph_8s_ease-in-out_infinite]"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-cyan-600/20 via-blue-600/20 to-indigo-600/20 animate-[morph_6s_ease-in-out_infinite_reverse]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/25 via-pink-600/25 to-red-600/25 animate-[morph_10s_ease-in-out_infinite]"></div>
        </div>

        {/* Morphing shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full animate-[morphing-blob_12s_ease-in-out_infinite] blur-xl"></div>
          <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full animate-[morphing-blob_8s_ease-in-out_infinite_reverse] blur-lg"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full animate-[morphing-blob_10s_ease-in-out_infinite] blur-md transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Liquid border effect */}
        <div className="absolute inset-0 rounded-3xl">
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-[border-flow_4s_linear_infinite]" style={{
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor'
          }}></div>
        </div>

        <div className="relative z-10 space-y-6">
          {/* Profile section with morphing border */}
          <div className="text-center space-y-4">
            <div className="relative mx-auto w-24 h-24 md:w-24 md:h-24 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-[morphing-border_6s_ease-in-out_infinite] p-1">
                <div className="w-full h-full rounded-full bg-black/20 backdrop-blur-sm p-1 flex items-center justify-center overflow-hidden">
                  {headshotUrl ? (
                    <img
                      src={headshotUrl}
                      alt={name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <span className="text-xl font-bold text-white/90">
                      {name?.trim()?.split(' ').slice(0,2).map(n => n.charAt(0)).join('') || 'NA'}
                    </span>
                  )}
                </div>
              </div>
              {/* Morphing aura effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400/40 via-purple-400/40 to-pink-400/40 animate-[aura-pulse_3s_ease-in-out_infinite] blur-md scale-150 opacity-50"></div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-[text-shimmer_3s_ease-in-out_infinite]">
                {name}
              </h2>
              <p className="text-indigo-200 font-medium animate-[fade-in_1.5s_ease-out] transform hover:scale-105 transition-transform duration-300">{title}</p>
              <p className="text-purple-200 animate-[fade-in_2s_ease-out] transform hover:scale-105 transition-transform duration-300">{company}</p>
            </div>
          </div>

          {/* Contact info with liquid morphing */}
          <div className="space-y-3">
            {phone && (
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-all duration-700 animate-[liquid-slide_2.5s_ease-out] relative">
                <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 group-hover:from-indigo-500/40 group-hover:to-purple-500/40 group-hover:border-indigo-400/60 transition-all duration-500 relative overflow-hidden">
                  <Phone size={16} className="text-indigo-300 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </div>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300">{phone}</span>
              </div>
            )}
            
            {email && (
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-all duration-700 animate-[liquid-slide_3s_ease-out] relative">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 group-hover:from-purple-500/40 group-hover:to-pink-500/40 group-hover:border-purple-400/60 transition-all duration-500 relative overflow-hidden">
                  <Mail size={16} className="text-purple-300 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </div>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300">{email}</span>
              </div>
            )}
            
            {website && (
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-all duration-700 animate-[liquid-slide_3.5s_ease-out] relative">
                <div className="p-2 rounded-xl bg-gradient-to-r from-pink-500/20 to-red-500/20 border border-pink-400/30 group-hover:from-pink-500/40 group-hover:to-red-500/40 group-hover:border-pink-400/60 transition-all duration-500 relative overflow-hidden">
                  <Globe size={16} className="text-pink-300 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/30 to-red-400/30 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </div>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300">{website}</span>
              </div>
            )}
            
            {cardId && location && (
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-all duration-700 animate-[liquid-slide_4s_ease-out] relative">
                <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 group-hover:from-cyan-500/40 group-hover:to-indigo-500/40 group-hover:border-cyan-400/60 transition-all duration-500 relative overflow-hidden">
                  <MapPin size={16} className="text-cyan-300 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-indigo-400/30 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </div>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300">{location}</span>
              </div>
            )}
          </div>

          {/* Social links with morphing effects */}
          {socialLinks.length > 0 && (
            <div className="space-y-3 animate-[fade-in_4.5s_ease-out]">
              <h3 className="text-lg font-semibold text-white/90 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className="relative transform hover:scale-110 transition-all duration-500 hover:-translate-y-2 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <a
                      href={buildSocialUrl(link.platform, link.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 hover:from-indigo-500/40 hover:to-purple-500/40 hover:border-indigo-400/60 relative z-10 transition-all duration-500 flex items-center justify-center"
                    >
                      <SocialIcon 
                        platform={link.platform} 
                        className="w-5 h-5 text-white" 
                      />
                    </a>
                    {/* Morphing glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400/40 via-purple-400/40 to-pink-400/40 opacity-0 group-hover:opacity-100 animate-[morph-glow_2s_ease-in-out_infinite] blur-md scale-150"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions with liquid animation */}
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
                bookingInstructions="Schedule a creative consultation to discuss your design vision and bring your ideas to life."
              />
              
              {slug && (
                <div className="flex justify-center">
                  <div className="relative p-3 rounded-2xl bg-black/20 backdrop-blur-sm border border-indigo-400/30 group hover:border-purple-400/50 transition-all duration-500">
                    <QRCodeGenerator url={`${window.location.origin}/card/${slug}`} size={120} showControls={false} />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[morph_4s_ease-in-out_infinite]"></div>
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
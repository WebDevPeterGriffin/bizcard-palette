import { Card } from "@/components/ui/card";
import { Phone, Mail, Globe } from "lucide-react";
import SocialIcon, { buildSocialUrl } from "@/components/SocialIcon";
import { ContactActions } from "@/components/ContactActions";
import QRCodeGenerator from "@/components/QRCodeGenerator";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface PrismCardProps {
  cardId?: string;
  name?: string;
  title?: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  socialLinks?: SocialLink[];
  headshotUrl?: string;
  bookingEnabled?: boolean;
  bookingInstructions?: string;
  slug?: string;
}

const PrismCard = ({
  cardId,
  name = "Riley Prism",
  title = "Motion Designer",
  company = "Spectra Labs",
  phone = "+1 (555) 321-9876",
  email = "riley@spectra.io",
  website = "www.rileyprism.art",
  socialLinks = [],
  headshotUrl,
  bookingEnabled = true,
  bookingInstructions = "Book a session to craft animated brand visuals.",
  slug
}: PrismCardProps) => {
  return (
    <Card className="relative w-80 h-auto min-h-[26rem] overflow-hidden border border-white/10 bg-gradient-to-b from-[#0b0b10] via-[#12121a] to-[#0b0b10] backdrop-blur-md mx-auto">
      {/* Animated luxury background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radiant conic halo */}
        <div className="absolute -inset-1 opacity-50 animate-[sweep_10s_linear_infinite]" style={{
          background: "conic-gradient(from 0deg, #b78a28, #8b5cf6, #06b6d4, #b78a28)",
          maskImage: "radial-gradient(circle at 50% 40%, black 28%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 40%, black 28%, transparent 60%)",
        }} />
        {/* Light beams */}
        <div className="absolute -left-1/2 top-1/3 w-[220%] h-24 rotate-6 bg-gradient-to-r from-amber-500/0 via-amber-400/20 to-amber-500/0 blur-2xl animate-[beam_6s_ease-in-out_infinite]" />
        <div className="absolute -right-1/2 bottom-1/4 w-[220%] h-24 -rotate-6 bg-gradient-to-r from-violet-500/0 via-violet-400/20 to-violet-500/0 blur-2xl animate-[beam_8s_ease-in-out_infinite_1s]" />
        {/* Floating facets */}
        <div className="absolute left-6 top-10 w-10 h-10 rotate-12 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm animate-[float_6s_ease-in-out_infinite]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="absolute right-8 bottom-12 w-8 h-8 -rotate-12 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm animate-[float_7s_ease-in-out_infinite_1s]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        {/* Star dust */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,.35), transparent), radial-gradient(1px 1px at 120px 80px, rgba(255,255,255,.25), transparent), radial-gradient(2px 2px at 200px 140px, rgba(255,255,255,.3), transparent)`,
          backgroundSize: '240px 180px',
          animation: 'star-move 30s linear infinite'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 text-white flex flex-col items-center">
        {/* Avatar */}
        <div className="text-center mb-6">
          <div className="relative mx-auto w-32 h-32 md:w-36 md:h-36">
            <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-amber-400 via-violet-400 to-cyan-400 animate-[spin_12s_linear_infinite]">
              <div className="w-full h-full rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                {headshotUrl ? (
                  <img src={headshotUrl} alt={name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-xl font-bold text-white/90">{name.trim().split(' ').slice(0,2).map(n => n.charAt(0)).join('')}</span>
                )}
              </div>
            </div>
          </div>
          <h2 className="mt-4 text-xl font-bold bg-gradient-to-r from-amber-200 via-violet-200 to-cyan-200 bg-clip-text text-transparent animate-[shimmer_8s_linear_infinite]">{name}</h2>
          <p className="text-amber-200/90 text-sm">{title}</p>
          <p className="text-violet-200/80 text-xs">{company}</p>
        </div>

        {/* Contact */}
        <div className="space-y-3 mb-6 w-full">
          {phone && (
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400/30 to-violet-400/30 border border-white/20 flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <a href={`tel:${phone}`} className="text-sm text-white/90 hover:text-white transition-colors">{phone}</a>
            </div>
          )}
          {email && (
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400/30 to-pink-400/30 border border-white/20 flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <a href={`mailto:${email}`} className="text-sm text-white/90 hover:text-white transition-colors">{email}</a>
            </div>
          )}
          {website && (
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/30 to-amber-400/30 border border-white/20 flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-white/90 hover:text-white transition-colors">{website}</a>
            </div>
          )}
        </div>

        {/* Socials */}
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 px-2 py-1 mb-6">
            {socialLinks.map((s, i) => (
              <a key={s.platform + i} href={buildSocialUrl(s.platform, s.url)} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center hover:border-amber-300/60 transition-all hover:scale-110">
                <SocialIcon platform={s.platform} className="w-4 h-4 text-white" />
              </a>
            ))}
          </div>
        )}

        {/* Actions */}
        {cardId && (
          <div className="mt-4 border-t border-white/10 pt-4">
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
              style="minimal"
            />
          </div>
        )}

        {slug && (
          <div className="mt-6 border-t border-white/10 pt-6 flex justify-center">
            <div className="relative p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20">
              <QRCodeGenerator url={`${window.location.origin}/card/${slug}`} size={120} showControls={false} />
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes sweep { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }
          @keyframes beam { 0%,100% { transform: translateX(-10%) } 50% { transform: translateX(10%) } }
          @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
          @keyframes shimmer { 0% { background-position: 0% 50% } 100% { background-position: 200% 50% } }
          @keyframes star-move { 0% { transform: translateX(0px) translateY(0px) } 100% { transform: translateX(-200px) translateY(-120px) } }
        `
      }} />
    </Card>
  );
};

export default PrismCard;



import { Mail, Phone, Globe, Linkedin, Twitter, Instagram, Facebook, Youtube, Github, MessageCircle, Send, Users, Twitch, Camera, Hash, Bookmark, FileText, Code, Heart, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContactActions } from "@/components/ContactActions";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface CreativeCardProps {
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
  // Keep backward compatibility
  linkedin?: string;
  twitter?: string;
}

const CreativeCard = ({ 
  cardId,
  name = "Maya Chen",
  title = "UX/UI Designer", 
  company = "Creative Pixel Studio",
  phone = "+1 (555) 369-2580",
  email = "maya@creativepixel.com",
  website = "www.mayachen.design",
  socialLinks = [],
  headshotUrl,
  bookingEnabled = false,
  bookingInstructions,
  linkedin = "",
  twitter = ""
}: CreativeCardProps) => {
  
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return <Linkedin className="h-5 w-5" />;
      case 'twitter': return <Twitter className="h-5 w-5" />;
      case 'instagram': return <Instagram className="h-5 w-5" />;
      case 'facebook': return <Facebook className="h-5 w-5" />;
      case 'youtube': return <Youtube className="h-5 w-5" />;
      case 'github': return <Github className="h-5 w-5" />;
      case 'snapchat': return <Camera className="h-5 w-5" />;
      case 'whatsapp': return <MessageCircle className="h-5 w-5" />;
      case 'telegram': return <Send className="h-5 w-5" />;
      case 'messenger': return <MessageCircle className="h-5 w-5" />;
      case 'discord': return <Users className="h-5 w-5" />;
      case 'tiktok': return <Hash className="h-5 w-5" />;
      case 'twitch': return <Twitch className="h-5 w-5" />;
      case 'pinterest': return <Bookmark className="h-5 w-5" />;
      case 'reddit': return <MessageCircle className="h-5 w-5" />;
      case 'behance': return <Globe className="h-5 w-5" />;
      case 'dribbble': return <Globe className="h-5 w-5" />;
      case 'medium': return <FileText className="h-5 w-5" />;
      case 'dev': return <Code className="h-5 w-5" />;
      default: return <Globe className="h-5 w-5" />;
    }
  };

  const getSocialUrl = (platform: string, url: string) => {
    const cleanUrl = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
    switch (platform.toLowerCase()) {
      case 'twitter': return `https://twitter.com/${cleanUrl.replace('@', '').replace('twitter.com/', '')}`;
      case 'linkedin': return cleanUrl.startsWith('linkedin.com') ? `https://${cleanUrl}` : `https://linkedin.com/in/${cleanUrl}`;
      case 'instagram': return `https://instagram.com/${cleanUrl.replace('@', '').replace('instagram.com/', '')}`;
      case 'facebook': return `https://facebook.com/${cleanUrl.replace('facebook.com/', '')}`;
      case 'youtube': return cleanUrl.startsWith('youtube.com') ? `https://${cleanUrl}` : `https://youtube.com/${cleanUrl}`;
      case 'github': return `https://github.com/${cleanUrl.replace('github.com/', '')}`;
      case 'snapchat': return `https://snapchat.com/add/${cleanUrl.replace('snapchat.com/add/', '')}`;
      case 'whatsapp': return cleanUrl.startsWith('wa.me') ? `https://${cleanUrl}` : `https://wa.me/${cleanUrl}`;
      case 'telegram': return cleanUrl.startsWith('t.me') ? `https://${cleanUrl}` : `https://t.me/${cleanUrl}`;
      case 'messenger': return cleanUrl.startsWith('m.me') ? `https://${cleanUrl}` : `https://m.me/${cleanUrl}`;
      case 'discord': return cleanUrl.startsWith('discord.gg') ? `https://${cleanUrl}` : `https://discord.gg/${cleanUrl}`;
      case 'tiktok': return `https://tiktok.com/@${cleanUrl.replace('@', '').replace('tiktok.com/@', '')}`;
      case 'twitch': return `https://twitch.tv/${cleanUrl.replace('twitch.tv/', '')}`;
      case 'pinterest': return `https://pinterest.com/${cleanUrl.replace('pinterest.com/', '')}`;
      case 'reddit': return `https://reddit.com/user/${cleanUrl.replace('reddit.com/user/', '')}`;
      case 'behance': return `https://behance.net/${cleanUrl.replace('behance.net/', '')}`;
      case 'dribbble': return `https://dribbble.com/${cleanUrl.replace('dribbble.com/', '')}`;
      case 'medium': return `https://medium.com/@${cleanUrl.replace('@', '').replace('medium.com/@', '')}`;
      case 'dev': return `https://dev.to/${cleanUrl.replace('dev.to/', '')}`;
      default: return cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`;
    }
  };

  // Use socialLinks if available, otherwise fall back to legacy props
  const displaySocialLinks = socialLinks.length > 0 ? socialLinks : [
    ...(linkedin ? [{ platform: 'linkedin', url: linkedin, label: 'LinkedIn' }] : []),
    ...(twitter ? [{ platform: 'twitter', url: twitter, label: 'Twitter' }] : [])
  ];
  return (
    <div className="mx-auto w-full max-w-md">
      <Card className="relative overflow-hidden bg-gradient-creative shadow-card">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4">
          <Sparkles className="h-6 w-6 text-white/40 animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Heart className="h-5 w-5 text-white/30" />
        </div>
        
        <CardContent className="relative p-8 text-center text-white">
          {/* Profile Section */}
          <div className="mb-6">
            <div className="mx-auto mb-4 h-32 w-32 md:h-36 md:w-36 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30 overflow-hidden">
              {headshotUrl ? (
                <img 
                  src={headshotUrl} 
                  alt={`${name} profile`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Failed to load headshot:', headshotUrl);
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <span className={`text-2xl font-bold ${headshotUrl ? 'hidden' : ''}`}>
                {name.charAt(0)}
              </span>
            </div>
            <h1 className="mb-1 text-2xl font-bold drop-shadow-lg">{name}</h1>
            <div className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-1 mb-2">
              <p className="text-sm font-semibold">{title}</p>
            </div>
            <p className="text-sm text-white/90">{company}</p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-3 mb-6">
            {phone && (
              <a href={`tel:${phone}`} className="rounded-2xl bg-white/15 backdrop-blur-sm p-3 border border-white/20 hover:bg-white/25 transition-colors block">
                <div className="flex items-center justify-center space-x-2">
                  <div className="rounded-full bg-white/20 p-1">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{phone}</span>
                </div>
              </a>
            )}
            
            {email && (
              <a href={`mailto:${email}`} className="rounded-2xl bg-white/15 backdrop-blur-sm p-3 border border-white/20 hover:bg-white/25 transition-colors block">
                <div className="flex items-center justify-center space-x-2">
                  <div className="rounded-full bg-white/20 p-1">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{email}</span>
                </div>
              </a>
            )}
            
            {website && (
              <a 
                href={website.startsWith('http') ? website : `https://${website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-2xl bg-white/15 backdrop-blur-sm p-3 border border-white/20 hover:bg-white/25 transition-colors block"
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="rounded-full bg-white/20 p-1">
                    <Globe className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{website}</span>
                </div>
              </a>
            )}
          </div>

          {/* Social Bubbles */}
          {displaySocialLinks.length > 0 && (
            <div className="flex justify-center flex-wrap gap-3">
              {displaySocialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={getSocialUrl(social.platform, social.url)} 
                  className="group"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label || social.platform}
                >
                  <div className="rounded-full bg-white/20 backdrop-blur-sm p-3 border border-white/30 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                    {getSocialIcon(social.platform)}
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Contact Actions */}
          {cardId && (
            <div className="mt-6 border-t border-white/20 pt-6">
              <ContactActions
                cardId={cardId}
                name={name}
                title={title}
                company={company}
                phone={phone}
                email={email}
                website={website}
                socialLinks={displaySocialLinks}
                headshotUrl={headshotUrl}
                bookingEnabled={bookingEnabled}
                bookingInstructions={bookingInstructions}
                style="creative"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreativeCard;
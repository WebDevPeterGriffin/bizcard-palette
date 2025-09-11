import { Mail, Phone, Globe, Linkedin, Twitter, Instagram, Facebook, Youtube, Github, MessageCircle, Send, Users, Twitch, Camera, Hash, Bookmark, FileText, Code, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContactActions } from "@/components/ContactActions";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface ElegantCardProps {
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

const ElegantCard = ({ 
  cardId,
  name = "Alexander Reed",
  title = "Managing Partner", 
  company = "Reed & Associates Law",
  phone = "+1 (555) 246-8135",
  email = "a.reed@reedlaw.com",
  website = "www.reedlawfirm.com",
  socialLinks = [],
  headshotUrl,
  bookingEnabled = false,
  bookingInstructions,
  linkedin = "",
  twitter = ""
}: ElegantCardProps) => {
  
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
    <Card className="mx-auto w-full max-w-md bg-gradient-elegant border-elegant-accent/30 shadow-card">
      <CardContent className="p-8">
        {/* Header with gold accent line */}
        <div className="border-b-2 border-elegant-accent pb-6 mb-6">
          <div className="text-center">
            <div className="mx-auto mb-4 h-28 w-28 md:h-20 md:w-20 rounded-full bg-elegant-accent/20 flex items-center justify-center border-2 border-elegant-accent/30 overflow-hidden">
              {headshotUrl ? (
                <img 
                  src={headshotUrl} 
                  alt={`${name} profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl font-serif font-bold text-elegant-accent">
                  {name.split(' ').map(n => n.charAt(0)).join('')}
                </span>
              )}
            </div>
            <h1 className="mb-2 text-2xl font-serif font-bold text-gray-800">{name}</h1>
            <p className="text-lg font-medium text-elegant-accent">{title}</p>
            <p className="text-sm font-serif text-gray-600 italic">{company}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center space-x-3 p-2 rounded-md hover:bg-elegant-accent/5 transition-colors">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-elegant-accent/10">
                <Phone className="h-4 w-4 text-elegant-accent" />
              </div>
              <span className="text-sm font-medium text-gray-700">{phone}</span>
            </a>
          )}
          
          {email && (
            <a href={`mailto:${email}`} className="flex items-center space-x-3 p-2 rounded-md hover:bg-elegant-accent/5 transition-colors">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-elegant-accent/10">
                <Mail className="h-4 w-4 text-elegant-accent" />
              </div>
              <span className="text-sm font-medium text-gray-700">{email}</span>
            </a>
          )}
          
          {website && (
            <a 
              href={website.startsWith('http') ? website : `https://${website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-elegant-accent/5 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-elegant-accent/10">
                <Globe className="h-4 w-4 text-elegant-accent" />
              </div>
              <span className="text-sm font-medium text-gray-700">{website}</span>
            </a>
          )}
        </div>

        {/* Professional Networks */}
        {displaySocialLinks.length > 0 && (
          <div className="mt-6 border-t border-elegant-accent/20 pt-6">
            <h3 className="mb-3 text-center text-sm font-serif font-semibold text-gray-600 uppercase tracking-wide">
              Connect
            </h3>
            <div className="flex justify-center flex-wrap gap-4">
              {displaySocialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={getSocialUrl(social.platform, social.url)} 
                  className="group flex flex-col items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-elegant-accent/10 group-hover:bg-elegant-accent/20 transition-colors">
                    {getSocialIcon(social.platform)}
                  </div>
                  <span className="text-xs font-medium text-gray-600">{social.label || social.platform}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Contact Actions */}
        {cardId && (
          <div className="mt-6 border-t border-elegant-accent/20 pt-6">
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
                style="elegant"
              />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ElegantCard;
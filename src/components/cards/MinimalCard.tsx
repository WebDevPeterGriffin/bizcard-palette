import { Mail, Phone, Globe, MapPin, Linkedin, Twitter, Instagram, Facebook, Youtube, Github, MessageCircle, Send, Users, Twitch, Camera, Hash, Bookmark, FileText, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContactActions } from "@/components/ContactActions";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface MinimalCardProps {
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

const MinimalCard = ({ 
  cardId,
  name = "John Doe",
  title = "Senior Product Manager", 
  company = "Tech Innovations Inc.",
  phone = "+1 (555) 123-4567",
  email = "john.doe@techinn.com",
  website = "www.johndoe.com",
  socialLinks = [],
  headshotUrl,
  bookingEnabled = false,
  bookingInstructions,
  linkedin = "",
  twitter = ""
}: MinimalCardProps) => {
  
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'youtube': return <Youtube className="h-4 w-4" />;
      case 'github': return <Github className="h-4 w-4" />;
      case 'snapchat': return <Camera className="h-4 w-4" />;
      case 'whatsapp': return <MessageCircle className="h-4 w-4" />;
      case 'telegram': return <Send className="h-4 w-4" />;
      case 'messenger': return <MessageCircle className="h-4 w-4" />;
      case 'discord': return <Users className="h-4 w-4" />;
      case 'tiktok': return <Hash className="h-4 w-4" />;
      case 'twitch': return <Twitch className="h-4 w-4" />;
      case 'pinterest': return <Bookmark className="h-4 w-4" />;
      case 'reddit': return <MessageCircle className="h-4 w-4" />;
      case 'behance': return <Globe className="h-4 w-4" />;
      case 'dribbble': return <Globe className="h-4 w-4" />;
      case 'medium': return <FileText className="h-4 w-4" />;
      case 'dev': return <Code className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
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
    <Card className="mx-auto w-full max-w-md bg-gradient-minimal border-minimal-accent/20 shadow-card">
      <CardContent className="p-8 text-center">
        {/* Profile Section */}
        <div className="mb-6">
          <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-minimal-accent/10 flex items-center justify-center overflow-hidden">
            {headshotUrl ? (
              <img 
                src={headshotUrl} 
                alt={`${name} profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-minimal-accent">
                {name.charAt(0)}
              </span>
            )}
          </div>
          <h1 className="mb-1 text-2xl font-bold text-minimal-accent">{name}</h1>
          <p className="text-lg text-muted-foreground">{title}</p>
          <p className="text-sm font-medium text-minimal-accent/80">{company}</p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 border-t border-minimal-accent/10 pt-6">
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center justify-center space-x-2 hover:text-minimal-accent/80 transition-colors">
              <Phone className="h-4 w-4 text-minimal-accent" />
              <span className="text-sm">{phone}</span>
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="flex items-center justify-center space-x-2 hover:text-minimal-accent/80 transition-colors">
              <Mail className="h-4 w-4 text-minimal-accent" />
              <span className="text-sm">{email}</span>
            </a>
          )}
          {website && (
            <a 
              href={website.startsWith('http') ? website : `https://${website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 hover:text-minimal-accent/80 transition-colors"
            >
              <Globe className="h-4 w-4 text-minimal-accent" />
              <span className="text-sm">{website}</span>
            </a>
          )}
        </div>

        {/* Social Links */}
        {displaySocialLinks.length > 0 && (
          <div className="mt-6 border-t border-minimal-accent/10 pt-6">
            <div className="flex justify-center flex-wrap gap-4">
              {displaySocialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={getSocialUrl(social.platform, social.url)} 
                  className="flex items-center space-x-1 text-minimal-accent hover:text-minimal-accent/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(social.platform)}
                  <span className="text-xs">{social.label || social.platform}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Contact Actions */}
        {cardId && (
          <div className="mt-6 border-t border-minimal-accent/10 pt-6">
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
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MinimalCard;
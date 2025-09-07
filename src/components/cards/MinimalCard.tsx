import { Mail, Phone, Globe, MapPin, Linkedin, Twitter, Instagram, Facebook, Youtube, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface MinimalCardProps {
  name?: string;
  title?: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  socialLinks?: SocialLink[];
  // Keep backward compatibility
  linkedin?: string;
  twitter?: string;
}

const MinimalCard = ({ 
  name = "John Doe",
  title = "Senior Product Manager", 
  company = "Tech Innovations Inc.",
  phone = "+1 (555) 123-4567",
  email = "john.doe@techinn.com",
  website = "www.johndoe.com",
  socialLinks = [],
  linkedin = "linkedin.com/in/johndoe",
  twitter = "@johndoe"
}: MinimalCardProps) => {
  
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'youtube': return <Youtube className="h-4 w-4" />;
      case 'github': return <Github className="h-4 w-4" />;
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
          <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-minimal-accent/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-minimal-accent">
              {name.charAt(0)}
            </span>
          </div>
          <h1 className="mb-1 text-2xl font-bold text-minimal-accent">{name}</h1>
          <p className="text-lg text-muted-foreground">{title}</p>
          <p className="text-sm font-medium text-minimal-accent/80">{company}</p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 border-t border-minimal-accent/10 pt-6">
          <div className="flex items-center justify-center space-x-2">
            <Phone className="h-4 w-4 text-minimal-accent" />
            <span className="text-sm">{phone}</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Mail className="h-4 w-4 text-minimal-accent" />
            <span className="text-sm">{email}</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Globe className="h-4 w-4 text-minimal-accent" />
            <span className="text-sm">{website}</span>
          </div>
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
      </CardContent>
    </Card>
  );
};

export default MinimalCard;
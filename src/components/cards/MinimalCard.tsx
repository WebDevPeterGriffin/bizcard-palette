import { Mail, Phone, Globe, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MinimalCardProps {
  name?: string;
  title?: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
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
  linkedin = "linkedin.com/in/johndoe",
  twitter = "@johndoe"
}: MinimalCardProps) => {
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
        <div className="mt-6 border-t border-minimal-accent/10 pt-6">
          <div className="flex justify-center space-x-4">
            <a href={`https://${linkedin}`} className="text-minimal-accent hover:text-minimal-accent/80 transition-colors">
              <span className="text-xs">LinkedIn</span>
            </a>
            <a href={`https://twitter.com/${twitter.replace('@', '')}`} className="text-minimal-accent hover:text-minimal-accent/80 transition-colors">
              <span className="text-xs">Twitter</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MinimalCard;
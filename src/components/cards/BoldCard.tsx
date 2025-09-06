import { Mail, Phone, Globe, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BoldCardProps {
  name?: string;
  title?: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
}

const BoldCard = ({ 
  name = "Sarah Johnson",
  title = "Creative Director", 
  company = "Design Studio Pro",
  phone = "+1 (555) 987-6543",
  email = "sarah.j@designpro.com",
  website = "www.sarahdesigns.com",
  linkedin = "linkedin.com/in/sarahjohnson",
  twitter = "@sarahcreates"
}: BoldCardProps) => {
  return (
    <Card className="mx-auto w-full max-w-md bg-gradient-bold border-bold-accent shadow-card">
      <CardContent className="p-8 text-center">
        {/* Profile Section */}
        <div className="mb-6">
          <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-bold-accent flex items-center justify-center">
            <span className="text-2xl font-bold text-bold-accent-foreground">
              {name.charAt(0)}
            </span>
          </div>
          <h1 className="mb-1 text-2xl font-bold text-white">{name}</h1>
          <p className="text-lg text-bold-accent">{title}</p>
          <p className="text-sm font-medium text-white/80">{company}</p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 border-t border-white/20 pt-6">
          <div className="rounded-lg bg-white/5 p-3">
            <div className="flex items-center justify-center space-x-2">
              <Phone className="h-5 w-5 text-bold-accent" />
              <span className="text-white font-medium">{phone}</span>
            </div>
          </div>
          <div className="rounded-lg bg-white/5 p-3">
            <div className="flex items-center justify-center space-x-2">
              <Mail className="h-5 w-5 text-bold-accent" />
              <span className="text-white font-medium">{email}</span>
            </div>
          </div>
          <div className="rounded-lg bg-white/5 p-3">
            <div className="flex items-center justify-center space-x-2">
              <Globe className="h-5 w-5 text-bold-accent" />
              <span className="text-white font-medium">{website}</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-6 border-t border-white/20 pt-6">
          <div className="flex justify-center space-x-6">
            <a href={`https://${linkedin}`} className="flex items-center space-x-2 text-bold-accent hover:text-bold-accent/80 transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <a href={`https://twitter.com/${twitter.replace('@', '')}`} className="flex items-center space-x-2 text-bold-accent hover:text-bold-accent/80 transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="text-sm font-medium">Twitter</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoldCard;
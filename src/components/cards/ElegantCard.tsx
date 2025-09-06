import { Mail, Phone, Globe, Linkedin, Twitter, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ElegantCardProps {
  name?: string;
  title?: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
}

const ElegantCard = ({ 
  name = "Alexander Reed",
  title = "Managing Partner", 
  company = "Reed & Associates Law",
  phone = "+1 (555) 246-8135",
  email = "a.reed@reedlaw.com",
  website = "www.reedlawfirm.com",
  linkedin = "linkedin.com/in/alexreed",
  twitter = "@alexreedlaw"
}: ElegantCardProps) => {
  return (
    <Card className="mx-auto w-full max-w-md bg-gradient-elegant border-elegant-accent/30 shadow-card">
      <CardContent className="p-8">
        {/* Header with gold accent line */}
        <div className="border-b-2 border-elegant-accent pb-6 mb-6">
          <div className="text-center">
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-elegant-accent/20 flex items-center justify-center border-2 border-elegant-accent/30">
              <span className="text-xl font-serif font-bold text-elegant-accent">
                {name.split(' ').map(n => n.charAt(0)).join('')}
              </span>
            </div>
            <h1 className="mb-2 text-2xl font-serif font-bold text-gray-800">{name}</h1>
            <p className="text-lg font-medium text-elegant-accent">{title}</p>
            <p className="text-sm font-serif text-gray-600 italic">{company}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-elegant-accent/5 transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-elegant-accent/10">
              <Phone className="h-4 w-4 text-elegant-accent" />
            </div>
            <span className="text-sm font-medium text-gray-700">{phone}</span>
          </div>
          
          <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-elegant-accent/5 transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-elegant-accent/10">
              <Mail className="h-4 w-4 text-elegant-accent" />
            </div>
            <span className="text-sm font-medium text-gray-700">{email}</span>
          </div>
          
          <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-elegant-accent/5 transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-elegant-accent/10">
              <Globe className="h-4 w-4 text-elegant-accent" />
            </div>
            <span className="text-sm font-medium text-gray-700">{website}</span>
          </div>
        </div>

        {/* Professional Networks */}
        <div className="mt-6 border-t border-elegant-accent/20 pt-6">
          <h3 className="mb-3 text-center text-sm font-serif font-semibold text-gray-600 uppercase tracking-wide">
            Connect
          </h3>
          <div className="flex justify-center space-x-6">
            <a href={`https://${linkedin}`} className="group flex flex-col items-center">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-elegant-accent/10 group-hover:bg-elegant-accent/20 transition-colors">
                <Linkedin className="h-5 w-5 text-elegant-accent" />
              </div>
              <span className="text-xs font-medium text-gray-600">LinkedIn</span>
            </a>
            <a href={`https://twitter.com/${twitter.replace('@', '')}`} className="group flex flex-col items-center">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-elegant-accent/10 group-hover:bg-elegant-accent/20 transition-colors">
                <Twitter className="h-5 w-5 text-elegant-accent" />
              </div>
              <span className="text-xs font-medium text-gray-600">Twitter</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ElegantCard;
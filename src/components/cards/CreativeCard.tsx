import { Mail, Phone, Globe, Linkedin, Twitter, Heart, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CreativeCardProps {
  name?: string;
  title?: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
}

const CreativeCard = ({ 
  name = "Maya Chen",
  title = "UX/UI Designer", 
  company = "Creative Pixel Studio",
  phone = "+1 (555) 369-2580",
  email = "maya@creativepixel.com",
  website = "www.mayachen.design",
  linkedin = "linkedin.com/in/mayachen",
  twitter = "@mayauxui"
}: CreativeCardProps) => {
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
            <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30">
              <span className="text-2xl font-bold">
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
            <div className="rounded-2xl bg-white/15 backdrop-blur-sm p-3 border border-white/20">
              <div className="flex items-center justify-center space-x-2">
                <div className="rounded-full bg-white/20 p-1">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{phone}</span>
              </div>
            </div>
            
            <div className="rounded-2xl bg-white/15 backdrop-blur-sm p-3 border border-white/20">
              <div className="flex items-center justify-center space-x-2">
                <div className="rounded-full bg-white/20 p-1">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{email}</span>
              </div>
            </div>
            
            <div className="rounded-2xl bg-white/15 backdrop-blur-sm p-3 border border-white/20">
              <div className="flex items-center justify-center space-x-2">
                <div className="rounded-full bg-white/20 p-1">
                  <Globe className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{website}</span>
              </div>
            </div>
          </div>

          {/* Social Bubbles */}
          <div className="flex justify-center space-x-4">
            <a href={`https://${linkedin}`} className="group">
              <div className="rounded-full bg-white/20 backdrop-blur-sm p-3 border border-white/30 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </div>
            </a>
            <a href={`https://twitter.com/${twitter.replace('@', '')}`} className="group">
              <div className="rounded-full bg-white/20 backdrop-blur-sm p-3 border border-white/30 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                <Twitter className="h-5 w-5" />
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreativeCard;
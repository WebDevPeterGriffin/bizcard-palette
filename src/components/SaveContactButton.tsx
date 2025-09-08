import React from "react";
import { Download, Contact } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface SaveContactButtonProps {
  name: string;
  title?: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  socialLinks?: SocialLink[];
  headshotUrl?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function SaveContactButton({
  name,
  title,
  company,
  phone,
  email,
  website,
  socialLinks = [],
  headshotUrl,
  variant = "outline",
  size = "default",
  className,
}: SaveContactButtonProps) {
  
  const generateVCard = () => {
    let vcard = "BEGIN:VCARD\n";
    vcard += "VERSION:3.0\n";
    
    // Name
    vcard += `FN:${name}\n`;
    vcard += `N:${name.split(' ').reverse().join(';')}\n`;
    
    // Title and Organization
    if (title) vcard += `TITLE:${title}\n`;
    if (company) vcard += `ORG:${company}\n`;
    
    // Contact information
    if (phone) vcard += `TEL:${phone}\n`;
    if (email) vcard += `EMAIL:${email}\n`;
    if (website) vcard += `URL:${website}\n`;
    
    // Social media links
    socialLinks.forEach(social => {
      vcard += `URL:${social.url}\n`;
    });
    
    // Photo (if available)
    if (headshotUrl) {
      vcard += `PHOTO:${headshotUrl}\n`;
    }
    
    vcard += "END:VCARD";
    
    return vcard;
  };

  const handleSaveContact = () => {
    try {
      const vCardData = generateVCard();
      const blob = new Blob([vCardData], { type: 'text/vcard' });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name.replace(/\s+/g, '_')}_contact.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Contact saved!",
        description: `${name}'s contact information has been downloaded to your device.`,
      });
    } catch (error) {
      console.error('Error generating vCard:', error);
      toast({
        title: "Save failed",
        description: "There was an error saving the contact. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSaveContact}
      className={className}
    >
      <Download className="h-4 w-4 mr-2" />
      Save Contact
    </Button>
  );
}
import React from "react";
import { CalendarPlus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "./BookingDialog";
import { SaveContactButton } from "./SaveContactButton";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface ContactActionsProps {
  cardId: string;
  name: string;
  title?: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  socialLinks?: SocialLink[];
  headshotUrl?: string;
  bookingEnabled?: boolean;
  bookingInstructions?: string;
  className?: string;
  style?: 'minimal' | 'bold' | 'elegant' | 'creative' | 'neon' | 'floating' | 'liquid' | 'cosmic';
}

export function ContactActions({
  cardId,
  name,
  title,
  company,
  phone,
  email,
  website,
  socialLinks = [],
  headshotUrl,
  bookingEnabled = false,
  bookingInstructions,
  className,
  style = 'minimal',
}: ContactActionsProps) {
  
  const getButtonClasses = () => {
    switch (style) {
      case 'bold':
        return {
          save: "bg-white/10 text-white border-white/30 hover:bg-white/20",
          book: "bg-bold-accent text-bold-accent-foreground hover:bg-bold-accent/90"
        };
      case 'elegant':
        return {
          save: "border-elegant-accent/30 text-elegant-accent hover:bg-elegant-accent/10",
          book: "bg-elegant-accent text-white hover:bg-elegant-accent/90"
        };
      case 'creative':
        return {
          save: "bg-white/10 text-white border-white/30 hover:bg-white/20",
          book: "bg-white text-creative-accent hover:bg-white/90"
        };
      case 'neon':
        return {
          save: "bg-white/10 text-white border-cyan-500/50 hover:bg-white/20",
          book: "bg-cyan-500 text-black hover:bg-cyan-400"
        };
      case 'floating':
        return {
          save: "border-blue-200 text-blue-700 hover:bg-blue-50",
          book: "bg-blue-500 text-white hover:bg-blue-600"
        };
      case 'liquid':
        return {
          save: "bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm",
          book: "bg-white/20 text-white border-white/40 hover:bg-white/30 backdrop-blur-sm"
        };
      case 'cosmic':
        return {
          save: "bg-white/10 text-white border-white/30 hover:bg-white/20",
          book: "bg-blue-500 text-white hover:bg-blue-400"
        };
      default: // minimal
        return {
          save: "border-minimal-accent/30 text-minimal-accent hover:bg-minimal-accent/10",
          book: "bg-minimal-accent text-white hover:bg-minimal-accent/90"
        };
    }
  };

  const buttonClasses = getButtonClasses();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <SaveContactButton
        name={name}
        title={title}
        company={company}
        phone={phone}
        email={email}
        website={website}
        socialLinks={socialLinks}
        headshotUrl={headshotUrl}
        variant="outline"
        className={`w-full ${buttonClasses.save}`}
      />
      
      {bookingEnabled && (
        <BookingDialog
          cardId={cardId}
          ownerName={name}
          instructions={bookingInstructions}
        >
          <Button className={`w-full ${buttonClasses.book}`}>
            <CalendarPlus className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
        </BookingDialog>
      )}
    </div>
  );
}
"use client";
import React from "react";
import { CalendarPlus, Download } from "lucide-react";
import { BookingDialog } from "./BookingDialog";
import { toast } from "@/hooks/use-toast";
import { logger } from '@/lib/logger';
import { CardButton } from "@/components/cards/shared-ui/CardButton";

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
  phones?: string[];
  emails?: string[];
  website?: string;
  socialLinks?: SocialLink[];
  headshotUrl?: string;
  bookingEnabled?: boolean;
  bookingInstructions?: string;
  className?: string;
  style?: string;
  isDark?: boolean;
}

export function ContactActions({
  cardId,
  name,
  title,
  company,
  phones = [],
  emails = [],
  website,
  socialLinks = [],
  headshotUrl,
  bookingEnabled = false,
  bookingInstructions,
  className,
  style = 'minimal',
  isDark = true,
}: ContactActionsProps) {

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
    phones.forEach(phone => {
      if (phone) vcard += `TEL:${phone}\n`;
    });

    emails.forEach(email => {
      if (email) vcard += `EMAIL:${email}\n`;
    });

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
      logger.error('Error generating vCard:', error);
      toast({
        title: "Save failed",
        description: "There was an error saving the contact. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <CardButton
        onClick={handleSaveContact}
        variant="save"
        isDark={isDark}
        icon={<Download className="h-4 w-4" />}
        className="w-full"
      >
        Save Contact
      </CardButton>

      {bookingEnabled && (
        <BookingDialog
          cardId={cardId}
          ownerName={name}
          instructions={bookingInstructions}
        >
          <CardButton
            variant="book"
            isDark={isDark}
            icon={<CalendarPlus className="h-4 w-4" />}
            className="w-full"
          >
            Book Appointment
          </CardButton>
        </BookingDialog>
      )}
    </div>
  );
}
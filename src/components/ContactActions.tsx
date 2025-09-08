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
}: ContactActionsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
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
        className="flex-1"
      />
      
      {bookingEnabled && (
        <BookingDialog
          cardId={cardId}
          ownerName={name}
          instructions={bookingInstructions}
        >
          <Button variant="default" className="flex-1">
            <CalendarPlus className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
        </BookingDialog>
      )}
    </div>
  );
}
import React from "react";
import { CalendarPlus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "./BookingDialog";
import { SaveContactButton } from "./SaveContactButton";
import { CARD_META, type CardStyleId } from "@/components/cards/registry";

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
  style?: CardStyleId;
}

export function ContactActions({
  cardId,
  name,
  title,
  company,
  phones,
  emails,
  website,
  socialLinks = [],
  headshotUrl,
  bookingEnabled = false,
  bookingInstructions,
  className,
  style = 'minimal',
}: ContactActionsProps) {

  // Use registry as single source of truth for button styles
  const styleConfig = CARD_META[style] || CARD_META.minimal;
  const buttonClasses = styleConfig.buttonClasses;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <SaveContactButton
        name={name}
        title={title}
        company={company}
        phones={phones}
        emails={emails}
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
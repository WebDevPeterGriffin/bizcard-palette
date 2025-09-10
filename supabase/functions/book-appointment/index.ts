import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";
import { corsHeaders } from "../_shared/cors.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const RESEND_FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL") ?? "MildTech Studios <onboarding@resend.dev>";

interface BookingRequest {
  card_id: string;
  visitor_name: string;
  visitor_email: string;
  visitor_phone?: string;
  visitor_company?: string;
  appointment_date: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingRequest = await req.json();
    console.log("Booking request received:", bookingData);

    // Validate required fields
    if (!bookingData.card_id || !bookingData.visitor_name || !bookingData.visitor_email || !bookingData.appointment_date) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate appointment date is in the future
    const appointmentDate = new Date(bookingData.appointment_date);
    if (appointmentDate <= new Date()) {
      return new Response(
        JSON.stringify({ error: "Appointment date must be in the future" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get card information and check if booking is enabled
    const { data: card, error: cardError } = await supabase
      .from("cards")
      .select("*")
      .eq("id", bookingData.card_id)
      .single();

    if (cardError || !card) {
      console.error("Card not found:", cardError);
      return new Response(
        JSON.stringify({ error: "Card not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!card.booking_enabled) {
      return new Response(
        JSON.stringify({ error: "Booking is not enabled for this card" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert appointment into database
    const { data: appointment, error: insertError } = await supabase
      .from("appointments")
      .insert({
        card_id: bookingData.card_id,
        visitor_name: bookingData.visitor_name,
        visitor_email: bookingData.visitor_email,
        visitor_phone: bookingData.visitor_phone,
        visitor_company: bookingData.visitor_company,
        appointment_date: bookingData.appointment_date,
        message: bookingData.message,
        status: "pending"
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting appointment:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create appointment" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Appointment created:", appointment);

    // Generate calendar invite (.ics) content
    const icsContent = generateICS({
      summary: `Appointment with ${card.full_name}`,
      description: bookingData.message || "Scheduled appointment",
      startDate: appointmentDate,
      endDate: new Date(appointmentDate.getTime() + 60 * 60 * 1000), // 1 hour duration
      organizer: card.email || "",
      attendee: bookingData.visitor_email,
    });

    // Send confirmation email to visitor (simplified without attachments for now)
    try {
      await sendEmailSimple({
        to: bookingData.visitor_email,
        subject: `Appointment Confirmation with ${card.full_name}`,
        text: `
Dear ${bookingData.visitor_name},

Your appointment with ${card.full_name} has been successfully booked.

Appointment Details:
- Date: ${appointmentDate.toLocaleDateString()}
- Time: ${appointmentDate.toLocaleTimeString()}
${card.company ? `- Company: ${card.company}` : ""}
${bookingData.message ? `- Message: ${bookingData.message}` : ""}

Contact Information:
${card.phone ? `- Phone: ${card.phone}` : ""}
${card.email ? `- Email: ${card.email}` : ""}
${card.website ? `- Website: ${card.website}` : ""}

If you need to reschedule or cancel, please contact ${card.full_name} directly.

Best regards,
${card.full_name}
        `,
      });
      console.log("Visitor confirmation email sent successfully");
    } catch (emailError) {
      console.error("Error sending visitor email:", emailError);
    }

    // Send notification email to card owner (if they have an email)
    if (card.email) {
      try {
        await sendEmailSimple({
          to: card.email,
          subject: `New Appointment Booking from ${bookingData.visitor_name}`,
          text: `
Hello ${card.full_name},

You have a new appointment booking from ${bookingData.visitor_name}.

Visitor Details:
- Name: ${bookingData.visitor_name}
- Email: ${bookingData.visitor_email}
${bookingData.visitor_phone ? `- Phone: ${bookingData.visitor_phone}` : ""}
${bookingData.visitor_company ? `- Company: ${bookingData.visitor_company}` : ""}

Appointment Details:
- Date: ${appointmentDate.toLocaleDateString()}
- Time: ${appointmentDate.toLocaleTimeString()}
${bookingData.message ? `- Message: ${bookingData.message}` : ""}

Please reach out to ${bookingData.visitor_name} to confirm the appointment details.

Best regards,
MildTech Studios
          `,
        });
        console.log("Owner notification email sent successfully");
      } catch (emailError) {
        console.error("Error sending owner email:", emailError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        appointment_id: appointment.id,
        message: "Appointment booked successfully"
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error: any) {
    console.error("Error in book-appointment function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

function generateICS(options: {
  summary: string;
  description: string;
  startDate: Date;
  endDate: Date;
  organizer?: string;
  attendee: string;
}): string {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Digital Business Card//Appointment//EN
BEGIN:VEVENT
UID:${crypto.randomUUID()}@appointments.app
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(options.startDate)}
DTEND:${formatDate(options.endDate)}
SUMMARY:${options.summary}
DESCRIPTION:${options.description}`;

  if (options.organizer) {
    ics += `\nORGANIZER:mailto:${options.organizer}`;
  }
  
  ics += `\nATTENDEE:mailto:${options.attendee}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

  return ics;
}

// Send email using Resend
async function sendEmailSimple(options: {
  to: string;
  subject: string;
  text: string;
}): Promise<void> {
  const { to, subject, text } = options;

  try {
    const { data, error: sendError } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [to],
      subject: subject,
      html: text.replace(/\n/g, '<br>'),
      text: text,
    });

    if (sendError) {
      console.error("Resend send error:", sendError);
      throw new Error(sendError.message ?? "Failed to send email");
    }

    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

serve(handler);
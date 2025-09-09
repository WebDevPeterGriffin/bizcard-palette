import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// Gmail SMTP configuration
const GMAIL_EMAIL = Deno.env.get("GMAIL_EMAIL");
const GMAIL_APP_PASSWORD = Deno.env.get("GMAIL_APP_PASSWORD");

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

    // Send confirmation email to visitor
    try {
      await sendGmailSMTP({
        to: bookingData.visitor_email,
        subject: `Appointment Confirmation with ${card.full_name}`,
        html: `
          <h1>Appointment Confirmed!</h1>
          <p>Dear ${bookingData.visitor_name},</p>
          <p>Your appointment with <strong>${card.full_name}</strong> has been successfully booked.</p>
          
          <h2>Appointment Details:</h2>
          <ul>
            <li><strong>Date:</strong> ${appointmentDate.toLocaleDateString()}</li>
            <li><strong>Time:</strong> ${appointmentDate.toLocaleTimeString()}</li>
            ${card.company ? `<li><strong>Company:</strong> ${card.company}</li>` : ""}
            ${bookingData.message ? `<li><strong>Message:</strong> ${bookingData.message}</li>` : ""}
          </ul>
          
          <h2>Contact Information:</h2>
          <ul>
            ${card.phone ? `<li><strong>Phone:</strong> ${card.phone}</li>` : ""}
            ${card.email ? `<li><strong>Email:</strong> ${card.email}</li>` : ""}
            ${card.website ? `<li><strong>Website:</strong> ${card.website}</li>` : ""}
          </ul>
          
          <p>Please save this appointment to your calendar using the attached .ics file.</p>
          <p>If you need to reschedule or cancel, please contact ${card.full_name} directly.</p>
          
          <p>Best regards,<br>${card.full_name}</p>
        `,
        attachments: [
          {
            filename: "appointment.ics",
            content: icsContent,
          },
        ],
      });
    } catch (emailError) {
      console.error("Error sending visitor email:", emailError);
    }

    // Send notification email to card owner (if they have an email)
    if (card.email) {
      try {
        await sendGmailSMTP({
          to: card.email,
          subject: `New Appointment Booking from ${bookingData.visitor_name}`,
          html: `
            <h1>New Appointment Booking</h1>
            <p>Hello ${card.full_name},</p>
            <p>You have a new appointment booking from <strong>${bookingData.visitor_name}</strong>.</p>
            
            <h2>Visitor Details:</h2>
            <ul>
              <li><strong>Name:</strong> ${bookingData.visitor_name}</li>
              <li><strong>Email:</strong> ${bookingData.visitor_email}</li>
              ${bookingData.visitor_phone ? `<li><strong>Phone:</strong> ${bookingData.visitor_phone}</li>` : ""}
              ${bookingData.visitor_company ? `<li><strong>Company:</strong> ${bookingData.visitor_company}</li>` : ""}
            </ul>
            
            <h2>Appointment Details:</h2>
            <ul>
              <li><strong>Date:</strong> ${appointmentDate.toLocaleDateString()}</li>
              <li><strong>Time:</strong> ${appointmentDate.toLocaleTimeString()}</li>
              ${bookingData.message ? `<li><strong>Message:</strong> ${bookingData.message}</li>` : ""}
            </ul>
            
            <p>Please reach out to ${bookingData.visitor_name} to confirm the appointment details.</p>
            
            <p>Best regards,<br>Your Digital Business Card System</p>
          `,
          attachments: [
            {
              filename: "appointment.ics",
              content: icsContent,
            },
          ],
        });
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

// Gmail SMTP email sending function
async function sendGmailSMTP(options: {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: string;
  }>;
}): Promise<void> {
  const { to, subject, html, attachments = [] } = options;

  // Create email message
  const boundary = "----=_NextPart_" + Math.random().toString(36);
  const fromEmail = GMAIL_EMAIL;
  
  let message = `From: ${fromEmail}\r\n`;
  message += `To: ${to}\r\n`;
  message += `Subject: ${subject}\r\n`;
  message += `MIME-Version: 1.0\r\n`;
  message += `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n`;
  
  // HTML body
  message += `--${boundary}\r\n`;
  message += `Content-Type: text/html; charset=UTF-8\r\n`;
  message += `Content-Transfer-Encoding: quoted-printable\r\n\r\n`;
  message += html + "\r\n\r\n";
  
  // Add attachments
  for (const attachment of attachments) {
    message += `--${boundary}\r\n`;
    message += `Content-Type: text/calendar; name="${attachment.filename}"\r\n`;
    message += `Content-Transfer-Encoding: base64\r\n`;
    message += `Content-Disposition: attachment; filename="${attachment.filename}"\r\n\r\n`;
    message += btoa(attachment.content) + "\r\n\r\n";
  }
  
  message += `--${boundary}--\r\n`;
  
  // Send via Gmail SMTP
  const conn = await Deno.connect({
    hostname: "smtp.gmail.com",
    port: 587,
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  try {
    // Start TLS connection
    await conn.write(encoder.encode("EHLO lovable.dev\r\n"));
    await readResponse(conn, decoder);
    
    await conn.write(encoder.encode("STARTTLS\r\n"));
    await readResponse(conn, decoder);
    
    const tlsConn = await Deno.startTls(conn, { hostname: "smtp.gmail.com" });
    
    // Authenticate
    await tlsConn.write(encoder.encode("EHLO lovable.dev\r\n"));
    await readResponse(tlsConn, decoder);
    
    await tlsConn.write(encoder.encode("AUTH LOGIN\r\n"));
    await readResponse(tlsConn, decoder);
    
    await tlsConn.write(encoder.encode(btoa(fromEmail!) + "\r\n"));
    await readResponse(tlsConn, decoder);
    
    await tlsConn.write(encoder.encode(btoa(GMAIL_APP_PASSWORD!) + "\r\n"));
    await readResponse(tlsConn, decoder);
    
    // Send email
    await tlsConn.write(encoder.encode(`MAIL FROM:<${fromEmail}>\r\n`));
    await readResponse(tlsConn, decoder);
    
    await tlsConn.write(encoder.encode(`RCPT TO:<${to}>\r\n`));
    await readResponse(tlsConn, decoder);
    
    await tlsConn.write(encoder.encode("DATA\r\n"));
    await readResponse(tlsConn, decoder);
    
    await tlsConn.write(encoder.encode(message + ".\r\n"));
    await readResponse(tlsConn, decoder);
    
    await tlsConn.write(encoder.encode("QUIT\r\n"));
    await readResponse(tlsConn, decoder);
    
    tlsConn.close();
  } catch (error) {
    conn.close();
    throw error;
  }
}

async function readResponse(conn: Deno.Conn, decoder: TextDecoder): Promise<string> {
  const buffer = new Uint8Array(1024);
  const bytesRead = await conn.read(buffer);
  if (bytesRead === null) throw new Error("Connection closed");
  return decoder.decode(buffer.subarray(0, bytesRead));
}

serve(handler);
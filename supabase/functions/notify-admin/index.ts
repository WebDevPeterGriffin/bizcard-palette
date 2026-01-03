import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { corsHeaders } from "../_shared/cors.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");
const DEFAULT_FROM = "MildTech Studios <onboarding@resend.dev>";
const envFrom = Deno.env.get("RESEND_FROM_EMAIL")?.trim();

function isValidFrom(from?: string | null): boolean {
    if (!from) return false;
    const simpleEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameEmail = /^.{1,100}\s<[^\s@]+@[^\s@]+\.[^\s@]+>$/;
    return simpleEmail.test(from) || nameEmail.test(from);
}

const RESEND_FROM_EMAIL = isValidFrom(envFrom) ? (envFrom as string) : DEFAULT_FROM;

interface NotificationRequest {
    type: 'contact' | 'waitlist' | 'request' | 'website_inquiry';
    data: any;
}

const handler = async (req: Request): Promise<Response> => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { type, data }: NotificationRequest = await req.json();
        console.log(`Received ${type} notification request:`, data);

        // Validate ADMIN_EMAIL only if we need it (i.e. not for website_inquiry which provides its own recipient)
        if (!ADMIN_EMAIL && type !== 'website_inquiry') {
            throw new Error("ADMIN_EMAIL secret is not set");
        }

        let subject = "";
        let html = "";
        let recipient = ADMIN_EMAIL;

        switch (type) {
            case 'contact':
                subject = `New Contact Message from ${data.name}`;
                html = `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `;
                break;
            case 'waitlist':
                subject = `New Waitlist Signup: ${data.email}`;
                html = `
          <h2>New Waitlist Signup</h2>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Interest:</strong> ${data.interest}</p>
        `;
                break;
            case 'request':
                subject = `New Card Request: ${data.full_name}`;
                html = `
          <h2>New Digital Card Request</h2>
          <p><strong>Name:</strong> ${data.full_name}</p>
          <p><strong>Email:</strong> ${data.emails[0]}</p>
          <p><strong>Style:</strong> ${data.style_id}</p>
          <p><strong>Slug:</strong> ${data.slug}</p>
          <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
          <p><strong>Role:</strong> ${data.role || 'N/A'}</p>
        `;
                break;
            case 'website_inquiry':
                if (!data.recipient_email) throw new Error("Recipient email is required for website_inquiry");
                recipient = data.recipient_email;
                subject = `New Website Inquiry from ${data.name}`;
                html = `
          <h2>New Website Inquiry</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
          <br/>
          <p>You can view this inquiry in your Dashboard.</p>
        `;
                break;
            default:
                throw new Error("Invalid notification type");
        }

        // Send email
        const { data: emailData, error: emailError } = await resend.emails.send({
            from: RESEND_FROM_EMAIL,
            to: recipient!, // recipient is guaranteed to be set by logic above
            subject: subject,
            html: html,
            reply_to: data.email // Set reply-to for convenience
        });

        if (emailError) {
            console.error("Error sending email:", emailError);
            throw new Error(emailError.message);
        }

        console.log("Email sent successfully:", emailData);

        return new Response(
            JSON.stringify({ success: true }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

    } catch (error: any) {
        console.error("Error in notify-admin function:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
};

serve(handler);

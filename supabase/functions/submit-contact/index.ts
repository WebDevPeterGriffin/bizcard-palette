import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";
import { corsHeaders } from "../_shared/cors.ts";

const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const VERIFY_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const resend = new Resend(RESEND_API_KEY);
const DEFAULT_FROM = "MildTech Studios <onboarding@resend.dev>";
const envFrom = Deno.env.get("RESEND_FROM_EMAIL")?.trim();

function isValidFrom(from?: string | null): boolean {
    if (!from) return false;
    const simpleEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameEmail = /^.{1,100}\s<[^\s@]+@[^\s@]+\.[^\s@]+>$/;
    return simpleEmail.test(from) || nameEmail.test(from);
}

const RESEND_FROM_EMAIL = isValidFrom(envFrom) ? (envFrom as string) : DEFAULT_FROM;

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { type = 'contact', data, token } = await req.json();

        // 1. Verify Turnstile Token
        if (!TURNSTILE_SECRET_KEY) {
            throw new Error("TURNSTILE_SECRET_KEY not set");
        }

        const formData = new FormData();
        formData.append('secret', TURNSTILE_SECRET_KEY);
        formData.append('response', token);

        const result = await fetch(VERIFY_ENDPOINT, {
            method: 'POST',
            body: formData,
        });

        const outcome = await result.json();
        if (!outcome.success) {
            return new Response(
                JSON.stringify({ error: "Captcha verification failed" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        // 2. Insert into Database & Send Email based on type
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        let subject = "";
        let html = "";
        let recipient = ADMIN_EMAIL;
        let replyTo = "";

        if (type === 'contact') {
            const { name, email, message } = data;
            const { error: insertError } = await supabase
                .from('contact_messages')
                .insert({ name, email, message });

            if (insertError) throw insertError;

            subject = `New Contact Message from ${name}`;
            html = `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `;
            replyTo = email;

        } else if (type === 'website_inquiry') {
            const { userId, name, email, message } = data;
            
            // Get user email to notify them
            const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId);
            if (userError || !userData.user.email) throw new Error("User not found");
            
            recipient = userData.user.email;

            const { error: insertError } = await supabase
                .from('website_inquiries')
                .insert({ user_id: userId, name, email, message });

            if (insertError) throw insertError;

            subject = `New Website Inquiry from ${name}`;
            html = `
                <h2>New Website Inquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <br/>
                <p>You can view this inquiry in your Dashboard.</p>
            `;
            replyTo = email;

        } else if (type === 'waitlist') {
            const { email, interest } = data;
            const { error: insertError } = await supabase
                .from('waitlist')
                .insert({ email, interest });

            if (insertError) {
                if (insertError.code === '23505') throw new Error("Already on waitlist");
                throw insertError;
            }

            subject = `New Waitlist Signup: ${email}`;
            html = `
                <h2>New Waitlist Signup</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Interest:</strong> ${interest}</p>
            `;
            replyTo = email;
        } else {
            throw new Error("Invalid submission type");
        }

        // 3. Send Email Notification
        if (recipient) {
            await resend.emails.send({
                from: RESEND_FROM_EMAIL,
                to: recipient,
                subject: subject,
                html: html,
                reply_to: replyTo
            });
        }

        return new Response(
            JSON.stringify({ success: true }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

    } catch (error: any) {
        console.error("Error in submit-contact function:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});

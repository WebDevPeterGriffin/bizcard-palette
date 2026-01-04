import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';
const VERIFY_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, token } = body;

        if (!token) {
            return NextResponse.json({ error: "Captcha token is missing" }, { status: 400 });
        }

        // Verify Turnstile token
        const formData = new FormData();
        formData.append('secret', TURNSTILE_SECRET_KEY);
        formData.append('response', token);

        const result = await fetch(VERIFY_ENDPOINT, {
            method: 'POST',
            body: formData,
        });

        const outcome = await result.json();

        if (!outcome.success) {
            return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
        }

        // Initialize Supabase client
        const supabase = await createClient();

        // Insert into Supabase
        const { error: insertError } = await supabase
            .from('contact_messages')
            .insert({ name, email, message });

        if (insertError) {
            console.error("Supabase insert error:", insertError);
            return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
        }

        // Notify admin
        const { error: notifyError } = await supabase.functions.invoke('notify-admin', {
            body: {
                type: 'contact',
                data: { name, email, message }
            }
        });

        if (notifyError) {
            console.error("Notify admin error:", notifyError);
            // We don't fail the request if notification fails, as the message is saved
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

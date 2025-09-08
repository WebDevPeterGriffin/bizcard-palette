import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const fromEmail = Deno.env.get('RESEND_FROM_EMAIL') || 'Admin Auth <onboarding@resend.dev>';

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    console.log(`Authentication code request received for: ${email}`);

    // Validate that it's the correct admin email
    if (email !== 'mildtechstudios@gmail.com') {
      console.log(`Unauthorized email attempt: ${email}`);
      return new Response(JSON.stringify({ error: 'Unauthorized email address' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate a 6-digit authentication code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration to 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    console.log(`Generated code: ${code} for ${email}, expires at: ${expiresAt}. Using sender: ${fromEmail}`);

    // Clean up expired codes first
    await supabase.rpc('cleanup_expired_admin_codes');

    // Store the code in the database
    const { error: insertError } = await supabase
      .from('admin_auth_codes')
      .insert({
        code,
        email,
        expires_at: expiresAt
      });

    if (insertError) {
      console.error('Error storing auth code:', insertError);
      throw new Error('Failed to generate authentication code');
    }

    console.log('Code stored successfully in database');

    // Send email using Resend
    try {
      console.log('Attempting to send email with Resend...');
      console.log('RESEND_API_KEY exists:', !!Deno.env.get("RESEND_API_KEY"));
      console.log('From email:', fromEmail);
      
      const emailResponse = await resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: "Admin Authentication Code",
        html: `
          <h1>Admin Authentication</h1>
          <p>Your authentication code is: <strong>${code}</strong></p>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        `,
      });

      console.log("Email sent successfully:", emailResponse);

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Authentication code sent to your email',
        emailId: emailResponse.data?.id,
        code
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (emailError: any) {
      console.error('Error sending email:', emailError);
      console.error('Email error details:', JSON.stringify(emailError, null, 2));
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Authentication code generated. Email delivery failed - using fallback.',
        code,
        emailError: emailError.message,
        hasApiKey: !!Deno.env.get("RESEND_API_KEY"),
        fromEmail
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error: any) {
    console.error('Error in send-admin-code function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);
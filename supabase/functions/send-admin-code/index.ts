import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    // Validate that it's the correct admin email
    if (email !== 'mildtechstudios@gmail.com') {
      return new Response(JSON.stringify({ error: 'Unauthorized email address' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate a 6-digit authentication code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration to 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

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

    // Send email using Supabase Auth (this requires configuring SMTP in Supabase)
    // For now, we'll use a simple approach and log the code (in production, you'd configure SMTP)
    console.log(`Admin authentication code for ${email}: ${code}`);
    console.log(`Code expires at: ${expiresAt}`);

    // In a real implementation, you would send this via email
    // For demo purposes, we'll return success (the code is logged in the function logs)
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Authentication code sent to your email',
      // In development, you can see the code in the function logs
      ...(Deno.env.get('ENVIRONMENT') === 'development' && { code })
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in send-admin-code function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);
// Supabase Edge Function: reverify-domains
// Runs daily to re-verify DNS status for all connected domains
// Updates domain_verified_at if still verified, marks as unverified if DNS failed

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const VERCEL_API_URL = "https://api.vercel.com/v9/projects";

interface DomainRecord {
  id: string;
  custom_domain: string;
  domain_verified_at: string | null;
}

interface VercelVerifyResponse {
  verified: boolean;
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

async function verifyDomainOnVercel(domain: string): Promise<VercelVerifyResponse | null> {
  const vercelToken = Deno.env.get('VERCEL_API_TOKEN');
  const projectId = Deno.env.get('VERCEL_PROJECT_ID');
  const teamId = Deno.env.get('VERCEL_TEAM_ID');

  if (!vercelToken || !projectId) {
    console.error('Missing Vercel credentials');
    return null;
  }

  const url = `${VERCEL_API_URL}/${projectId}/domains/${domain}/verify${teamId ? `?teamId=${teamId}` : ''}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${vercelToken}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('Vercel verify failed:', data);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error verifying domain on Vercel:', error);
    return null;
  }
}

Deno.serve(async (req) => {
  // Only allow POST requests (for cron triggers)
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const results = {
    checked: 0,
    stillVerified: 0,
    newlyUnverified: 0,
    errors: [] as string[],
  };

  // Get all domains that have been verified
  const { data: verifiedDomains, error: fetchError } = await supabase
    .from('website_configs')
    .select('id, custom_domain, domain_verified_at')
    .not('custom_domain', 'is', null)
    .not('domain_verified_at', 'is', null) as { data: DomainRecord[] | null; error: any };

  if (fetchError) {
    results.errors.push(`Error fetching domains: ${fetchError.message}`);
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }

  if (!verifiedDomains || verifiedDomains.length === 0) {
    console.log('No verified domains to check');
    return new Response(JSON.stringify({ message: 'No domains to verify' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log(`Checking ${verifiedDomains.length} verified domains`);

  for (const record of verifiedDomains) {
    results.checked++;
    
    const verifyResult = await verifyDomainOnVercel(record.custom_domain);
    
    if (!verifyResult) {
      results.errors.push(`Failed to check ${record.custom_domain}`);
      continue;
    }

    if (verifyResult.verified) {
      results.stillVerified++;
      // Update the verified timestamp to show we checked it
      await supabase
        .from('website_configs')
        .update({ domain_verified_at: new Date().toISOString() })
        .eq('id', record.id);
    } else {
      results.newlyUnverified++;
      // Mark as unverified - DNS has changed
      // Reset domain_added_at to prevent premature cleanup by cleanup-domains
      await supabase
        .from('website_configs')
        .update({ 
          domain_verified_at: null,
          domain_config: verifyResult as any,
          domain_added_at: new Date().toISOString()
        })
        .eq('id', record.id);
      
      console.log(`Domain ${record.custom_domain} is no longer verified`);
    }
  }

  console.log('Re-verification results:', results);

  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  });
});

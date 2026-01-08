// Supabase Edge Function: cleanup-domains
// Runs on a schedule to remove unverified domains after 48 hours
// and clean up orphaned domains from Vercel when users are deleted

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const VERCEL_API_URL = "https://api.vercel.com/v9/projects";
const VERIFICATION_DEADLINE_HOURS = 48;

interface DomainRecord {
  id: string;
  custom_domain: string;
  domain_added_at: string;
  user_id: string;
}

async function removeDomainFromVercel(domain: string): Promise<boolean> {
  const vercelToken = Deno.env.get('VERCEL_API_TOKEN');
  const projectId = Deno.env.get('VERCEL_PROJECT_ID');
  const teamId = Deno.env.get('VERCEL_TEAM_ID');

  if (!vercelToken || !projectId) {
    console.error('Missing Vercel credentials');
    return false;
  }

  const url = `${VERCEL_API_URL}/${projectId}/domains/${domain}${teamId ? `?teamId=${teamId}` : ''}`;
  
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${vercelToken}`,
      },
    });

    if (response.ok || response.status === 404) {
      // 404 means domain doesn't exist, which is fine
      return true;
    }

    const data = await response.json();
    console.error('Failed to remove domain from Vercel:', data);
    return false;
  } catch (error) {
    console.error('Error removing domain from Vercel:', error);
    return false;
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
    unverifiedCleaned: 0,
    orphanedCleaned: 0,
    errors: [] as string[],
  };

  // 1. Find unverified domains older than 48 hours
  const deadlineCutoff = new Date(
    Date.now() - VERIFICATION_DEADLINE_HOURS * 60 * 60 * 1000
  ).toISOString();

  const { data: unverifiedDomains, error: unverifiedError } = await supabase
    .from('website_configs')
    .select('id, custom_domain, domain_added_at, user_id')
    .not('custom_domain', 'is', null)
    .is('domain_verified_at', null)
    .lt('domain_added_at', deadlineCutoff) as { data: DomainRecord[] | null; error: any };

  if (unverifiedError) {
    results.errors.push(`Error fetching unverified domains: ${unverifiedError.message}`);
  } else if (unverifiedDomains && unverifiedDomains.length > 0) {
    console.log(`Found ${unverifiedDomains.length} unverified domains to clean up`);

    for (const record of unverifiedDomains) {
      // Remove from Vercel
      const vercelRemoved = await removeDomainFromVercel(record.custom_domain);
      
      if (vercelRemoved) {
        // Clear domain from DB
        const { error: updateError } = await supabase
          .from('website_configs')
          .update({
            custom_domain: null,
            domain_config: null,
            domain_verification_token: null,
            domain_removed_at: new Date().toISOString(),
          })
          .eq('id', record.id);

        if (updateError) {
          results.errors.push(`Failed to clear domain ${record.custom_domain}: ${updateError.message}`);
        } else {
          results.unverifiedCleaned++;
          console.log(`Cleaned up unverified domain: ${record.custom_domain}`);
        }
      } else {
        results.errors.push(`Failed to remove ${record.custom_domain} from Vercel`);
      }
    }
  }

  // 2. Find domains for deleted users (orphaned)
  // These would be domains where the user_id no longer exists in auth.users
  // We can't directly query auth.users, so we rely on CASCADE delete
  // This is mainly for safety in case CASCADE failed

  // Check for domains where user doesn't exist
  const { data: allDomains } = await supabase
    .from('website_configs')
    .select('id, custom_domain, user_id')
    .not('custom_domain', 'is', null) as { data: DomainRecord[] | null };

  if (allDomains) {
    for (const record of allDomains) {
      // Check if user exists
      const { data: userData } = await supabase.auth.admin.getUserById(record.user_id);
      
      if (!userData?.user) {
        // User doesn't exist, clean up domain
        const vercelRemoved = await removeDomainFromVercel(record.custom_domain);
        
        if (vercelRemoved) {
          const { error: deleteError } = await supabase
            .from('website_configs')
            .delete()
            .eq('id', record.id);

          if (!deleteError) {
            results.orphanedCleaned++;
            console.log(`Cleaned up orphaned domain for deleted user: ${record.custom_domain}`);
          }
        }
      }
    }
  }

  console.log('Cleanup results:', results);

  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  });
});

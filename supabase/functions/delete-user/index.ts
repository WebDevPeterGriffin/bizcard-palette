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
    const { userId, action, scheduledDate } = await req.json();

    console.log(`User deletion request: action=${action}, userId=${userId}, scheduledDate=${scheduledDate}`);

    // Parameter validation is handled per action below

    // Handle different actions
    switch (action) {
      case 'delete_now':
        if (!userId) {
          return new Response(JSON.stringify({ error: 'User ID is required for delete_now' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        return await deleteUserNow(userId);
      
      case 'schedule_deletion':
        if (!userId || !scheduledDate) {
          return new Response(JSON.stringify({ error: 'User ID and scheduledDate are required for schedule_deletion' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        return await scheduleUserDeletion(userId, scheduledDate);
      
      case 'cancel_schedule':
        if (!userId) {
          return new Response(JSON.stringify({ error: 'User ID is required for cancel_schedule' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        return await cancelScheduledDeletion(userId);
      
      case 'process_scheduled':
        return await processScheduledDeletions();
      
      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

  } catch (error: any) {
    console.error('Error in delete-user function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

async function deleteUserNow(userId: string): Promise<Response> {
  try {
    // First, get the user's headshot URL
    const { data: userData, error: fetchError } = await supabase
      .from('cards')
      .select('id, headshot_url, slug')
      .eq('id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching user data:', fetchError);
      throw new Error('Failed to fetch user data');
    }

    console.log(`Deleting user: ${userData.slug}, headshot: ${userData.headshot_url}`);

    // Try to delete all headshots for this user's slug (robust)
    try {
      const pathsToRemove = new Set<string>();

      // If we have a URL, parse it and extract the path after '/headshots/'
      if (userData.headshot_url) {
        try {
          const url = new URL(userData.headshot_url);
          const path = url.pathname; // e.g. /storage/v1/object/public/headshots/slug/file.png
          const marker = '/headshots/';
          const idx = path.indexOf(marker);
          if (idx !== -1) {
            const relative = path.substring(idx + marker.length); // slug/file.png
            pathsToRemove.add(relative);
          }
        } catch (_) {
          // Fallback: simple split without URL()
          const clean = userData.headshot_url.split('?')[0];
          const parts = clean.split('/headshots/');
          if (parts.length === 2) pathsToRemove.add(parts[1]);
        }
      }

      // Also list every object in both possible folders (by slug and by id) and queue for removal
      const prefixes = Array.from(new Set([
        userData.slug ? `${userData.slug}/` : null,
        userData.id ? `${userData.id}/` : null,
      ].filter(Boolean) as string[]));

      for (const prefix of prefixes) {
        const limit = 100;
        let offset = 0;
        while (true) {
          const { data: list, error: listError } = await supabase.storage
            .from('headshots')
            .list(prefix, { limit, offset });

          if (listError) {
            console.error('Error listing headshots for prefix', prefix, listError);
            break; // continue with whatever we have
          }

          (list || []).forEach((obj: any) => {
            if (obj?.name) pathsToRemove.add(`${prefix}${obj.name}`);
          });

          if (!list || list.length < limit) break;
          offset += limit;
        }
      }

      if (pathsToRemove.size > 0) {
        console.log('Removing headshot files:', Array.from(pathsToRemove));
        const { error: storageError } = await supabase.storage
          .from('headshots')
          .remove(Array.from(pathsToRemove));

        if (storageError) {
          console.error('Error deleting headshots:', storageError);
        } else {
          console.log('Headshots deleted successfully');
        }
      } else {
        console.log('No headshot files found to remove for slug', userData.slug);
      }
    } catch (storageErr) {
      console.error('Error during headshots cleanup:', storageErr);
    }

    // Delete user record from database
    const { error: deleteError } = await supabase
      .from('cards')
      .delete()
      .eq('id', userId);

    if (deleteError) {
      console.error('Error deleting user record:', deleteError);
      throw new Error('Failed to delete user record');
    }

    console.log('User deleted successfully');

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'User deleted successfully' 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in deleteUserNow:', error);
    throw error;
  }
}

async function scheduleUserDeletion(userId: string, scheduledDate: string): Promise<Response> {
  try {
    const { error } = await supabase
      .from('cards')
      .update({ scheduled_deletion_at: scheduledDate })
      .eq('id', userId);

    if (error) {
      console.error('Error scheduling user deletion:', error);
      throw new Error('Failed to schedule user deletion');
    }

    console.log(`User deletion scheduled for: ${scheduledDate}`);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'User deletion scheduled successfully' 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in scheduleUserDeletion:', error);
    throw error;
  }
}

async function cancelScheduledDeletion(userId: string): Promise<Response> {
  try {
    const { error } = await supabase
      .from('cards')
      .update({ scheduled_deletion_at: null })
      .eq('id', userId);

    if (error) {
      console.error('Error cancelling scheduled deletion:', error);
      throw new Error('Failed to cancel scheduled deletion');
    }

    console.log('Scheduled deletion cancelled');

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Scheduled deletion cancelled successfully' 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in cancelScheduledDeletion:', error);
    throw error;
  }
}

async function processScheduledDeletions(): Promise<Response> {
  try {
    // Get all users scheduled for deletion that are due
    const nowIso = new Date().toISOString();
    const { data: scheduledUsersRaw, error: fetchError } = await supabase
      .from('cards')
      .select('id, headshot_url, slug, scheduled_deletion_at')
      .not('scheduled_deletion_at', 'is', null)
      .lte('scheduled_deletion_at', nowIso);

    if (fetchError) {
      console.error('Error fetching scheduled users:', fetchError);
      throw new Error('Failed to fetch scheduled users');
    }

    const scheduledUsers = scheduledUsersRaw ?? [];
    console.log(`Found ${scheduledUsers.length} users scheduled for deletion at/before ${nowIso}`);

    const deletedUsers: string[] = [];
    const errors: { userId: string; error: string }[] = [];

    for (const user of scheduledUsers) {
      try {
        // Delete all headshots for this slug (robust)
        try {
          const pathsToRemove = new Set<string>();

          if (user.headshot_url) {
            try {
              const url = new URL(user.headshot_url);
              const path = url.pathname;
              const marker = '/headshots/';
              const idx = path.indexOf(marker);
              if (idx !== -1) {
                const relative = path.substring(idx + marker.length);
                pathsToRemove.add(relative);
              }
            } catch (_) {
              const clean = user.headshot_url.split('?')[0];
              const parts = clean.split('/headshots/');
              if (parts.length === 2) pathsToRemove.add(parts[1]);
            }
          }

          // List all objects in both possible folders (by slug and by id) and queue for removal
          const prefixes = Array.from(new Set([
            user.slug ? `${user.slug}/` : null,
            user.id ? `${user.id}/` : null,
          ].filter(Boolean) as string[]));

          for (const prefix of prefixes) {
            const limit = 100;
            let offset = 0;
            while (true) {
              const { data: list, error: listError } = await supabase.storage
                .from('headshots')
                .list(prefix, { limit, offset });

              if (listError) {
                console.error('Error listing headshots for prefix', prefix, listError);
                break;
              }

              (list || []).forEach((obj: any) => {
                if (obj?.name) pathsToRemove.add(`${prefix}${obj.name}`);
              });

              if (!list || list.length < limit) break;
              offset += limit;
            }
          }

          if (pathsToRemove.size > 0) {
            console.log('Removing headshot files:', Array.from(pathsToRemove));
            const { error: storageError } = await supabase.storage
              .from('headshots')
              .remove(Array.from(pathsToRemove));
            if (storageError) console.error('Error deleting headshots:', storageError);
          }
        } catch (e) {
          console.error('Headshots cleanup error:', e);
        }

        // Delete user record
        const { error: deleteError } = await supabase
          .from('cards')
          .delete()
          .eq('id', user.id);

        if (deleteError) {
          throw deleteError;
        }

        deletedUsers.push(user.id);
        console.log(`Deleted scheduled user: ${user.slug}`);

      } catch (error) {
        console.error(`Error deleting user ${user.id}:`, error);
        errors.push({ userId: user.id, error: error.message });
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Processed ${deletedUsers.length} scheduled deletions`,
      deletedUsers,
      errors 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in processScheduledDeletions:', error);
    throw error;
  }
}

serve(handler);
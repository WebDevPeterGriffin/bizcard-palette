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

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle different actions
    switch (action) {
      case 'delete_now':
        return await deleteUserNow(userId);
      
      case 'schedule_deletion':
        return await scheduleUserDeletion(userId, scheduledDate);
      
      case 'cancel_schedule':
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
      .select('headshot_url, slug')
      .eq('id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching user data:', fetchError);
      throw new Error('Failed to fetch user data');
    }

    console.log(`Deleting user: ${userData.slug}, headshot: ${userData.headshot_url}`);

    // Delete headshot from storage if it exists
    if (userData.headshot_url) {
      try {
        // Extract the file path from the URL
        const urlParts = userData.headshot_url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const filePath = `${userData.slug}/${fileName}`;

        console.log(`Attempting to delete headshot: ${filePath}`);

        const { error: storageError } = await supabase.storage
          .from('headshots')
          .remove([filePath]);

        if (storageError) {
          console.error('Error deleting headshot:', storageError);
          // Don't throw here, continue with user deletion
        } else {
          console.log('Headshot deleted successfully');
        }
      } catch (storageErr) {
        console.error('Error processing headshot deletion:', storageErr);
        // Don't throw here, continue with user deletion
      }
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
    const { data: scheduledUsers, error: fetchError } = await supabase
      .from('cards')
      .select('id, headshot_url, slug, scheduled_deletion_at')
      .not('scheduled_deletion_at', 'is', null)
      .lte('scheduled_deletion_at', new Date().toISOString());

    if (fetchError) {
      console.error('Error fetching scheduled users:', fetchError);
      throw new Error('Failed to fetch scheduled users');
    }

    console.log(`Found ${scheduledUsers.length} users scheduled for deletion`);

    const deletedUsers = [];
    const errors = [];

    for (const user of scheduledUsers) {
      try {
        // Delete headshot if exists
        if (user.headshot_url) {
          const urlParts = user.headshot_url.split('/');
          const fileName = urlParts[urlParts.length - 1];
          const filePath = `${user.slug}/${fileName}`;

          await supabase.storage
            .from('headshots')
            .remove([filePath]);
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
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@/integrations/supabase/types';

export async function PATCH(request: Request) {
    try {
        const cookieStore = await cookies();
        
        // 1. Verify Admin Authentication
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        
        const supabase = createServerClient<Database>(
            supabaseUrl,
            supabaseAnonKey,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            );
                        } catch {
                            // Cookie setting in Server Component may fail
                        }
                    },
                },
            }
        );

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if user is admin
        const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .eq('role', 'admin')
            .single();

        if (!roles) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // 2. Initialize Admin Client (Service Role)
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!serviceRoleKey) {
            console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const adminClient = createClient<Database>(
            supabaseUrl,
            serviceRoleKey,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        );

        // 3. Parse Request
        const body = await request.json();
        const { cardId, action, scheduledDate } = body;

        if (!cardId || !action) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 4. Perform Action
        if (action === 'schedule_deletion') {
            if (!scheduledDate) {
                return NextResponse.json({ error: 'Missing scheduled date' }, { status: 400 });
            }

            const { error } = await adminClient
                .from('cards')
                .update({ scheduled_deletion_at: scheduledDate })
                .eq('id', cardId);

            if (error) throw error;

            return NextResponse.json({ message: 'Deletion scheduled' });

        } else if (action === 'cancel_schedule') {
            const { error } = await adminClient
                .from('cards')
                .update({ scheduled_deletion_at: null })
                .eq('id', cardId);

            if (error) throw error;

            return NextResponse.json({ message: 'Schedule cancelled' });
        } else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

    } catch (error) {
        console.error('Admin Cards API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

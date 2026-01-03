import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@/integrations/supabase/types';

export async function GET(request: Request) {
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

        // 3. Fetch All Users
        const { data: { users }, error: usersError } = await adminClient.auth.admin.listUsers();

        if (usersError) {
            throw usersError;
        }

        // 4. Fetch Card Details
        // Fetch all cards to group by user
        const { data: cards, error: cardsError } = await adminClient
            .from('cards')
            .select('id, slug, full_name, created_at, scheduled_deletion_at, user_id') as any;

        if (cardsError) {
            throw cardsError;
        }

        // Group cards by user
        const cardsByUser: Record<string, any[]> = {};
        cards?.forEach((card: any) => {
            if (card.user_id) {
                if (!cardsByUser[card.user_id]) {
                    cardsByUser[card.user_id] = [];
                }
                cardsByUser[card.user_id].push({
                    id: card.id,
                    slug: card.slug,
                    full_name: card.full_name,
                    created_at: card.created_at,
                    scheduled_deletion_at: card.scheduled_deletion_at
                });
            }
        });

        // 5. Merge Data
        const userData = users.map(u => ({
            id: u.id,
            email: u.email,
            created_at: u.created_at,
            last_sign_in_at: u.last_sign_in_at,
            card_count: cardsByUser[u.id]?.length || 0,
            cards: cardsByUser[u.id] || [],
            scheduled_deletion_at: u.user_metadata?.scheduled_deletion_at || null
        }));

        return NextResponse.json(userData);

    } catch (error) {
        console.error('Admin API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

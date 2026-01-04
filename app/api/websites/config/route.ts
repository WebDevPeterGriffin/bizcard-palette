import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
        .from('website_configs')
        .select('*')
        .eq('user_id', user.id)
        .eq('template', 'realtor')
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
        config: data?.config || null,
        slug: data?.slug || null 
    });
}

export async function POST(request: NextRequest) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { config, slug } = body;

    if (!config) {
        return NextResponse.json({ error: 'Config is required' }, { status: 400 });
    }

    // Check for slug uniqueness if slug is provided
    if (slug) {
        // 1. Check if slug exists in cards
        const { data: existingCard } = await supabase
            .from('cards')
            .select('id')
            .eq('slug', slug)
            .maybeSingle();

        if (existingCard) {
            return NextResponse.json({ error: 'This URL is already taken by a business card. Please choose another.' }, { status: 409 });
        }

        // 2. Check if slug exists in website_configs (excluding current user's config)
        const { data: existingWebsite } = await supabase
            .from('website_configs')
            .select('id')
            .eq('slug', slug)
            .neq('user_id', user.id) // Allow updating own slug
            .maybeSingle();

        if (existingWebsite) {
            return NextResponse.json({ error: 'This URL is already taken by another website. Please choose another.' }, { status: 409 });
        }
    }

    // Upsert: insert or update
    const { data, error } = await supabase
        .from('website_configs')
        .upsert(
            {
                user_id: user.id,
                template: 'realtor',
                config: config,
                ...(slug && { slug }), // Only update slug if provided
            },
            { onConflict: 'user_id,template' }
        )
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
}

export async function DELETE() {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete config
    const { error: deleteError } = await supabase
        .from('website_configs')
        .delete()
        .eq('user_id', user.id)
        .eq('template', 'realtor');

    if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    // Also delete storage files
    const { data: files } = await supabase.storage
        .from('website-assets')
        .list(user.id);

    if (files && files.length > 0) {
        const filePaths = files.map(file => `${user.id}/${file.name}`);
        await supabase.storage.from('website-assets').remove(filePaths);
    }

    return NextResponse.json({ success: true });
}

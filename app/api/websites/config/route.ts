import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { RESERVED_SLUGS } from '@/lib/constants';

export async function GET(request: NextRequest) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const templateParam = searchParams.get('template');

    // Fetch all configs for the user
    const { data, error } = await supabase
        .from('website_configs')
        .select('*')
        .eq('user_id', user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let activeConfig;
    if (templateParam) {
        activeConfig = data?.find(c => c.template === templateParam);
    } else {
        // Prioritize the config with a slug (published), otherwise default to realtor or the first one
        activeConfig = data?.find(c => c.slug) || data?.find(c => c.template === 'realtor') || data?.[0];
    }

    return NextResponse.json({ 
        config: activeConfig?.config || null,
        slug: activeConfig?.slug || null,
        template: activeConfig?.template || templateParam || 'realtor'
    });
}

export async function POST(request: NextRequest) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { config, slug, template = 'realtor' } = body;

    if (!config) {
        return NextResponse.json({ error: 'Config is required' }, { status: 400 });
    }

    // Check reserved slugs
    if (slug && RESERVED_SLUGS.includes(slug.toLowerCase())) {
        return NextResponse.json(
            { error: 'This website name is reserved. Please choose another one.' },
            { status: 400 }
        );
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

        // 3. Ensure no OTHER template of THIS user has this slug (to prevent collision)
        // If I'm saving 'creative' with slug 'foo', and I have 'realtor' with slug 'foo', I must clear 'realtor' slug.
        await supabase
            .from('website_configs')
            .update({ slug: null })
            .eq('user_id', user.id)
            .eq('slug', slug)
            .neq('template', template);
    }

    // Upsert: insert or update
    const { data, error } = await supabase
        .from('website_configs')
        .upsert(
            {
                user_id: user.id,
                template: template,
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

export async function DELETE(request: NextRequest) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const templateParam = searchParams.get('template') || 'realtor';

    // Delete config
    const { error: deleteError } = await supabase
        .from('website_configs')
        .delete()
        .eq('user_id', user.id)
        .eq('template', templateParam);

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

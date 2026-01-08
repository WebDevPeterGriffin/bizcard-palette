import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { 
    addDomainToVercel, 
    removeDomainFromVercel, 
    getDomainResponse, 
    getConfigResponse, 
    verifyDomain 
} from '@/lib/vercel';

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { domain, template } = await request.json();

    if (!domain) {
        return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    // 1. Add to Vercel
    try {
        const vercelResponse = await addDomainToVercel(domain);

        // 2. Update Supabase
        const { error: dbError } = await supabase
            .from('website_configs')
            .update({ 
                custom_domain: domain,
                domain_config: vercelResponse as any
            } as any)
            .eq('user_id', user.id)
            .eq('template', template || 'realtor'); // Default to realtor if not specified

        if (dbError) {
            // Rollback Vercel addition if DB fails
            await removeDomainFromVercel(domain);
            return NextResponse.json({ error: dbError.message }, { status: 500 });
        }

        return NextResponse.json(vercelResponse);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
        return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    try {
        // Always call verify to force Vercel to re-check DNS
        const verifyResponse = await verifyDomain(domain);
        const configResponse = await getConfigResponse(domain);

        // Update DB with latest verification status
        await supabase
            .from('website_configs')
            .update({ 
                domain_config: verifyResponse as any
            } as any)
            .eq('custom_domain', domain);
        
        return NextResponse.json({
            domain: verifyResponse,
            config: configResponse
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');
    const template = searchParams.get('template');

    if (!domain) {
        return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    try {
        // 1. Remove from Vercel
        await removeDomainFromVercel(domain);

        // 2. Remove from Supabase
        const { error: dbError } = await supabase
            .from('website_configs')
            .update({ 
                custom_domain: null,
                domain_config: null
            } as any)
            .eq('user_id', user.id)
            .eq('custom_domain', domain);

        if (dbError) {
            return NextResponse.json({ error: dbError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { 
    addDomainToVercel, 
    removeDomainFromVercel, 
    getConfigResponse, 
    verifyDomain 
} from '@/lib/vercel';
import { 
    validateDomainFormat, 
    normalizeDomain,
    generateVerificationToken,
    getVerificationRecordName
} from '@/lib/domainValidation';
import { invalidateDomain } from '@/lib/domainCache';
import { checkRateLimit, consumeRateLimit, formatRateLimitError } from '@/lib/rateLimit';

// Cooldown period after domain removal (24 hours in milliseconds)
const DOMAIN_REMOVAL_COOLDOWN_MS = 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { domain, template } = await request.json();

    // Rate limit check
    const rateCheck = checkRateLimit(user.id, 'domain:add');
    if (!rateCheck.allowed) {
        return NextResponse.json({
            error: formatRateLimitError('domain:add', rateCheck.resetAt)
        }, { status: 429 });
    }

    // 1. Validate domain format
    const validation = validateDomainFormat(domain);
    if (!validation.valid) {
        return NextResponse.json({ error: validation.message }, { status: 400 });
    }

    const normalizedDomain = validation.normalized!;

    // 2. Check if domain already exists in DB (any user)
    const { data: existingDomain } = await supabase
        .from('website_configs')
        .select('id, user_id')
        .eq('custom_domain', normalizedDomain)
        .maybeSingle();

    if (existingDomain) {
        if (existingDomain.user_id === user.id) {
            return NextResponse.json({ 
                error: 'This domain is already connected to your account' 
            }, { status: 409 });
        }
        return NextResponse.json({ 
            error: 'This domain is already connected to another account' 
        }, { status: 409 });
    }

    // 3. Check for cooldown (domain recently removed)
    const cooldownCutoff = new Date(Date.now() - DOMAIN_REMOVAL_COOLDOWN_MS).toISOString();
    const { data: recentRemoval } = await supabase
        .from('website_configs')
        .select('domain_removed_at')
        .eq('custom_domain', normalizedDomain)
        .gt('domain_removed_at', cooldownCutoff)
        .maybeSingle();

    if (recentRemoval) {
        return NextResponse.json({ 
            error: 'This domain was recently disconnected. Please wait 24 hours before reconnecting.' 
        }, { status: 429 });
    }

    // 4. Generate verification token for TXT record
    const verificationToken = generateVerificationToken();
    const verificationRecord = getVerificationRecordName(normalizedDomain);

    try {
        // 5. Add to Vercel
        const vercelResponse = await addDomainToVercel(normalizedDomain);

        // 6. Update Supabase with domain info and verification token
        const { error: dbError } = await supabase
            .from('website_configs')
            .update({ 
                custom_domain: normalizedDomain,
                domain_config: JSON.parse(JSON.stringify(vercelResponse)),
                domain_added_at: new Date().toISOString(),
                domain_verification_token: verificationToken,
                domain_verified_at: null // Reset verification status
            })
            .eq('user_id', user.id)
            .eq('template', template || 'realtor');

        if (dbError) {
            // Rollback Vercel addition if DB fails
            await removeDomainFromVercel(normalizedDomain);
            console.error('[Domain API] DB error:', dbError.message);
            return NextResponse.json({ error: 'Failed to save domain configuration. Please try again.' }, { status: 500 });
        }

        // Consume rate limit token on success
        consumeRateLimit(user.id, 'domain:add');

        return NextResponse.json({
            ...vercelResponse,
            verificationToken,
            verificationRecord,
            message: 'Domain added. Please configure your DNS records to verify ownership.'
        });
    } catch (error: any) {
        // Check for common Vercel errors and provide friendly messages
        if (error.message?.includes('already exists')) {
            return NextResponse.json({ 
                error: 'This domain is already registered with our hosting provider. Please contact support.' 
            }, { status: 409 });
        }
        console.error('[Domain API] Add domain error:', error.message);
        return NextResponse.json({ error: 'Failed to add domain. Please try again.' }, { status: 500 });
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

    // Validate format
    const validation = validateDomainFormat(domain);
    if (!validation.valid) {
        return NextResponse.json({ error: validation.message }, { status: 400 });
    }

    try {
        // Always call verify to force Vercel to re-check DNS
        const verifyResponse = await verifyDomain(domain);
        const configResponse = await getConfigResponse(domain);

        // Prepare update data
        const updateData: Record<string, any> = {
            domain_config: JSON.parse(JSON.stringify(verifyResponse))
        };

        // If domain is now verified, record the timestamp and clear token
        if (verifyResponse.verified) {
            updateData.domain_verified_at = new Date().toISOString();
            updateData.domain_verification_token = null;
        }

        // Update DB with latest verification status
        await supabase
            .from('website_configs')
            .update(updateData)
            .eq('custom_domain', domain);

        // Invalidate cache since verification status may have changed
        invalidateDomain(domain);
        
        return NextResponse.json({
            domain: verifyResponse,
            config: configResponse
        });
    } catch (error: any) {
        console.error('[Domain API] Verify error:', error.message);
        return NextResponse.json({ error: 'Failed to verify domain. Please try again.' }, { status: 500 });
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

    if (!domain) {
        return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    // Rate limit check for domain removal
    const rateCheck = checkRateLimit(user.id, 'domain:remove');
    if (!rateCheck.allowed) {
        return NextResponse.json({
            error: formatRateLimitError('domain:remove', rateCheck.resetAt)
        }, { status: 429 });
    }

    // Verify ownership before deletion
    const { data: domainRecord } = await supabase
        .from('website_configs')
        .select('id')
        .eq('user_id', user.id)
        .eq('custom_domain', domain)
        .maybeSingle();

    if (!domainRecord) {
        return NextResponse.json({ 
            error: 'Domain not found or you do not have permission to remove it' 
        }, { status: 404 });
    }

    try {
        // 1. Remove from Vercel
        await removeDomainFromVercel(domain);

        // 2. Update Supabase - set cooldown timestamp
        const { error: dbError } = await supabase
            .from('website_configs')
            .update({ 
                custom_domain: null,
                domain_config: null,
                domain_verification_token: null,
                domain_verified_at: null,
                domain_removed_at: new Date().toISOString()
            })
            .eq('user_id', user.id)
            .eq('id', domainRecord.id);

        if (dbError) {
            console.error('[Domain API] DB error on removal:', dbError.message);
            return NextResponse.json({ error: 'Failed to remove domain. Please try again.' }, { status: 500 });
        }

        // Invalidate cache for removed domain
        invalidateDomain(domain);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        // If Vercel removal fails, still try to clean up DB
        // Domain might have been removed manually from Vercel
        if (error.message?.includes('not found')) {
            const { error: dbError } = await supabase
                .from('website_configs')
                .update({ 
                    custom_domain: null,
                    domain_config: null,
                    domain_verification_token: null,
                    domain_verified_at: null,
                    domain_removed_at: new Date().toISOString()
                })
                .eq('user_id', user.id)
                .eq('id', domainRecord.id);

            if (!dbError) {
                return NextResponse.json({ success: true });
            }
        }
        console.error('[Domain API] Remove domain error:', error.message);
        return NextResponse.json({ error: 'Failed to remove domain. Please try again.' }, { status: 500 });
    }
}


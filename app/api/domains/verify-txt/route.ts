import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { 
    validateDomainFormat,
    normalizeDomain,
    generateVerificationToken,
    getVerificationRecordName
} from '@/lib/domainValidation';
import dns from 'dns';
import { promisify } from 'util';

const resolveTxt = promisify(dns.resolveTxt);

/**
 * GET /api/domains/verify-txt?domain=example.com
 * Returns the TXT record that should be added for domain ownership verification
 */
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

    // Validate domain format
    const validation = validateDomainFormat(domain);
    if (!validation.valid) {
        return NextResponse.json({ error: validation.message }, { status: 400 });
    }

    const normalized = validation.normalized!;

    // Check if domain has a pending verification
    const { data: config } = await supabase
        .from('website_configs')
        .select('domain_verification_token, domain_verified_at')
        .eq('user_id', user.id)
        .eq('custom_domain', normalized)
        .maybeSingle();

    if (!config) {
        return NextResponse.json({ 
            error: 'Domain not found. Please add the domain first.' 
        }, { status: 404 });
    }

    // If already verified, return that status
    if (config.domain_verified_at) {
        return NextResponse.json({
            verified: true,
            message: 'Domain ownership already verified'
        });
    }

    // Return the TXT record that should be added
    const verificationToken = config.domain_verification_token || generateVerificationToken();
    const recordName = getVerificationRecordName(normalized);

    // If token wasn't in DB, save it
    if (!config.domain_verification_token) {
        await supabase
            .from('website_configs')
            .update({ domain_verification_token: verificationToken })
            .eq('user_id', user.id)
            .eq('custom_domain', normalized);
    }

    return NextResponse.json({
        verified: false,
        recordName,
        recordType: 'TXT',
        recordValue: verificationToken,
        instructions: `Add a TXT record to your DNS with name "${recordName}" and value "${verificationToken}"`
    });
}

/**
 * POST /api/domains/verify-txt
 * Checks if the TXT record exists and verifies domain ownership
 */
export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { domain } = await request.json();

    if (!domain) {
        return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    // Validate domain format
    const validation = validateDomainFormat(domain);
    if (!validation.valid) {
        return NextResponse.json({ error: validation.message }, { status: 400 });
    }

    const normalized = validation.normalized!;

    // Get the expected verification token
    const { data: config } = await supabase
        .from('website_configs')
        .select('id, domain_verification_token, domain_verified_at')
        .eq('user_id', user.id)
        .eq('custom_domain', normalized)
        .maybeSingle();

    if (!config) {
        return NextResponse.json({ 
            error: 'Domain not found. Please add the domain first.' 
        }, { status: 404 });
    }

    // If already verified
    if (config.domain_verified_at) {
        return NextResponse.json({
            verified: true,
            message: 'Domain ownership already verified'
        });
    }

    if (!config.domain_verification_token) {
        return NextResponse.json({ 
            error: 'No verification token found. Please refresh and try again.' 
        }, { status: 400 });
    }

    const recordName = getVerificationRecordName(normalized);
    const expectedToken = config.domain_verification_token;

    try {
        // Perform DNS TXT record lookup
        const txtRecords = await resolveTxt(recordName);
        
        // txtRecords is an array of arrays (each TXT can have multiple strings)
        const allValues = txtRecords.flat();
        
        // Check if any TXT record matches our token
        const found = allValues.some(value => 
            value.trim().toLowerCase() === expectedToken.toLowerCase()
        );

        if (!found) {
            return NextResponse.json({
                verified: false,
                error: `TXT record not found or doesn't match. Expected "${expectedToken}" at ${recordName}`,
                hint: 'DNS changes can take up to 48 hours to propagate. Please wait and try again.'
            }, { status: 400 });
        }

        // Mark domain as verified and clear the token
        await supabase
            .from('website_configs')
            .update({ 
                domain_verified_at: new Date().toISOString(),
                domain_verification_token: null
            })
            .eq('id', config.id);

        return NextResponse.json({
            verified: true,
            message: 'Domain ownership verified! You can now proceed with DNS configuration.'
        });

    } catch (error: any) {
        // DNS lookup errors
        if (error.code === 'ENOTFOUND' || error.code === 'ENODATA') {
            return NextResponse.json({
                verified: false,
                error: `TXT record not found at ${recordName}`,
                hint: 'Make sure you added the TXT record correctly. DNS changes can take up to 48 hours to propagate.'
            }, { status: 400 });
        }

        if (error.code === 'ETIMEOUT') {
            return NextResponse.json({
                verified: false,
                error: 'DNS lookup timed out. Please try again.',
                hint: 'This might be a temporary network issue.'
            }, { status: 503 });
        }

        return NextResponse.json({ 
            error: `DNS verification failed: ${error.message}` 
        }, { status: 500 });
    }
}

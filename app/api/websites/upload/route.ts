import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type');

    if (!file) {
        return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    // Validate type using Zod
    const typeSchema = z.enum(['headshot', 'personal-logo', 'broker-logo']);
    const typeResult = typeSchema.safeParse(type);

    if (!typeResult.success) {
        return NextResponse.json({ error: 'Invalid type. Must be headshot, personal-logo, or broker-logo' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
        return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    // Create unique filename using UUID
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
        .from('website-assets')
        .upload(fileName, file, {
            upsert: true,
            contentType: file.type,
        });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
        .from('website-assets')
        .getPublicUrl(data.path);

    return NextResponse.json({ url: urlData.publicUrl });
}

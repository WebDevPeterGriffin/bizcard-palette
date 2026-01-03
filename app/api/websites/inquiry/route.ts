import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const inquirySchema = z.object({
    userId: z.string().uuid(),
    name: z.string().min(1),
    email: z.string().email(),
    message: z.string().min(1),
});

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    
    try {
        const body = await request.json();
        const result = inquirySchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid input', details: result.error.errors }, { status: 400 });
        }

        const { userId, name, email, message } = result.data;

        // 1. Save to Database
        const { data, error } = await supabase
            .from('website_inquiries')
            .insert({
                user_id: userId,
                name,
                email,
                message,
            })
            .select()
            .single();

        if (error) {
            console.error('Database error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // 2. Send Email Notification via Edge Function
        try {
            // Fetch website config to get the owner's preferred contact email
            const { data: configData } = await supabase
                .from('website_configs')
                .select('config')
                .eq('user_id', userId)
                .single();

            const websiteConfig = configData?.config as any;
            const recipientEmail = websiteConfig?.content?.text?.['contact.email'];

            if (recipientEmail) {
                const { error: funcError } = await supabase.functions.invoke('notify-admin', {
                    body: {
                        type: 'website_inquiry',
                        data: {
                            name,
                            email,
                            message,
                            recipient_email: recipientEmail
                        }
                    }
                });

                if (funcError) {
                    console.error('Edge Function error:', funcError);
                } else {
                    console.log('Email notification triggered for:', recipientEmail);
                }
            } else {
                console.warn('No contact email found in website config for user:', userId);
            }
        } catch (emailError) {
            console.error('Failed to trigger email notification:', emailError);
            // Don't fail the request if email fails
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Internal server error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

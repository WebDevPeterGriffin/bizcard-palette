"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';
import ImageUpload from '@/components/ImageUpload';
import SocialLinkSelector from '@/components/SocialLinkSelector';
import ProgressIndicator from '@/components/ProgressIndicator';
import { logger } from '@/lib/logger';
import MainLayout from '@/components/MainLayout';

import { cardFormSchema, CardFormData } from '@/components/request/schema';
import { StyleSelection } from '@/components/request/StyleSelection';
import { PersonalInfoSection } from '@/components/request/PersonalInfoSection';
import { ContactInfoSection } from '@/components/request/ContactInfoSection';

function RequestFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const supabase = createClient();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
    } = useForm<CardFormData>({
        resolver: zodResolver(cardFormSchema),
        defaultValues: {
            full_name: '',
            role: '',
            company: '',
            emails: [{ value: '' }],
            phones: [{ value: '' }],
            website: '',
            style_id: searchParams.get('style') || '',
        },
    });

    const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string; label?: string }[]>([]);
    const [headshot, setHeadshot] = useState<File | null>(null);
    const [headshotPreview, setHeadshotPreview] = useState<string | null>(null);

    const formData = watch();

    const generateSlug = (name: string) => {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    };

    import { RESERVED_SLUGS } from '@/lib/constants';

    // ...

    const onSubmit = async (data: CardFormData) => {
        // ...
        while (counter <= MAX_ATTEMPTS) {
            // Check reserved slugs
            if (RESERVED_SLUGS.includes(slug)) {
                counter++;
                slug = `${baseSlug}-${counter}`;
                continue;
            }

            // Check cards table
            const { data: existingCard } = await supabase
                .from('cards')
                .select('id')
                .eq('slug', slug)
                .maybeSingle();

            // Check website_configs table
            const { data: existingWebsite } = await supabase
                .from('website_configs')
                .select('id')
                .eq('slug', slug)
                .maybeSingle();

            if (!existingCard && !existingWebsite) break;

            counter++;
            slug = `${baseSlug}-${counter}`;
        }

        if (counter > MAX_ATTEMPTS) {
            const randomSuffix = Math.random().toString(36).substring(2, 8);
            slug = `${baseSlug}-${randomSuffix}`;
        }

        // Insert card record
        const { data: cardData, error: insertError } = await supabase
            .from('cards')
            .insert({
                full_name: data.full_name,
                role: data.role || null,
                company: data.company || null,
                emails: cleanedEmails,
                phones: cleanedPhones,
                website: data.website || null,
                style_id: data.style_id,
                slug: slug,
                booking_enabled: true,
                user_id: user?.id || null, // Link to user if logged in
                socials: Object.fromEntries(
                    socialLinks.map(link => [link.platform, link.url])
                ),
            })
            .select()
            .single();

        if (insertError) {
            throw insertError;
        }

        // Upload headshot if provided
        if (headshot && cardData) {
            logger.log('Uploading headshot:', headshot.name, 'size:', headshot.size);
            const fileExt = headshot.name.split('.').pop();
            const fileName = `${cardData.id}.${fileExt}`;
            const filePath = `${cardData.id}/${fileName}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('headshots')
                .upload(filePath, headshot, {
                    cacheControl: '3600',
                    upsert: true,
                });

            if (uploadError) {
                logger.error('Upload error:', uploadError);
                toast({
                    title: 'Upload Warning',
                    description: 'Your card was created but the headshot failed to upload.',
                    variant: 'destructive',
                });
            } else {
                logger.log('Upload successful:', uploadData);

                const { error: updateError } = await supabase
                    .from('cards')
                    .update({ headshot_url: filePath })
                    .eq('id', cardData.id);

                if (updateError) {
                    logger.error('Error updating headshot URL:', updateError);
                } else {
                    logger.log('Headshot path updated successfully:', filePath);
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
        }

        // Notify admin via email
        supabase.functions.invoke('notify-admin', {
            body: {
                type: 'request',
                data: {
                    ...cardData,
                    emails: cleanedEmails,
                }
            }
        }).catch(err => logger.error('Email notification failed:', err));

        toast({
            title: 'Card Created!',
            description: 'Your digital business card is ready!',
        });

        router.push(`/success/${slug}`);
    } catch (error) {
        logger.error('Error creating card:', error);
        toast({
            title: 'Error',
            description: 'There was an error creating your card. Please try again.',
            variant: 'destructive',
        });
    }
};

const handleImageUpload = (file: File | null, preview: string | null) => {
    setHeadshot(file);
    setHeadshotPreview(preview);
};

return (
    <MainLayout>
        <div className="min-h-screen bg-background p-4 pt-24">
            <div className="container mx-auto max-w-3xl">
                <div className="mb-8 flex items-center justify-between">
                    <Button variant="outline" onClick={() => router.push('/')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                    <h1 className="text-2xl font-bold">Create Your Digital Card</h1>
                    <div></div>
                </div>

                <ProgressIndicator
                    currentStep={formData.style_id ? (headshot || headshotPreview ? 3 : 2) : 1}
                    steps={['Choose Style', 'Add Info', 'Finalize']}
                />

                <Card className="shadow-card">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5 text-brand-primary" />
                            Tell us about yourself
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <StyleSelection control={control} errors={errors} />

                            <ImageUpload
                                onImageChange={handleImageUpload}
                                currentImage={headshotPreview}
                                label="Profile Photo or Logo"
                                accept="image/*"
                                maxSize={5}
                            />

                            <PersonalInfoSection register={register} errors={errors} />

                            <ContactInfoSection control={control} register={register} errors={errors} />

                            <SocialLinkSelector
                                socialLinks={socialLinks}
                                onChange={setSocialLinks}
                            />

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Creating Your Card...' : 'Create My Digital Card'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    <p>
                        Your card will be instantly available at: yourdomain.com/
                        {formData.full_name ? generateSlug(formData.full_name) : 'your-name'}
                    </p>
                </div>
            </div>
        </div>
    </MainLayout>
);
}

export default function RequestFormClient() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <RequestFormContent />
        </Suspense>
    );
}

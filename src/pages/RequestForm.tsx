import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CheckCircle, X, Plus } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ImageUpload from '@/components/ImageUpload';
import SocialLinkSelector from '@/components/SocialLinkSelector';
import SEO from '@/components/SEO';
import ProgressIndicator from '@/components/ProgressIndicator';
import { CARD_META } from '@/components/cards/registry';
import { logger } from '@/lib/logger';

// Zod validation schema
const cardFormSchema = z.object({
  full_name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  role: z.string().max(100).optional().or(z.literal('')),
  company: z.string().max(100).optional().or(z.literal('')),
  emails: z.array(z.object({
    value: z.string().email('Please enter a valid email').or(z.literal(''))
  })).min(1, 'At least one email is required').max(5, 'Maximum 5 emails allowed'),
  phones: z.array(z.object({
    value: z.string().regex(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/, 'Please enter a valid phone number').or(z.literal(''))
  })).max(5, 'Maximum 5 phones allowed'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  style_id: z.string().min(1, 'Please select a card style'),
});

type CardFormData = z.infer<typeof cardFormSchema>;

const RequestForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

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

  const { fields: emailFields, append: appendEmail, remove: removeEmail } = useFieldArray({
    control,
    name: 'emails',
  });

  const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
    control,
    name: 'phones',
  });

  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string; label?: string }[]>([]);
  const [headshot, setHeadshot] = useState<File | null>(null);
  const [headshotPreview, setHeadshotPreview] = useState<string | null>(null);

  const formData = watch();

  const cardStyles = Object.entries(CARD_META).map(([id, meta]) => ({
    id,
    name: meta.name,
  }));

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const onSubmit = async (data: CardFormData) => {
    // Filter out empty emails and phones
    const cleanedEmails = data.emails.map(e => e.value).filter(e => e.trim());
    const cleanedPhones = data.phones.map(p => p.value).filter(p => p.trim());

    // Additional validation
    if (cleanedEmails.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'At least one email address is required.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Generate unique slug
      const baseSlug = generateSlug(data.full_name);
      let slug = baseSlug;
      let counter = 1;
      const MAX_ATTEMPTS = 100;

      while (counter <= MAX_ATTEMPTS) {
        const { data: existingCard } = await supabase
          .from('cards')
          .select('id')
          .eq('slug', slug)
          .maybeSingle();

        if (!existingCard) break;

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

      toast({
        title: 'Card Created!',
        description: 'Your digital business card is ready!',
      });

      navigate(`/success/${slug}`);
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
    <>
      <SEO
        title="Create Your Digital Business Card - Request Form"
        description="Fill out our simple form to create your personalized digital business card. Add your contact info, social links, and headshot to get started."
        canonical="/request"
      />

      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between">
            <Button variant="outline" onClick={() => navigate('/')}>
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
                {/* Style Selection */}
                <div>
                  <Label htmlFor="style">Choose Your Style *</Label>
                  <Select
                    value={formData.style_id}
                    onValueChange={(value) => setValue('style_id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a card style" />
                    </SelectTrigger>
                    <SelectContent>
                      {cardStyles.map((style) => (
                        <SelectItem key={style.id} value={style.id}>
                          {style.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.style_id && (
                    <p className="text-sm text-destructive mt-1">{errors.style_id.message}</p>
                  )}
                </div>

                {/* Headshot Upload */}
                <ImageUpload
                  onImageChange={handleImageUpload}
                  currentImage={headshotPreview}
                  label="Profile Photo or Logo"
                  accept="image/*"
                  maxSize={5}
                />

                {/* Personal Information */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      {...register('full_name')}
                      placeholder="John Doe"
                    />
                    {errors.full_name && (
                      <p className="text-sm text-destructive mt-1">{errors.full_name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="role">Job Title</Label>
                    <Input
                      id="role"
                      {...register('role')}
                      placeholder="Senior Product Manager"
                    />
                    {errors.role && (
                      <p className="text-sm text-destructive mt-1">{errors.role.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    {...register('company')}
                    placeholder="Tech Innovations Inc."
                  />
                  {errors.company && (
                    <p className="text-sm text-destructive mt-1">{errors.company.message}</p>
                  )}
                </div>

                {/* Email Addresses */}
                <div>
                  <Label>Email Addresses *</Label>
                  <div className="space-y-2">
                    {emailFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2">
                        <Input
                          {...register(`emails.${index}.value` as const)}
                          placeholder="john@company.com"
                          type="email"
                        />
                        {emailFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeEmail(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {errors.emails?.[0]?.value && (
                      <p className="text-sm text-destructive">{errors.emails[0].value.message}</p>
                    )}
                  </div>
                  {emailFields.length < 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendEmail({ value: '' })}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Email
                    </Button>
                  )}
                </div>

                {/* Phone Numbers */}
                <div>
                  <Label>Phone Numbers</Label>
                  <div className="space-y-2">
                    {phoneFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2">
                        <Input
                          {...register(`phones.${index}.value` as const)}
                          placeholder="+1 (555) 123-4567"
                          type="tel"
                        />
                        {phoneFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removePhone(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {errors.phones?.[0]?.value && (
                      <p className="text-sm text-destructive">{errors.phones[0].value.message}</p>
                    )}
                  </div>
                  {phoneFields.length < 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendPhone({ value: '' })}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Phone
                    </Button>
                  )}
                </div>

                {/* Website */}
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    {...register('website')}
                    placeholder="www.johndoe.com"
                  />
                  {errors.website && (
                    <p className="text-sm text-destructive mt-1">{errors.website.message}</p>
                  )}
                </div>

                {/* Social Links */}
                <SocialLinkSelector
                  socialLinks={socialLinks}
                  onChange={setSocialLinks}
                />

                {/* Submit Button */}
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
    </>
  );
};

export default RequestForm;
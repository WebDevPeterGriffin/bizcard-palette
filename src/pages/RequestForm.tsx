import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle, X, Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "@/components/ImageUpload";
import SocialLinkSelector from "@/components/SocialLinkSelector";
import SEO from "@/components/SEO";
import ProgressIndicator from "@/components/ProgressIndicator";
import { CARD_META } from "@/components/cards/registry";

const RequestForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    full_name: "",
    role: "",
    company: "",
    phones: [""] as string[],
    emails: [""] as string[],
    website: "",
    style_id: searchParams.get('style') || ""
  });

  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string; label?: string }[]>([]);
  const [headshot, setHeadshot] = useState<File | null>(null);
  const [headshotPreview, setHeadshotPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardStyles = Object.entries(CARD_META).map(([id, meta]) => ({
    id,
    name: meta.name
  }));

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const addEmail = () => {
    if (formData.emails.length < 5) {
      setFormData({ ...formData, emails: [...formData.emails, ""] });
    }
  };

  const removeEmail = (index: number) => {
    if (formData.emails.length > 1) {
      const newEmails = formData.emails.filter((_, i) => i !== index);
      setFormData({ ...formData, emails: newEmails });
    }
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...formData.emails];
    newEmails[index] = value;
    setFormData({ ...formData, emails: newEmails });
  };

  const addPhone = () => {
    if (formData.phones.length < 5) {
      setFormData({ ...formData, phones: [...formData.phones, ""] });
    }
  };

  const removePhone = (index: number) => {
    const newPhones = formData.phones.filter((_, i) => i !== index);
    setFormData({ ...formData, phones: newPhones.length === 0 ? [""] : newPhones });
  };

  const updatePhone = (index: number, value: string) => {
    const newPhones = [...formData.phones];
    newPhones[index] = value;
    setFormData({ ...formData, phones: newPhones });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty emails and phones
    const cleanedEmails = formData.emails.filter(e => e.trim());
    const cleanedPhones = formData.phones.filter(p => p.trim());

    // Validation
    if (!formData.full_name || cleanedEmails.length === 0 || !formData.style_id) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (name, at least one email, and card style).",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmail = cleanedEmails.find(e => !emailRegex.test(e));
    if (invalidEmail) {
      toast({
        title: "Invalid Email",
        description: `"${invalidEmail}" is not a valid email address.`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate slug from full name
      const baseSlug = generateSlug(formData.full_name);
      let slug = baseSlug;
      let counter = 1;
      const MAX_ATTEMPTS = 100;

      // Check for existing slugs and ensure uniqueness
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

      // Insert card record with arrays
      const { data: cardData, error: insertError } = await supabase
        .from('cards')
        .insert({
          full_name: formData.full_name,
          role: formData.role || null,
          company: formData.company || null,
          phones: cleanedPhones,
          emails: cleanedEmails,
          website: formData.website || null,
          style_id: formData.style_id,
          slug: slug,
          booking_enabled: true,
          socials: Object.fromEntries(
            socialLinks.map(link => [link.platform, link.url])
          )
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      // Upload headshot if provided
      if (headshot && cardData) {
        console.log('Uploading headshot:', headshot.name, 'size:', headshot.size);
        const fileExt = headshot.name.split('.').pop();
        const fileName = `${cardData.id}.${fileExt}`;
        const filePath = `${cardData.id}/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('headshots')
          .upload(filePath, headshot, {
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          toast({
            title: "Upload Warning",
            description: "Your card was created but the headshot failed to upload.",
            variant: "destructive"
          });
        } else {
          console.log('Upload successful:', uploadData);

          const { error: updateError } = await supabase
            .from('cards')
            .update({ headshot_url: filePath })
            .eq('id', cardData.id);

          if (updateError) {
            console.error('Error updating headshot URL:', updateError);
          } else {
            console.log('Headshot path updated successfully:', filePath);
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
      }

      toast({
        title: "Card Created!",
        description: `Your digital business card is ready!`,
      });

      navigate(`/success/${slug}`);

    } catch (error) {
      console.error('Error creating card:', error);
      toast({
        title: "Error",
        description: "There was an error creating your card. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold">Create Your Digital Card</h1>
            <div></div>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator
            currentStep={formData.style_id ? (headshot || headshotPreview ? 3 : 2) : 1}
            steps={["Choose Style", "Add Info", "Finalize"]}
          />

          {/* Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-brand-primary" />
                Tell us about yourself
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Style Selection */}
                <div>
                  <Label htmlFor="style">Choose Your Style *</Label>
                  <Select
                    value={formData.style_id}
                    onValueChange={(value) => setFormData({ ...formData, style_id: value })}
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
                </div>

                {/* Headshot/Logo Upload */}
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
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Job Title</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Senior Product Manager"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Tech Innovations Inc."
                  />
                </div>

                {/* Email Addresses */}
                <div>
                  <Label>Email Addresses *</Label>
                  <div className="space-y-2">
                    {formData.emails.map((email, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => updateEmail(index, e.target.value)}
                          placeholder="john@company.com"
                          className="flex-1"
                        />
                        {formData.emails.length > 1 && (
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
                    {formData.emails.length < 5 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addEmail}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Email
                      </Button>
                    )}
                  </div>
                </div>

                {/* Phone Numbers */}
                <div>
                  <Label>Phone Numbers</Label>
                  <div className="space-y-2">
                    {formData.phones.map((phone, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => updatePhone(index, e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removePhone(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {formData.phones.length < 5 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addPhone}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Phone
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="www.johndoe.com"
                  />
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
                    {isSubmitting ? "Creating Your Card..." : "Create My Digital Card"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Your card will be instantly available at: yourdomain.com/{formData.full_name ? generateSlug(formData.full_name) : 'your-name'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestForm;
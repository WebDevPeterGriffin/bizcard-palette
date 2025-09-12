import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "@/components/ImageUpload";
import SocialLinkSelector from "@/components/SocialLinkSelector";
import SEO from "@/components/SEO";

const RequestForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    full_name: "",
    role: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    style_id: searchParams.get('style') || ""
  });
  
  const [socialLinks, setSocialLinks] = useState<{platform: string; url: string; label?: string}[]>([]);
  const [headshot, setHeadshot] = useState<File | null>(null);
  const [headshotPreview, setHeadshotPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardStyles = [
    { id: "minimal", name: "Minimal Clean" },
    { id: "bold", name: "Bold Modern" },
    { id: "elegant", name: "Elegant Professional" },
    { id: "creative", name: "Creative Colorful" },
    { id: "neon", name: "Neon Cyber" },
    { id: "floating", name: "Floating Cloud" },
    { id: "liquid", name: "Liquid Morph" },
    { id: "cosmic", name: "Cosmic Space" },
    { id: "holographic", name: "Holographic Glow" },
    { id: "particle", name: "Particle Storm" },
    { id: "morphing", name: "Morphing Liquid" }
  ];

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.full_name || !formData.email || !formData.style_id) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
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

      // Check for existing slugs and ensure uniqueness
      while (true) {
        const { data: existingCard } = await supabase
          .from('cards')
          .select('id')
          .eq('slug', slug)
          .maybeSingle();

        if (!existingCard) break;
        
        counter++;
        slug = `${baseSlug}-${counter}`;
      }

      // Insert card record (no user_id needed)
      const { data: cardData, error: insertError } = await supabase
        .from('cards')
        .insert({
          full_name: formData.full_name,
          role: formData.role,
          company: formData.company,
          phone: formData.phone,
          email: formData.email,
          website: formData.website,
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
      let headshotFilePath = null;
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
          headshotFilePath = filePath;
          
          const { error: updateError } = await supabase
            .from('cards')
            .update({ headshot_url: headshotFilePath })
            .eq('id', cardData.id);

          if (updateError) {
            console.error('Error updating headshot URL:', updateError);
          } else {
            console.log('Headshot path updated successfully:', headshotFilePath);
            // Small delay to ensure database consistency before navigation
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
      }

      toast({
        title: "Card Created!",
        description: `Your digital business card is ready at /${slug}`,
      });

      // Redirect to the generated card
      navigate(`/${slug}`);

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold">Create Your Digital Card</h1>
            <div></div>
          </div>

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
                  <Select value={formData.style_id} onValueChange={(value) => handleInputChange('style_id', value)}>
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
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Job Title</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      placeholder="Senior Product Manager"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Tech Innovations Inc."
                  />
                </div>

                {/* Contact Information */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
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
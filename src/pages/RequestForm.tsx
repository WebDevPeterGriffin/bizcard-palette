import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const RequestForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    linkedin: "",
    twitter: "",
    style: searchParams.get('style') || ""
  });

  const cardStyles = [
    { id: "minimal", name: "Minimal Clean" },
    { id: "bold", name: "Bold Modern" },
    { id: "elegant", name: "Elegant Professional" },
    { id: "creative", name: "Creative Colorful" }
  ];

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.style) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Store card data in localStorage (in a real app, this would be a database)
    const slug = generateSlug(formData.name);
    const cardData = {
      ...formData,
      slug,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(`card_${slug}`, JSON.stringify(cardData));
    
    toast({
      title: "Card Created!",
      description: `Your digital business card is ready at /${slug}`,
    });

    // Redirect to the generated card
    navigate(`/${slug}`);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
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
                <Select value={formData.style} onValueChange={(value) => handleInputChange('style', value)}>
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

              {/* Personal Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Senior Product Manager"
                    required
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
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter Handle</Label>
                  <Input
                    id="twitter"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    placeholder="@johndoe"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90"
                >
                  Create My Digital Card
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Note */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Your card will be instantly available at: yourdomain.com/{formData.name ? generateSlug(formData.name) : 'your-name'}</p>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import MinimalCard from "@/components/cards/MinimalCard";
import SEO from "@/components/SEO";

const PreviewMinimal = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Minimal Clean Style Preview - Digital Business Card"
        description="Preview the Minimal Clean digital business card style with clean, professional design and elegant typography."
        canonical="/preview/minimal"
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/styles')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Styles
              </Button>
              <h1 className="text-xl font-semibold">Minimal Clean Preview</h1>
              <Button onClick={() => navigate('/request?style=minimal')}>
                Choose This Style
              </Button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Minimal Clean Style</h2>
              <p className="text-muted-foreground">Clean, professional design with subtle borders and elegant typography</p>
            </div>
            
            <div className="flex justify-center">
              <MinimalCard 
                cardId="preview-minimal"
                name="Sarah Johnson"
                title="Senior Product Manager"
                company="Tech Innovations Inc."
                phone="+1 (555) 123-4567"
                email="sarah@techinnovations.com"
                website="www.sarahjohnson.com"
                linkedin="linkedin.com/in/sarahjohnson"
                twitter="@sarahjohnson"
                bookingEnabled={true}
                bookingInstructions="Let's schedule a time to discuss your project needs. I'm available for consultations Monday through Friday."
              />
            </div>

            <div className="mt-8 text-center">
              <Button 
                onClick={() => navigate('/request?style=minimal')}
                size="lg"
                className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90"
              >
                Create Your Card with This Style
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PreviewMinimal;
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ElegantCard from "@/components/cards/ElegantCard";
import SEO from "@/components/SEO";

const PreviewElegant = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Elegant Professional Style Preview - Digital Business Card"
        description="Preview the Elegant Professional digital business card style with sophisticated design and luxury aesthetic."
        canonical="/preview/elegant"
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
              <h1 className="text-xl font-semibold">Elegant Professional Preview</h1>
              <Button onClick={() => navigate('/request?style=elegant')}>
                Choose This Style
              </Button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Elegant Professional Style</h2>
              <p className="text-muted-foreground">Sophisticated design with muted tones and luxury aesthetic</p>
            </div>
            
            <div className="flex justify-center">
              <ElegantCard 
                cardId="preview-elegant"
                bookingEnabled={true}
                bookingInstructions="I look forward to connecting with you. Please book a convenient time for our meeting."
              />
            </div>

            <div className="mt-8 text-center">
              <Button 
                onClick={() => navigate('/request?style=elegant')}
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

export default PreviewElegant;
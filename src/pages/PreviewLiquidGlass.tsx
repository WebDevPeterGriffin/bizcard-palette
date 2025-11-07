import LiquidGlassCard from "@/components/cards/LiquidGlassCard";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PreviewLiquidGlass = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Liquid Glass Business Card Preview"
        description="Preview the elegant liquid glass business card design with translucent effects and modern iOS-inspired aesthetics"
        canonical="/preview/liquid-glass"
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
              <h1 className="text-xl font-semibold">Liquid Glass Preview</h1>
              <Button onClick={() => navigate('/request?style=liquid-glass')}>
                Choose This Style
              </Button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Liquid Glass Style</h2>
              <p className="text-muted-foreground">Elegant translucent design with modern iOS-inspired aesthetics and fluid animations</p>
            </div>
            
            <div className="flex justify-center bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-8 rounded-2xl">
              <LiquidGlassCard 
                cardId="preview-liquid-glass"
                slug="preview-liquid-glass"
                socialLinks={[
                  { platform: "twitter", url: "alexglass", label: "Twitter" },
                  { platform: "linkedin", url: "alexglass", label: "LinkedIn" },
                  { platform: "instagram", url: "alexglass", label: "Instagram" }
                ]}
                bookingEnabled={true}
              />
            </div>

            <div className="mt-8 text-center">
              <Button 
                onClick={() => navigate('/request?style=liquid-glass')}
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

export default PreviewLiquidGlass;
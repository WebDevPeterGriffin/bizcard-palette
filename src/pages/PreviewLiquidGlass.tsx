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
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 flex flex-col">
        {/* Header */}
        <div className="border-b border-white/10 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/styles')} className="text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Styles
              </Button>
              <h1 className="text-xl font-semibold text-white">Liquid Glass Preview</h1>
              <Button onClick={() => navigate('/request?style=liquid-glass')} className="bg-white/20 hover:bg-white/30 text-white">
                Choose This Style
              </Button>
            </div>
          </div>
        </div>

        {/* Full Screen Preview */}
        <div className="flex-1 flex items-center justify-center p-4">
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
      </div>
    </>
  );
};

export default PreviewLiquidGlass;
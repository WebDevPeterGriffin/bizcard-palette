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
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 flex flex-col relative overflow-hidden">
        {/* Full screen ambient background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Header */}
        <div className="relative border-b border-white/10 bg-black/30 backdrop-blur z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/styles')} className="text-white/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Styles
              </Button>
              <h1 className="text-xl font-semibold text-white">Liquid Glass Preview</h1>
              <Button onClick={() => navigate('/request?style=liquid-glass')} className="bg-white/20 hover:bg-white/30 text-white backdrop-blur">
                Choose This Style
              </Button>
            </div>
          </div>
        </div>

        {/* Full Screen Preview */}
        <div className="relative flex-1 flex items-center justify-center p-4 z-10">
          <div className="w-full h-full max-w-lg max-h-screen">
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
      </div>
    </>
  );
};

export default PreviewLiquidGlass;
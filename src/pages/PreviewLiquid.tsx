import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LiquidCard from "@/components/cards/LiquidCard";
import SEO from "@/components/SEO";

const PreviewLiquid = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Liquid Morph Style Preview - Digital Business Card"
        description="Preview the Liquid Morph style digital business card with dynamic liquid effects and flowing animations."
        canonical="/preview/liquid"
      />
      
      <div className="min-h-screen bg-gradient-liquid-bg flex flex-col relative overflow-hidden">
        {/* Subtle liquid effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/4 w-16 h-16 bg-liquid-primary/20 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute top-1/3 right-10 w-12 h-12 bg-liquid-secondary/20 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-10 w-20 h-20 bg-liquid-tertiary/20 rounded-full blur-lg animate-pulse delay-2000"></div>
          <div className="absolute bottom-10 right-1/3 w-14 h-14 bg-liquid-primary/20 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>
        {/* Header */}
        <div className="relative border-b border-liquid-primary/30 bg-black/50 backdrop-blur z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/styles')} className="text-liquid-primary hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Styles
              </Button>
              <h1 className="text-xl font-semibold text-white">Liquid Morph Preview</h1>
              <Button onClick={() => navigate('/request?style=liquid')} className="bg-liquid-primary hover:bg-liquid-secondary text-white">
                Choose This Style
              </Button>
            </div>
          </div>
        </div>

        {/* Full Screen Preview */}
        <div className="relative flex-1 flex items-center justify-center p-4 z-10">
          <div className="w-full h-full max-w-lg max-h-screen">
            <LiquidCard 
              cardId="preview-liquid"
              slug="preview-liquid"
              bookingEnabled={true}
              bookingInstructions="Let's flow into a productive conversation. Book your session and let's create something fluid and dynamic!"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewLiquid;
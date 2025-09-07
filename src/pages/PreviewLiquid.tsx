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
      
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex flex-col relative overflow-hidden">
        {/* Full screen liquid effects */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-10 left-1/4 w-20 h-20 bg-purple-500/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-10 w-16 h-16 bg-pink-500/30 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-10 w-24 h-24 bg-red-500/30 rounded-full blur-xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-10 right-1/3 w-18 h-18 bg-purple-400/30 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
        {/* Header */}
        <div className="relative border-b border-purple-500/30 bg-black/50 backdrop-blur z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/styles')} className="text-purple-300 hover:text-purple-100">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Styles
              </Button>
              <h1 className="text-xl font-semibold text-purple-100">Liquid Morph Preview</h1>
              <Button onClick={() => navigate('/request?style=liquid')} className="bg-purple-500 hover:bg-purple-400 text-white">
                Choose This Style
              </Button>
            </div>
          </div>
        </div>

        {/* Full Screen Preview */}
        <div className="relative flex-1 flex items-center justify-center p-4 z-10">
          <div className="w-full h-full max-w-lg max-h-screen">
            <LiquidCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewLiquid;
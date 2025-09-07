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
      
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex flex-col">
        {/* Header */}
        <div className="border-b border-purple-500/30 bg-black/50 backdrop-blur">
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
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full h-full max-w-lg max-h-screen">
            <LiquidCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewLiquid;
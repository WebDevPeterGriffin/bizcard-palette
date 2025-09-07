import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NeonCard from "@/components/cards/NeonCard";
import SEO from "@/components/SEO";

const PreviewNeon = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Neon Cyber Style Preview - Digital Business Card"
        description="Preview the Neon Cyber style digital business card with cyberpunk-inspired design and electric neon effects."
        canonical="/preview/neon"
      />
      
      <div className="min-h-screen bg-gray-900 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-700 bg-gray-900/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/styles')} className="text-gray-300 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Styles
              </Button>
              <h1 className="text-xl font-semibold text-white">Neon Cyber Preview</h1>
              <Button onClick={() => navigate('/request?style=neon')} className="bg-cyan-500 hover:bg-cyan-400 text-black">
                Choose This Style
              </Button>
            </div>
          </div>
        </div>

        {/* Full Screen Preview */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full h-full max-w-lg max-h-screen">
            <NeonCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewNeon;
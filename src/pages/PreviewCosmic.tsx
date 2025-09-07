import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CosmicCard from "@/components/cards/CosmicCard";
import SEO from "@/components/SEO";

const PreviewCosmic = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Cosmic Space Style Preview - Digital Business Card"
        description="Preview the Cosmic Space style digital business card with stellar design and cosmic particle animations."
        canonical="/preview/cosmic"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 flex flex-col">
        {/* Header */}
        <div className="border-b border-blue-500/30 bg-black/70 backdrop-blur">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/styles')} className="text-blue-300 hover:text-blue-100">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Styles
              </Button>
              <h1 className="text-xl font-semibold text-blue-100">Cosmic Space Preview</h1>
              <Button onClick={() => navigate('/request?style=cosmic')} className="bg-blue-500 hover:bg-blue-400 text-white">
                Choose This Style
              </Button>
            </div>
          </div>
        </div>

        {/* Full Screen Preview */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full h-full max-w-lg max-h-screen">
            <CosmicCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewCosmic;
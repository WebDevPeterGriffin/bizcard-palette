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
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 flex flex-col relative overflow-hidden">
        {/* Full screen cosmic effects */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-20 left-1/5 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-60 left-1/2 w-3 h-3 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 right-1/5 w-2 h-2 bg-blue-200 rounded-full animate-pulse delay-1500"></div>
          <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 right-10 w-4 h-4 bg-blue-400/50 rounded-full blur-sm animate-pulse delay-3000"></div>
        </div>
        {/* Header */}
        <div className="relative border-b border-blue-500/30 bg-black/70 backdrop-blur z-10">
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
        <div className="relative flex-1 flex items-center justify-center p-4 z-10">
          <div className="w-full h-full max-w-lg max-h-screen">
            <CosmicCard 
              cardId="preview-cosmic"
              bookingEnabled={true}
              bookingInstructions="Ready to explore infinite possibilities? Schedule a cosmic consultation and let's launch your project into orbit!"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewCosmic;
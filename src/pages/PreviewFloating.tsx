import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingCard from "@/components/cards/FloatingCard";
import SEO from "@/components/SEO";

const PreviewFloating = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Floating Cloud Style Preview - Digital Business Card"
        description="Preview the Floating Cloud style digital business card with serene floating elements and gentle animations."
        canonical="/preview/floating"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col relative overflow-hidden">
        {/* Full screen floating elements */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-20 left-10 w-4 h-4 bg-blue-300 rounded-full animate-bounce delay-0"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-indigo-300 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-60 left-1/3 w-3 h-3 bg-sky-300 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute bottom-40 right-10 w-5 h-5 bg-cyan-300 rounded-full animate-bounce delay-500"></div>
          <div className="absolute bottom-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-1500"></div>
          <div className="absolute top-1/2 right-1/4 w-7 h-7 bg-indigo-200 rounded-full animate-bounce delay-3000"></div>
        </div>
        {/* Header */}
        <div className="relative border-b border-blue-200 bg-white/80 backdrop-blur z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/styles')} className="text-blue-700 hover:text-blue-900">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Styles
              </Button>
              <h1 className="text-xl font-semibold text-blue-900">Floating Cloud Preview</h1>
              <Button onClick={() => navigate('/request?style=floating')} className="bg-blue-500 hover:bg-blue-400 text-white">
                Choose This Style
              </Button>
            </div>
          </div>
        </div>

        {/* Full Screen Preview */}
        <div className="relative flex-1 flex items-center justify-center p-4 z-10">
          <div className="w-full h-full max-w-lg max-h-screen">
            <FloatingCard 
              cardId="preview-floating"
              bookingEnabled={true}
              bookingInstructions="I'm here to help you achieve your goals. Schedule a peaceful consultation at your convenience."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewFloating;
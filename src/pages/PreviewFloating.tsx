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
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        {/* Header */}
        <div className="border-b border-blue-200 bg-white/80 backdrop-blur">
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
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full h-full max-w-lg max-h-screen">
            <FloatingCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewFloating;
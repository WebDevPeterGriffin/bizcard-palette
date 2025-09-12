import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PrismCard from "@/components/cards/PrismCard";
import SEO from "@/components/SEO";

const PreviewPrism = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Prismatic Motion Style Preview - Digital Business Card"
        description="Preview the Prismatic Motion style with conic gradients, light beams, and floating prism shapes."
        canonical="/preview/prism"
      />
      <div className="min-h-screen bg-gradient-to-b from-[#0b0b10] via-[#0f0f16] to-[#0b0b10] flex flex-col relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-pink-500/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute top-2/3 right-1/5 w-24 h-24 bg-violet-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
            {/* Soft radial glow and vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `radial-gradient(60% 40% at 50% 20%, rgba(186,148,66,0.18) 0%, rgba(24,24,33,0) 60%), radial-gradient(50% 30% at 80% 70%, rgba(124,58,237,0.15) 0%, rgba(24,24,33,0) 70%), radial-gradient(40% 25% at 20% 80%, rgba(34,211,238,0.12) 0%, rgba(24,24,33,0) 70%)`
            }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0),_rgba(0,0,0,0.5))]"></div>
          </div>
        </div>

        {/* Header */}
        <div className="relative border-b border-white/10 bg-black/80 backdrop-blur z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/styles')} className="text-gray-300 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Styles
              </Button>
              <h1 className="text-xl font-semibold text-white">Prismatic Motion Preview</h1>
              <Button onClick={() => navigate('/request?style=prism')} className="bg-cyan-500 hover:bg-cyan-400 text-black">
                Choose This Style
              </Button>
            </div>
          </div>
        </div>

        {/* Full Screen Preview */}
        <div className="relative flex-1 flex items-center justify-center p-4 z-10">
          <div className="w-full h-full max-w-lg max-h-screen">
            <PrismCard 
              cardId="preview-prism"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewPrism;



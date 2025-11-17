import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HolographicCard } from "@/components/cards/HolographicCard";
import SEO from "@/components/SEO";

const PreviewHolographic = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Holographic Glow Style Preview - Digital Business Card"
        description="Preview the Holographic Glow style digital business card with futuristic holographic effects and animated glowing borders."
        canonical="/preview/holographic"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-cyan-900">
        {/* Header */}
        <div className="border-b border-white/10 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/styles')} className="text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Styles
              </Button>
              <h1 className="text-xl font-semibold text-white">Holographic Glow Preview</h1>
              <Button onClick={() => navigate('/request?style=holographic')} className="bg-white/20 hover:bg-white/30 text-white">
                Choose This Style
              </Button>
            </div>
          </div>
        </div>

        {/* Full Screen Preview */}
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
          <HolographicCard
            cardId="preview-holographic"
            slug="preview-holographic"
            name="Alex Chen"
            title="Creative Director"
            company="Future Tech Industries"
            phone="+1 (555) 123-4567"
            email="alex@futuretech.com"
            website="www.alexchen.com"
            socialLinks={[
              { platform: "linkedin", url: "alexchen", label: "LinkedIn" },
              { platform: "twitter", url: "alexchen", label: "Twitter" },
              { platform: "instagram", url: "alexchen", label: "Instagram" }
            ]}
            bookingEnabled={true}
            bookingInstructions="Book a creative consultation to discuss your project. I'm available weekdays 9am-5pm."
          />
        </div>
      </div>
    </>
  );
};

export default PreviewHolographic;
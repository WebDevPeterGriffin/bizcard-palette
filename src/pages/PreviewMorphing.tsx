import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MorphingCard } from "@/components/cards/MorphingCard";
import SEO from "@/components/SEO";

const PreviewMorphing = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Morphing Liquid Style Preview - Digital Business Card"
        description="Preview the Morphing Liquid style digital business card with liquid morphing backgrounds and shape-shifting borders."
        canonical="/preview/morphing"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Header */}
        <div className="border-b border-white/10 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/styles')} className="text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Styles
              </Button>
              <h1 className="text-xl font-semibold text-white">Morphing Liquid Preview</h1>
              <div></div>
            </div>
          </div>
        </div>

        {/* Full Screen Preview */}
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
          <MorphingCard
            cardId="preview-morphing"
            name="Jordan Kim"
            title="UX Designer"
            company="Design Studio Labs"
            phone="+1 (555) 456-7890"
            email="jordan@designlabs.com"
            website="www.jordankim.design"
            location="Seattle, WA"
            socialLinks={[
              { platform: "dribbble", url: "jordankim", label: "Dribbble" },
              { platform: "behance", url: "jordankim", label: "Behance" },
              { platform: "linkedin", url: "jordankim", label: "LinkedIn" }
            ]}
            slug="preview-morphing"
          />
        </div>
      </div>
    </>
  );
};

export default PreviewMorphing;
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ParticleCard } from "@/components/cards/ParticleCard";
import SEO from "@/components/SEO";

const PreviewParticle = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Particle Storm Style Preview - Digital Business Card"
        description="Preview the Particle Storm style digital business card with dynamic particle system and morphing shapes."
        canonical="/preview/particle"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <div className="border-b border-white/10 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/styles')} className="text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Styles  
              </Button>
              <h1 className="text-xl font-semibold text-white">Particle Storm Preview</h1>
              <div></div>
            </div>
          </div>
        </div>

        {/* Full Screen Preview */}
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
          <ParticleCard
            cardId="preview-particle"
            name="Maya Rodriguez"
            title="Data Scientist"
            company="Quantum Analytics"
            phone="+1 (555) 987-6543"
            email="maya@quantum.com"
            website="www.mayarodriguez.com"
            location="Austin, TX"
            socialLinks={[
              { platform: "linkedin", url: "mayarodriguez", label: "LinkedIn" },
              { platform: "github", url: "mayarodriguez", label: "GitHub" },
              { platform: "twitter", url: "mayarodriguez", label: "Twitter" }
            ]}
            slug="preview-particle"
          />
        </div>
      </div>
    </>
  );
};

export default PreviewParticle;
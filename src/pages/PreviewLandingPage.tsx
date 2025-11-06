import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import SEO from "@/components/SEO";
import ModernSaasLanding from "@/components/landing-pages/ModernSaasLanding";
import { LANDING_PAGE_META } from "@/components/landing-pages/registry";

const PreviewLandingPage = () => {
  const navigate = useNavigate();
  const { styleId } = useParams();

  const renderLandingPage = () => {
    switch (styleId) {
      case "modern-saas":
        return <ModernSaasLanding />;
      default:
        return <ModernSaasLanding />;
    }
  };

  const styleMeta = styleId && styleId in LANDING_PAGE_META 
    ? LANDING_PAGE_META[styleId as keyof typeof LANDING_PAGE_META]
    : LANDING_PAGE_META["modern-saas"];

  return (
    <>
      <SEO
        title={`Preview: ${styleMeta.name} Landing Page Template`}
        description={styleMeta.description}
        canonical={`/landing-page/preview/${styleId}`}
      />
      
      <div className="min-h-screen bg-background">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/landing-pages')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Templates
              </Button>
              <h1 className="text-lg font-semibold">{styleMeta.name} Preview</h1>
              <Button onClick={() => navigate(`/landing-page/request?style=${styleId}`)}>
                Create This Page
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="pt-20">
          {renderLandingPage()}
        </div>
      </div>
    </>
  );
};

export default PreviewLandingPage;

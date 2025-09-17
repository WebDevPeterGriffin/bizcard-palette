import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CARD_COMPONENTS, CARD_META } from "@/components/cards/registry";
import SEO from "@/components/SEO";

const Styles = () => {
  const navigate = useNavigate();

  const cardStyles = (Object.keys(CARD_COMPONENTS) as Array<keyof typeof CARD_COMPONENTS>).map((id) => ({
    id,
    name: CARD_META[id].name,
    description: CARD_META[id].description,
    component: CARD_COMPONENTS[id]
  }));

  const handleRequestStyle = (styleId: string) => {
    navigate(`/request?style=${styleId}`);
  };

  return (
    <>
      <SEO
        title="Digital Business Card Styles - Choose Your Design"
        description="Browse our collection of 4 unique digital business card styles. From minimal clean to creative colorful designs, find the perfect template for your professional brand."
        canonical="/styles"
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <h1 className="text-xl font-semibold">Choose Your Style</h1>
              <div></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Digital Business Card Styles</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from our professionally designed templates. Each style is fully responsive 
                and optimized for sharing across all devices and platforms.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {cardStyles.map((style) => {
                const CardComponent = style.component;
                return (
                  <Card key={style.id} className="shadow-card">
                    <CardHeader className="text-center">
                      <CardTitle>{style.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{style.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Preview */}
                      <div className={`flex justify-center p-6 rounded-lg ${
                        style.id === 'liquid-glass' 
                          ? 'bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900' 
                          : 'bg-muted/30'
                      }`}>
                        <div className="scale-75 origin-center w-80 mx-auto">
                          {<CardComponent />}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => navigate(`/preview/${style.id}`)}
                          variant="outline"
                          size="sm"
                        >
                          Preview
                        </Button>
                        <Button 
                          onClick={() => handleRequestStyle(style.id)}
                          size="sm"
                        >
                          Choose This Style
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="mt-16 text-center">
              <div className="bg-muted/50 rounded-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                <div className="grid gap-4 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <span>✓</span>
                    <span>Professional headshot or logo display</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span>✓</span>
                    <span>Complete contact information</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span>✓</span>
                    <span>Social media links and custom platforms</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span>✓</span>
                    <span>QR code for easy sharing</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span>✓</span>
                    <span>Mobile-optimized design</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span>✓</span>
                    <span>Instant sharing and download options</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Styles;
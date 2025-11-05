import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { CARD_META, type CardStyleId } from "@/components/cards/registry";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Styles = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");

  const allStyles = (Object.keys(CARD_META) as CardStyleId[]).map((id) => ({
    id,
    ...CARD_META[id]
  }));

  const cardStyles = filter === "all" 
    ? allStyles 
    : allStyles.filter(style => style.category === filter);

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
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Digital Business Card Styles</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                13 professionally designed templates. Each style is fully responsive 
                and optimized for sharing across all devices.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center mb-12">
              <Tabs value={filter} onValueChange={setFilter}>
                <TabsList>
                  <TabsTrigger value="all">All Styles</TabsTrigger>
                  <TabsTrigger value="Professional">Professional</TabsTrigger>
                  <TabsTrigger value="Modern">Modern</TabsTrigger>
                  <TabsTrigger value="Creative">Creative</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {cardStyles.map((style) => (
                <Card key={style.id} className="shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
                  <div className={`h-40 ${style.gradient} relative`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-background/90 text-xs font-medium">
                        {style.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {style.name}
                      {style.category === "Modern" && <Sparkles className="h-4 w-4 text-brand-primary" />}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{style.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => navigate(`/preview/${style.id}`)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button 
                        onClick={() => navigate(`/style/${style.id}`)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        Details
                      </Button>
                    </div>
                    <Button 
                      onClick={() => handleRequestStyle(style.id)}
                      size="sm"
                      className="w-full"
                    >
                      Choose This Style
                    </Button>
                  </CardContent>
                </Card>
              ))}
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Leaf, Share2, Zap, Eye, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FAQ from "@/components/FAQ";
import { CARD_META, type CardStyleId } from "@/components/cards/registry";

const Index = () => {
  const navigate = useNavigate();

  // Show featured styles (first 4)
  const featuredStyles: CardStyleId[] = ["minimal", "bold", "elegant", "liquid-glass"];
  
  const cardStyles = featuredStyles.map(id => ({
    id,
    ...CARD_META[id]
  }));


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero px-4 py-20 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold text-brand-primary-foreground md:text-6xl">
            Your Digital Business Card,<br />Perfected
          </h1>
          <p className="mb-8 text-xl text-brand-primary-foreground/90 md:text-2xl">
            Join 10,000+ professionals using beautiful, eco-friendly digital cards.<br />
            Share instantly, update anytime, impress everyone.
          </p>
          
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 mb-8 text-brand-primary-foreground/80">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">10k+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">500k+ Shares</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              <span className="text-sm font-medium">100% Eco-Friendly</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              size="lg" 
              variant="outline"
              className="bg-background/10 text-brand-primary-foreground border-brand-primary-foreground/30 hover:bg-background/20"
              onClick={() => navigate('/styles')}
            >
              <Eye className="mr-2 h-5 w-5" />
              View Digital Business Cards
            </Button>
            <Button 
              size="lg"
              className="bg-brand-primary-foreground text-brand-primary hover:bg-brand-primary-foreground/90 shadow-hero"
              onClick={() => navigate('/request')}
            >
              Request Yours
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Go Digital?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10">
                <Leaf className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Eco-Friendly</h3>
              <p className="text-muted-foreground">
                No paper waste. Digital cards are environmentally responsible and sustainable.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-secondary/10">
                <Share2 className="h-8 w-8 text-brand-secondary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Easy Sharing</h3>
              <p className="text-muted-foreground">
                Share instantly via QR code, email, or direct link. Always up-to-date information.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent/10">
                <Zap className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Modern & Interactive</h3>
              <p className="text-muted-foreground">
                Stand out with professional design and clickable contact information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Styles Showcase */}
      <section id="styles" className="bg-muted/30 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">Choose Your Perfect Style</h2>
          <p className="mb-12 text-center text-muted-foreground">
            13 stunning designs to match your professional personality
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {cardStyles.map((style) => (
              <Card key={style.id} className="overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:scale-105">
                <div className={`h-32 ${style.gradient}`} />
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{style.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary">
                      {style.category}
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">{style.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate(`/preview/${style.id}`)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => navigate('/styles')}
              className="bg-background/80 hover:bg-background/90"
            >
              View All 13 Styles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-brand-primary-foreground text-xl font-bold">
                1
              </div>
              <h3 className="mb-2 text-lg font-semibold">Choose a Style</h3>
              <p className="text-muted-foreground">
                Browse our 8 beautiful templates and pick the one that matches your personality.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-secondary text-brand-primary-foreground text-xl font-bold">
                2
              </div>
              <h3 className="mb-2 text-lg font-semibold">Fill Your Info</h3>
              <p className="text-muted-foreground">
                Complete our simple form with your contact details and social links.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent text-brand-primary-foreground text-xl font-bold">
                3
              </div>
              <h3 className="mb-2 text-lg font-semibold">Get Your Card</h3>
              <p className="text-muted-foreground">
                Instantly receive your personalized digital business card with a custom URL.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="bg-gradient-hero px-4 py-16 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold text-brand-primary-foreground">
            Ready to Go Digital?
          </h2>
          <p className="mb-8 text-xl text-brand-primary-foreground/90">
            Join 10,000+ professionals who've made the switch to digital business cards.
          </p>
          <Button 
            size="lg"
            className="bg-brand-primary-foreground text-brand-primary hover:bg-brand-primary-foreground/90 shadow-hero"
            onClick={() => navigate('/request')}
          >
            Create Your Card Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground">
            © 2024 Digital Business Cards. Creating modern connections.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
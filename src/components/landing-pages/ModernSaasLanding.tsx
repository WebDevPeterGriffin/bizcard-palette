import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, Star, Zap, Shield, TrendingUp, Users, Mail } from "lucide-react";
import { useState } from "react";

interface ModernSaasLandingProps {
  companyName?: string;
  tagline?: string;
  description?: string;
  email?: string;
  features?: string[];
  ctaText?: string;
}

const ModernSaasLanding = ({
  companyName = "YourBrand",
  tagline = "Transform Your Business with AI-Powered Solutions",
  description = "The complete platform to scale your business, increase productivity, and drive growth. Trusted by 10,000+ companies worldwide.",
  email = "hello@yourbrand.com",
  features = [
    "AI-powered automation",
    "Real-time analytics",
    "24/7 customer support",
    "99.9% uptime guarantee"
  ],
  ctaText = "Start Free Trial"
}: ModernSaasLandingProps) => {
  const [emailInput, setEmailInput] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero px-4 py-20 md:py-32">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-background/10 px-4 py-2 text-sm font-medium text-brand-primary-foreground backdrop-blur">
              <Star className="h-4 w-4 fill-current" />
              Trusted by 10,000+ Companies
            </div>
            <h1 className="mb-6 text-4xl font-bold text-brand-primary-foreground md:text-6xl lg:text-7xl">
              {tagline}
            </h1>
            <p className="mb-8 text-lg text-brand-primary-foreground/90 md:text-xl max-w-3xl mx-auto">
              {description}
            </p>
            
            {/* CTA Form */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background/95 text-foreground border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-brand-primary-foreground text-brand-primary hover:bg-brand-primary-foreground/90 shadow-hero whitespace-nowrap"
              >
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-brand-primary-foreground/70">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 py-12 border-b">
        <div className="container mx-auto max-w-6xl">
          <p className="text-center text-sm text-muted-foreground mb-8">
            TRUSTED BY LEADING COMPANIES
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="h-12 flex items-center justify-center text-lg font-semibold">
                  Company {i}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you grow faster and work smarter
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/10">
                  <Zap className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Get up and running in minutes with our intuitive interface and quick setup process.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-secondary/10">
                  <Shield className="h-6 w-6 text-brand-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
                <p className="text-muted-foreground">
                  Bank-level encryption and security measures to keep your data safe and compliant.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-accent/10">
                  <TrendingUp className="h-6 w-6 text-brand-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Scale with Ease</h3>
                <p className="text-muted-foreground">
                  Built to grow with you from startup to enterprise without any performance issues.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits List */}
      <section className="bg-muted/30 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose {companyName}?
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary text-brand-primary-foreground mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <TrendingUp className="h-24 w-24 mx-auto mb-4 text-brand-primary" />
                  <p className="text-2xl font-bold">300%</p>
                  <p className="text-muted-foreground">Average ROI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by Thousands
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our customers have to say
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-brand-primary text-brand-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "This platform has completely transformed how we work. The results speak for themselves."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <p className="text-sm text-muted-foreground">CEO, Company {i}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero px-4 py-20 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl md:text-4xl font-bold text-brand-primary-foreground">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-brand-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of successful businesses already using {companyName}
          </p>
          <Button 
            size="lg"
            className="bg-brand-primary-foreground text-brand-primary hover:bg-brand-primary-foreground/90 shadow-hero"
          >
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-semibold mb-4">{companyName}</h3>
              <p className="text-sm text-muted-foreground">
                Building the future of business software.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Use Cases</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 {companyName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernSaasLanding;

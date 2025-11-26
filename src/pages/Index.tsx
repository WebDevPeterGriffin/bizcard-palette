import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Share2, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FAQ from "@/components/FAQ";
import { CARD_META, type CardStyleId } from "@/components/cards/registry";
import FloatingOrbs from "@/components/FloatingOrbs";

const Index = () => {
  const navigate = useNavigate();

  // Show featured styles (first 4)
  const featuredStyles: CardStyleId[] = ["minimal", "bold", "elegant", "liquid-glass"];

  const cardStyles = featuredStyles.map(id => ({
    id,
    ...CARD_META[id]
  }));

  return (
    <div className="min-h-screen bg-background font-sans text-slate-900">
      {/* Hero Section with Gradient Background */}
      <section className="relative min-h-[25vh] md:min-h-[30vh] overflow-hidden flex items-center justify-center px-4 py-6 md:py-8">
        {/* Gradient Background - Navy to Gold */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1A2D49 0%, #3D5A73 35%, #8B7355 65%, #F0B429 100%)',
          }}
        />

        {/* Floating orbs */}
        <FloatingOrbs />

        {/* Glassmorphic Hero Card */}
        <div className="container mx-auto max-w-4xl relative z-10 flex items-center justify-center">
          <div
            className="rounded-3xl p-5 md:p-6 lg:p-8 text-center w-full max-w-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Headline */}
            <h1 className="mb-3 md:mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Your Digital Business Card,
              <br />
              Beautifully Crafted
            </h1>

            {/* Subheadline */}
            <p className="mb-5 md:mb-6 text-base md:text-lg text-white/95 font-medium">
              Create stunning modern digital business cards in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                className="px-5 md:px-7 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-medium text-white border border-white/40 hover:bg-white/10 transition-all backdrop-blur-sm w-full sm:w-auto"
                onClick={() => navigate('/styles')}
              >
                Business Cards
              </button>
              <button
                className="px-5 md:px-7 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-bold bg-[#F0B429] text-[#1A2D49] hover:bg-[#D9A024] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 w-full sm:w-auto"
                onClick={() => navigate('/request')}
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Card Preview Section */}
      <section className="px-4 pt-8 pb-16 md:pt-12 md:pb-20 bg-white">
        <div className="container mx-auto max-w-7xl">

          {/* Section Header */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Digital Business Card Templates for Every Profession
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Browse our premium collection of professionally designed digital business card templates. Each style is crafted to look great on every device and can be shared instantly.
            </p>
          </div>

          {/* Card Grid - 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
            {cardStyles.map((style) => (
              <div
                key={style.id}
                className="group cursor-pointer flex flex-col items-center"
                onClick={() => navigate(`/preview/${style.id}`)}
              >
                {/* Card Preview Container */}
                <div className="w-full mb-4 overflow-hidden rounded-2xl transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl shadow-lg hover:shadow-xl ring-1 ring-black/5">
                  <div className={`h-56 md:h-60 ${style.gradient} flex items-center justify-center p-4 relative w-full`}>
                    {/* Minimal White - Clean white card with contact details */}
                    {style.id === 'minimal' && (
                      <div className="bg-white rounded-xl p-5 w-full max-w-[220px] shadow-md border border-slate-100 relative">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="text-base font-bold text-slate-900">Junoss Smith</div>
                            <div className="text-xs text-slate-500 font-medium">Product Designer</div>
                          </div>
                          <div className="w-9 h-9 rounded-full bg-slate-200"></div>
                        </div>
                        <div className="text-xs text-slate-500 space-y-1">
                          <div className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-slate-300"></span>San Francisco, CA</div>
                          <div className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-slate-300"></span>hello@junoss.com</div>
                          <div className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-slate-300"></span>junoss.design</div>
                        </div>
                      </div>
                    )}
                    {/* Bold Dark - Large bold text treatment */}
                    {style.id === 'bold' && (
                      <div className="text-center w-full">
                        <div className="text-4xl md:text-5xl font-black leading-none tracking-tight">
                          <div className="text-white drop-shadow-sm">BOLD</div>
                          <div className="text-[#F0B429] drop-shadow-sm">DARK</div>
                        </div>
                        <div className="mt-2 text-xs font-medium text-white/60 tracking-widest uppercase">Professional</div>
                      </div>
                    )}
                    {/* Elegant Cream - Serif typography with decorative elements */}
                    {style.id === 'elegant' && (
                      <div className="bg-[#F9F5EB] rounded-xl p-6 w-full max-w-[220px] shadow-md border border-[#E6DCC8] text-center relative">
                        <div className="text-xl mb-2 text-[#8B7355]">⟡</div>
                        <div className="text-lg font-serif font-medium text-[#5A4A3A] mb-1">Elegant Cream</div>
                        <div className="text-[10px] text-[#8B7355] tracking-[0.2em] uppercase mb-3">Sophisticated</div>
                        <div className="absolute top-3 right-3 text-xs text-[#C0B29C]">⟡</div>
                        <div className="text-[10px] text-[#9B8567] font-serif italic">est. 2024</div>
                      </div>
                    )}
                    {/* Modern Glass Effect - Glassmorphic with gradient */}
                    {style.id === 'liquid-glass' && (
                      <div className="text-center text-white backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/20 w-full max-w-[220px] shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                        <div className="font-bold text-xl mb-1 tracking-tight relative z-10">Jumes Smith</div>
                        <div className="text-sm text-white/80 mb-3 font-light relative z-10">Creative Director</div>
                        <div className="text-[10px] text-white/60 space-y-1 relative z-10">
                          <div>Los Angeles</div>
                          <div>jumes.studio</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Name */}
                <h3 className="text-center text-lg font-semibold text-slate-800 group-hover:text-[#1A2D49] transition-colors">
                  {style.name}
                </h3>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/styles')}
              className="border-2 border-[#1A2D49] text-[#1A2D49] hover:bg-[#1A2D49] hover:text-white transition-all px-10 py-6 text-lg font-semibold rounded-full"
            >
              View All 13 Styles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-3xl md:text-4xl font-bold text-slate-900">Why Go Digital?</h2>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="text-center px-4">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                <Leaf className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Eco-Friendly</h3>
              <p className="text-slate-600 leading-relaxed">
                No paper waste. Digital cards are environmentally responsible and sustainable for our planet.
              </p>
            </div>
            <div className="text-center px-4">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                <Share2 className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Easy Sharing</h3>
              <p className="text-slate-600 leading-relaxed">
                Share instantly via QR code, email, or direct link. Your information is always up-to-date.
              </p>
            </div>
            <div className="text-center px-4">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                <Zap className="h-10 w-10 text-[#F0B429]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Modern & Interactive</h3>
              <p className="text-slate-600 leading-relaxed">
                Stand out with professional design, clickable links, and interactive contact information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-16 text-center text-3xl md:text-4xl font-bold text-slate-900">How It Works</h2>
          <div className="grid gap-12 md:grid-cols-3 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>

            <div className="text-center relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1A2D49] text-white text-2xl font-bold shadow-lg ring-4 ring-white">
                1
              </div>
              <h3 className="mb-3 text-lg font-bold text-slate-900">Choose a Style</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Browse our 13 beautiful templates and pick the one that matches your personality.
              </p>
            </div>
            <div className="text-center relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1A2D49] text-white text-2xl font-bold shadow-lg ring-4 ring-white">
                2
              </div>
              <h3 className="mb-3 text-lg font-bold text-slate-900">Fill Your Info</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Complete our simple form with your contact details and social links.
              </p>
            </div>
            <div className="text-center relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0B429] text-[#1A2D49] text-2xl font-bold shadow-lg ring-4 ring-white">
                3
              </div>
              <h3 className="mb-3 text-lg font-bold text-slate-900">Get Your Card</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Instantly receive your personalized digital business card with a custom URL.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="py-12">
        <FAQ />
      </div>

      {/* CTA Section */}
      <section className="relative px-4 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[#1A2D49]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2D49] to-[#2a456b] opacity-90"></div>
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F0B429]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="mb-6 text-3xl md:text-5xl font-bold text-white tracking-tight">
            Ready to Go Digital?
          </h2>
          <p className="mb-10 text-xl text-white/80 max-w-2xl mx-auto">
            Join 10,000+ professionals who've made the switch to digital business cards.
          </p>
          <Button
            size="lg"
            className="bg-[#F0B429] text-[#1A2D49] hover:bg-[#ffcc52] hover:scale-105 transition-all shadow-xl px-10 py-7 text-lg font-bold rounded-full"
            onClick={() => navigate('/request')}
          >
            Create Your Card Free
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 px-4 py-12">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-6">
            <span className="text-2xl font-bold text-[#1A2D49]">BizCard</span>
          </div>
          <p className="text-slate-500 mb-6">
            © 2024 Digital Business Cards. Creating modern connections.
          </p>
          <div className="flex justify-center gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-[#1A2D49] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#1A2D49] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#1A2D49] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

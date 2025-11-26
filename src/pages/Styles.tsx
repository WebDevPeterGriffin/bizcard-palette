import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Sparkles, Check } from "lucide-react";
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
        description="Browse our collection of unique digital business card styles. Find the perfect template for your professional brand."
        canonical="/styles"
      />

      <div className="min-h-screen bg-background font-sans text-slate-900">
        {/* Header */}
        <div className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/')} className="hover:bg-slate-100">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <h1 className="text-lg font-semibold hidden md:block">Choose Your Style</h1>
              <div className="w-24"></div> {/* Spacer for balance */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Digital Business Card Styles</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Professionally designed templates optimized for every device.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center mb-12">
              <Tabs value={filter} onValueChange={setFilter} className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 rounded-xl">
                  <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">All</TabsTrigger>
                  <TabsTrigger value="Professional" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Pro</TabsTrigger>
                  <TabsTrigger value="Modern" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Modern</TabsTrigger>
                  <TabsTrigger value="Creative" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Creative</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Styles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {cardStyles.map((style) => (
                <div key={style.id} className="group flex flex-col">
                  {/* Card Preview Container */}
                  <div
                    className="relative w-full mb-5 overflow-hidden rounded-2xl transition-all duration-300 group-hover:shadow-2xl shadow-lg ring-1 ring-black/5 cursor-pointer"
                    onClick={() => navigate(`/preview/${style.id}`)}
                  >
                    {/* Background Visual */}
                    <div className={`h-64 ${style.gradient} flex items-center justify-center p-6 relative w-full transition-transform duration-500 group-hover:scale-105`}>

                      {/* Glass Overlay Preview (Standardized for all cards) */}
                      <div className="relative z-10 w-full max-w-[240px] aspect-[1.58/1] rounded-xl overflow-hidden shadow-xl">
                        {/* Glass Effect Background */}
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                          {/* Avatar Placeholder */}
                          <div className={`w-10 h-10 rounded-full mb-3 shadow-inner ${style.isDark ? 'bg-white/30' : 'bg-[#1A2D49]/10'}`}></div>

                          {/* Text */}
                          <div className="space-y-1">
                            <div className={`text-lg font-bold drop-shadow-sm leading-tight ${style.isDark ? 'text-white' : 'text-[#1A2D49]'}`}>James Smith</div>
                            <div className={`text-xs font-medium uppercase tracking-wider ${style.isDark ? 'text-white/80' : 'text-[#1A2D49]/80'}`}>{style.name}</div>
                          </div>

                          {/* Decorative Lines */}
                          <div className={`mt-3 w-12 h-0.5 rounded-full ${style.isDark ? 'bg-white/40' : 'bg-[#1A2D49]/40'}`}></div>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                    </div>
                  </div>

                  {/* Card Info & Actions */}
                  <div className="flex flex-col gap-4 px-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1A2D49] transition-colors">
                          {style.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                            {style.category}
                          </span>
                          {style.category === "Modern" && <Sparkles className="h-3 w-3 text-[#F0B429]" />}
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/preview/${style.id}`)}
                        className="w-full border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button
                        onClick={() => handleRequestStyle(style.id)}
                        className="w-full bg-[#1A2D49] hover:bg-[#2a456b] text-white shadow-md hover:shadow-lg transition-all"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Choose
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Styles;
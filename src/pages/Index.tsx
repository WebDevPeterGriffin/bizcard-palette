import HeroSection from "@/components/homepage/HeroSection";
import CardPreviewSection from "@/components/homepage/CardPreviewSection";
import WhyDigitalSection from "@/components/homepage/WhyDigitalSection";
import HowItWorksSection from "@/components/homepage/HowItWorksSection";
import FAQSection from "@/components/homepage/FAQSection";
import CTASection from "@/components/homepage/CTASection";

export default function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-slate-900">
      <HeroSection />
      <CardPreviewSection />
      <WhyDigitalSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

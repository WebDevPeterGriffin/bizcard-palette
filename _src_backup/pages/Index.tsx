import Navbar from "../components/Navbar";
import HeroSection from "../components/homepage/HeroSection";
import ProductOverviewSection from "../components/homepage/ProductOverviewSection";
import CardPreviewSection from "../components/homepage/CardPreviewSection";
import WebsiteTemplatesPreviewSection from "../components/homepage/WebsiteTemplatesPreviewSection";
import WhyDigitalSection from "../components/homepage/WhyDigitalSection";
import HowItWorksSection from "../components/homepage/HowItWorksSection";
import FAQSection from "../components/homepage/FAQSection";
import CTASection from "../components/homepage/CTASection";
import TrustedBySection from "../components/homepage/TrustedBySection";
import AudienceSection from "../components/homepage/AudienceSection";
import TestimonialsSection from "../components/homepage/TestimonialsSection";

import Footer from "../components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-slate-900">
      <Navbar />
      <HeroSection />
      <TrustedBySection />
      <ProductOverviewSection />
      <CardPreviewSection />
      <WebsiteTemplatesPreviewSection />
      <AudienceSection />
      <WhyDigitalSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}

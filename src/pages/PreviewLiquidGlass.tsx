import LiquidGlassCard from "@/components/cards/LiquidGlassCard";
import SEO from "@/components/SEO";

const PreviewLiquidGlass = () => {
  return (
    <>
      <SEO 
        title="Liquid Glass Business Card Preview"
        description="Preview the elegant liquid glass business card design with translucent effects and modern iOS-inspired aesthetics"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <LiquidGlassCard 
          cardId="preview-liquid-glass"
          socialLinks={[
            { platform: "twitter", url: "alexglass", label: "Twitter" },
            { platform: "linkedin", url: "alexglass", label: "LinkedIn" },
            { platform: "instagram", url: "alexglass", label: "Instagram" }
          ]}
          bookingEnabled={true}
        />
      </div>
    </>
  );
};

export default PreviewLiquidGlass;
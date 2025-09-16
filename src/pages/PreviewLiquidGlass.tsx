import LiquidGlassCard from "@/components/cards/LiquidGlassCard";
import SEO from "@/components/SEO";

const PreviewLiquidGlass = () => {
  return (
    <>
      <SEO 
        title="Liquid Glass Business Card Preview"
        description="Preview the elegant liquid glass business card design with translucent effects and modern iOS-inspired aesthetics"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <LiquidGlassCard />
      </div>
    </>
  );
};

export default PreviewLiquidGlass;
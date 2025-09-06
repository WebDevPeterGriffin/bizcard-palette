import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BoldCard from "@/components/cards/BoldCard";

const PreviewBold = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-bold p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="bg-white/10 text-white border-white/30 hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-white">Bold Modern Style</h1>
          <div></div>
        </div>

        {/* Preview Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-xl text-white/80">Preview</h2>
          <div className="flex justify-center">
            <BoldCard />
          </div>
        </div>

        {/* Description & CTA */}
        <div className="rounded-lg bg-white/10 backdrop-blur-sm p-8 text-center shadow-card border border-white/20">
          <h3 className="mb-4 text-2xl font-bold text-white">Make a Statement</h3>
          <p className="mb-6 text-lg text-white/90">
            Stand out with this bold, modern design featuring dark themes and vibrant accents. 
            Perfect for creative professionals who want to make a memorable impression.
          </p>
          <Button 
            size="lg"
            className="bg-bold-accent text-bold-accent-foreground hover:bg-bold-accent/90"
            onClick={() => navigate('/request?style=bold')}
          >
            Request This Style
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewBold;
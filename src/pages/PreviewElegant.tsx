import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ElegantCard from "@/components/cards/ElegantCard";

const PreviewElegant = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-elegant p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Elegant Professional Style</h1>
          <div></div>
        </div>

        {/* Preview Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-xl text-gray-600">Preview</h2>
          <div className="flex justify-center">
            <ElegantCard />
          </div>
        </div>

        {/* Description & CTA */}
        <div className="rounded-lg bg-white/90 p-8 text-center shadow-card border border-elegant-accent/20">
          <h3 className="mb-4 text-2xl font-bold text-gray-800">Timeless Elegance</h3>
          <p className="mb-6 text-lg text-gray-600">
            Sophisticated design with luxury aesthetics and refined typography. 
            Ideal for executives, lawyers, and professionals in traditional industries.
          </p>
          <Button 
            size="lg"
            className="bg-elegant-accent text-elegant-accent-foreground hover:bg-elegant-accent/90"
            onClick={() => navigate('/request?style=elegant')}
          >
            Request This Style
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewElegant;
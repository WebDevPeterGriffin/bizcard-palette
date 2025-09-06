import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MinimalCard from "@/components/cards/MinimalCard";

const PreviewMinimal = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-minimal p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold">Minimal Clean Style</h1>
          <div></div>
        </div>

        {/* Preview Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-xl text-muted-foreground">Preview</h2>
          <div className="flex justify-center">
            <MinimalCard />
          </div>
        </div>

        {/* Description & CTA */}
        <div className="rounded-lg bg-white/80 p-8 text-center shadow-card">
          <h3 className="mb-4 text-2xl font-bold">Clean & Professional</h3>
          <p className="mb-6 text-lg text-muted-foreground">
            Perfect for professionals who appreciate minimalist design and clean typography. 
            This style emphasizes clarity and readability with subtle visual elements.
          </p>
          <Button 
            size="lg"
            className="bg-minimal-accent text-minimal-accent-foreground hover:bg-minimal-accent/90"
            onClick={() => navigate('/request?style=minimal')}
          >
            Request This Style
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewMinimal;
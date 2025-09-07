import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import MinimalCard from "@/components/cards/MinimalCard";
import BoldCard from "@/components/cards/BoldCard";
import ElegantCard from "@/components/cards/ElegantCard";
import CreativeCard from "@/components/cards/CreativeCard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CardData {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  linkedin: string;
  twitter: string;
  style: string;
  slug: string;
  createdAt: string;
}

const GeneratedCard = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      // Try Supabase first
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (data) {
        const socials = (data as any).socials || {};
        setCardData({
          name: data.full_name,
          title: data.role || '',
          company: data.company || '',
          phone: data.phone || '',
          email: data.email || '',
          website: data.website || '',
          linkedin: socials.linkedin || '',
          twitter: socials.twitter || '',
          style: data.style_id,
          slug: data.slug,
          createdAt: data.created_at,
        });
        setLoading(false);
        return;
      }

      // Fallback to localStorage (legacy)
      const storedData = localStorage.getItem(`card_${slug}`);
      if (storedData) {
        setCardData(JSON.parse(storedData));
      }
      setLoading(false);
    };

    fetchCard();
  }, [slug]);

  const renderCard = () => {
    if (!cardData) return null;

    const props = {
      name: cardData.name,
      title: cardData.title,
      company: cardData.company,
      phone: cardData.phone,
      email: cardData.email,
      website: cardData.website,
      linkedin: cardData.linkedin,
      twitter: cardData.twitter,
    };

    switch (cardData.style) {
      case 'minimal':
        return <MinimalCard {...props} />;
      case 'bold':
        return <BoldCard {...props} />;
      case 'elegant':
        return <ElegantCard {...props} />;
      case 'creative':
        return <CreativeCard {...props} />;
      default:
        return <MinimalCard {...props} />;
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardData?.name}'s Digital Business Card`,
          text: `Check out ${cardData?.name}'s digital business card`,
          url: url,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        toast({
          title: "Link Copied!",
          description: "The card URL has been copied to your clipboard.",
        });
      }
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied!",
        description: "The card URL has been copied to your clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your card...</p>
        </div>
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Card Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The digital business card you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const getBackgroundClass = () => {
    switch (cardData.style) {
      case 'minimal':
        return 'bg-gradient-minimal';
      case 'bold':
        return 'bg-gradient-bold';
      case 'elegant':
        return 'bg-gradient-elegant';
      case 'creative':
        return 'bg-gradient-creative';
      default:
        return 'bg-background';
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} p-4`}>
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className={cardData.style === 'bold' || cardData.style === 'creative' ? 
              "bg-white/10 text-white border-white/30 hover:bg-white/20" : 
              ""
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Create Your Own
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShare}
              className={cardData.style === 'bold' || cardData.style === 'creative' ? 
                "bg-white/10 text-white border-white/30 hover:bg-white/20" : 
                ""
              }
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Card Display */}
        <div className="flex justify-center">
          {renderCard()}
        </div>

        {/* Card Info */}
        <div className="mt-8 text-center">
          <div className={`rounded-lg p-6 ${
            cardData.style === 'bold' || cardData.style === 'creative' ? 
              'bg-white/10 backdrop-blur-sm border border-white/20' : 
              'bg-white/80 shadow-card'
          }`}>
            <h2 className={`text-xl font-bold mb-2 ${
              cardData.style === 'bold' || cardData.style === 'creative' ? 'text-white' : ''
            }`}>
              {cardData.name}'s Digital Business Card
            </h2>
            <p className={`text-sm ${
              cardData.style === 'bold' || cardData.style === 'creative' ? 'text-white/80' : 'text-muted-foreground'
            }`}>
              Share this link: {window.location.href}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedCard;
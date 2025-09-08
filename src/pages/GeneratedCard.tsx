import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import MinimalCard from "@/components/cards/MinimalCard";
import BoldCard from "@/components/cards/BoldCard";
import ElegantCard from "@/components/cards/ElegantCard";
import CreativeCard from "@/components/cards/CreativeCard";
import NeonCard from "@/components/cards/NeonCard";
import FloatingCard from "@/components/cards/FloatingCard";
import LiquidCard from "@/components/cards/LiquidCard";
import CosmicCard from "@/components/cards/CosmicCard";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface CardData {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  socialLinks: SocialLink[];
  style: string;
  slug: string;
  createdAt: string;
  headshotUrl?: string;
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

      // Fetch card data directly from Supabase
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .ilike('slug', slug.trim())
        .limit(1)
        .maybeSingle();

      if (!data || error) {
        // Fallback to localStorage (legacy)
        const storedData = localStorage.getItem(`card_${slug}`);
        if (storedData) {
          setCardData(JSON.parse(storedData));
        } else {
          // Not found
        }
        setLoading(false);
        return;
      }

      const socials = (data as any).socials || {};
      const socialLinks: SocialLink[] = Object.entries(socials)
        .map(([platform, url]) => ({
          platform,
          url: url as string,
          label: platform.charAt(0).toUpperCase() + platform.slice(1),
        }))
        .filter((link) => link.url && link.url.trim() !== '');

      // Resolve headshot: use stored path or discover by listing the folder
      let headshotPath = (data as any).headshot_url as string | null;
      const cardId = (data as any).id as string | undefined;

      if (!headshotPath && cardId) {
        const { data: files, error: listError } = await supabase
          .storage
          .from('headshots')
          .list(`${cardId}`, { limit: 1 });

        if (!listError && files && files.length > 0) {
          headshotPath = `${cardId}/${files[0].name}`;
          // Best-effort: persist discovered path
          await supabase
            .from('cards')
            .update({ headshot_url: headshotPath })
            .eq('id', cardId);
        }
      }

      const headshotUrl = headshotPath
        ? `${supabase.storage.from('headshots').getPublicUrl(headshotPath).data.publicUrl}`
        : null;
      
      console.log('Card data:', { 
        headshot_url: (data as any).headshot_url, 
        discovered_path: headshotPath,
        constructed_url: headshotUrl 
      });

      setCardData({
        name: data.full_name,
        title: data.role || '',
        company: data.company || '',
        phone: data.phone || '',
        email: data.email || '',
        website: data.website || '',
        socialLinks,
        style: data.style_id,
        slug: data.slug,
        createdAt: data.created_at,
        headshotUrl: headshotUrl || '',
      });
      setLoading(false);
    };

    fetchCard();
    
    // Auto-refresh after 500ms to catch any delayed database updates (e.g., headshot uploads)
    const refreshTimer = setTimeout(() => {
      if (!cardData?.headshotUrl) {
        console.log('Refreshing card data to check for headshot updates...');
        fetchCard();
      }
    }, 500);

    return () => clearTimeout(refreshTimer);
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
      socialLinks: cardData.socialLinks,
      headshotUrl: cardData.headshotUrl,
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
      case 'neon':
        return <NeonCard {...props} />;
      case 'floating':
        return <FloatingCard {...props} />;
      case 'liquid':
        return <LiquidCard {...props} />;
      case 'cosmic':
        return <CosmicCard {...props} />;
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
      case 'neon':
        return 'bg-gray-900';
      case 'floating':
        return 'bg-gradient-to-br from-blue-50 to-indigo-100';
      case 'liquid':
        return 'bg-gradient-to-br from-cyan-500/10 via-teal-500/10 to-blue-500/10';
      case 'cosmic':
        return 'bg-gradient-to-b from-black via-indigo-950 to-black';
      default:
        return 'bg-background';
    }
  };

  const renderBackgroundLayers = () => {
    switch (cardData.style) {
      case 'neon':
        return (
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20"></div>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
                animation: 'grid-move 6s linear infinite',
              }}
            />
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-pulse" />
          </div>
        );
      case 'floating':
        return (
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-20 left-10 w-4 h-4 bg-blue-300 rounded-full animate-bounce" />
            <div className="absolute top-40 right-20 w-6 h-6 bg-indigo-300 rounded-full animate-bounce delay-1000" />
            <div className="absolute top-60 left-1/3 w-3 h-3 bg-sky-300 rounded-full animate-bounce delay-2000" />
            <div className="absolute bottom-40 right-10 w-5 h-5 bg-cyan-300 rounded-full animate-bounce delay-500" />
            <div className="absolute bottom-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-1500" />
            <div className="absolute top-1/2 right-1/4 w-7 h-7 bg-indigo-200 rounded-full animate-bounce delay-3000" />
          </div>
        );
      case 'liquid':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-teal-400/20 to-blue-400/20 animate-[pulse_6s_ease-in-out_infinite]" />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl animate-[spin_20s_linear_infinite]" />
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl animate-[spin_25s_linear_infinite_reverse]" />
          </div>
        );
      case 'cosmic':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0" style={{
              background: `radial-gradient(2px 2px at 20px 30px, white, transparent), radial-gradient(2px 2px at 40px 70px, white, transparent), radial-gradient(1px 1px at 90px 40px, white, transparent)`,
              backgroundSize: '200px 100px',
              animation: 'star-move 30s linear infinite'
            }} />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 animate-[pulse_8s_ease-in-out_infinite]" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${getBackgroundClass()}`}>
      {renderBackgroundLayers()}
      <div className="relative z-10 p-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShare}
              className={(cardData.style === 'bold' || cardData.style === 'creative' || cardData.style === 'neon' || cardData.style === 'liquid' || cardData.style === 'cosmic') ? 
                "bg-white/10 text-white border-white/30 hover:bg-white/20" : 
                ""
              }
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Card Display */}
          <div className="flex justify-center mb-8">
            {renderCard()}
          </div>

          {/* QR Code Section */}
          <div className="flex justify-center mb-8">
            <div className={`rounded-lg p-6 ${
              (cardData.style === 'bold' || cardData.style === 'creative' || cardData.style === 'neon' || cardData.style === 'liquid' || cardData.style === 'cosmic') ? 
                'bg-white/10 backdrop-blur-sm border border-white/20' : 
                'bg-white/80 shadow-card'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 text-center ${
                (cardData.style === 'bold' || cardData.style === 'creative' || cardData.style === 'neon' || cardData.style === 'liquid' || cardData.style === 'cosmic') ? 'text-white' : ''
              }`}>
                Scan to View Card
              </h3>
              <QRCodeGenerator url={window.location.href} size={200} showControls={false} />
            </div>
          </div>

          {/* Small Brand CTA */}
          <div className="mt-6 text-center">
            <div className={`rounded-lg p-3 ${
              (cardData.style === 'bold' || cardData.style === 'creative' || cardData.style === 'neon' || cardData.style === 'liquid' || cardData.style === 'cosmic') ? 
                'bg-white/5 backdrop-blur-sm border border-white/10' : 
                'bg-white/60 shadow-sm'
            }`}>
              <p className={`text-xs mb-2 ${
                (cardData.style === 'bold' || cardData.style === 'creative' || cardData.style === 'neon' || cardData.style === 'liquid' || cardData.style === 'cosmic') ? 'text-white/70' : 'text-muted-foreground'
              }`}>
                Want your own digital business card?
              </p>
              <Button 
                onClick={() => navigate('/')}
                size="sm"
                variant="outline"
                className={(cardData.style === 'bold' || cardData.style === 'creative' || cardData.style === 'neon' || cardData.style === 'liquid' || cardData.style === 'cosmic') ? 
                  "bg-white/10 text-white/80 border-white/20 hover:bg-white/20 text-xs" : 
                  "text-xs"
                }
              >
                Create Your Own
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes grid-move { 0% { transform: translate(0, 0); } 100% { transform: translate(20px, 20px); } }
        @keyframes star-move { 0% { transform: translateX(0px) translateY(0px); } 100% { transform: translateX(-200px) translateY(-100px); } }
        `
      }} />
    </div>
  );
};

export default GeneratedCard;
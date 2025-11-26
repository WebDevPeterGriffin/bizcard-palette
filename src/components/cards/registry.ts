import { lazy } from 'react';
import type { BaseCardProps } from "./shared";

// Lazy load components for better performance
const MinimalCard = lazy(() => import("./MinimalCard"));
const BoldCard = lazy(() => import("./BoldCard"));
const ElegantCard = lazy(() => import("./ElegantCard"));
const CreativeCard = lazy(() => import("./CreativeCard"));
const NeonCard = lazy(() => import("./NeonCard"));
const FloatingCard = lazy(() => import("./FloatingCard"));
const LiquidCard = lazy(() => import("./LiquidCard"));
const CosmicCard = lazy(() => import("./CosmicCard"));
const HolographicCard = lazy(() => import("./HolographicCard"));
const ParticleCard = lazy(() => import("./ParticleCard"));
const MorphingCard = lazy(() => import("./MorphingCard"));
const PrismCard = lazy(() => import("./PrismCard"));
const LiquidGlassCard = lazy(() => import("./LiquidGlassCard"));

export type CardStyleId =
  | 'minimal'
  | 'bold'
  | 'elegant'
  | 'creative'
  | 'neon'
  | 'floating'
  | 'liquid'
  | 'cosmic'
  | 'holographic'
  | 'particle'
  | 'morphing'
  | 'prism'
  | 'liquid-glass';

export type CardComponent = React.ComponentType<BaseCardProps>;

export const CARD_COMPONENTS: Record<CardStyleId, CardComponent> = {
  minimal: MinimalCard,
  bold: BoldCard,
  elegant: ElegantCard,
  creative: CreativeCard,
  neon: NeonCard,
  floating: FloatingCard,
  liquid: LiquidCard,
  cosmic: CosmicCard,
  holographic: HolographicCard,
  particle: ParticleCard,
  morphing: MorphingCard,
  prism: PrismCard,
  "liquid-glass": LiquidGlassCard,
};

export interface CardStyleMeta {
  name: string;
  description: string;
  category: string;
  gradient: string;
  backgroundColor: string;
  isDark: boolean;
  buttonClasses: {
    save: string;
    book: string;
  };
  hasBackgroundAnimation?: boolean;
}

export const CARD_META: Record<CardStyleId, CardStyleMeta> = {
  minimal: {
    name: "Minimal White",
    description: "Clean, professional design with subtle borders and elegant typography",
    category: "Professional",
    gradient: "bg-gradient-minimal",
    backgroundColor: "bg-gradient-minimal",
    isDark: false,
    buttonClasses: {
      save: "border-minimal-accent/30 text-minimal-accent hover:bg-minimal-accent/10",
      book: "bg-minimal-accent text-white hover:bg-minimal-accent/90"
    }
  },
  bold: {
    name: "Bold Dark",
    description: "Dark background with bright accents and strong visual impact",
    category: "Modern",
    gradient: "bg-gradient-bold",
    backgroundColor: "bg-gradient-bold",
    isDark: true,
    buttonClasses: {
      save: "bg-white/10 text-white border-white/30 hover:bg-white/20",
      book: "bg-bold-accent text-bold-accent-foreground hover:bg-bold-accent/90"
    }
  },
  elegant: {
    name: "Elegant Cream",
    description: "Sophisticated design with muted tones and luxury aesthetic",
    category: "Professional",
    gradient: "bg-gradient-elegant",
    backgroundColor: "bg-gradient-elegant",
    isDark: false,
    buttonClasses: {
      save: "border-elegant-accent/30 text-elegant-accent hover:bg-elegant-accent/10",
      book: "bg-elegant-accent text-white hover:bg-elegant-accent/90"
    }
  },
  creative: {
    name: "Creative Colorful",
    description: "Vibrant gradients and playful design elements",
    category: "Creative",
    gradient: "bg-gradient-creative",
    backgroundColor: "bg-gradient-creative",
    isDark: true,
    buttonClasses: {
      save: "bg-white/10 text-white border-white/30 hover:bg-white/20",
      book: "bg-white text-creative-accent hover:bg-white/90"
    }
  },
  neon: {
    name: "Neon Cyber",
    description: "Cyberpunk-inspired with electric neon effects and glowing animations",
    category: "Modern",
    gradient: "bg-gradient-to-br from-purple-900 via-blue-900 to-black",
    backgroundColor: "bg-gray-900",
    isDark: true,
    buttonClasses: {
      save: "bg-white/10 text-white border-cyan-500/50 hover:bg-white/20",
      book: "bg-cyan-500 text-black hover:bg-cyan-400"
    },
    hasBackgroundAnimation: true
  },
  floating: {
    name: "Floating Cloud",
    description: "Serene floating elements with gentle cloud-like animations",
    category: "Creative",
    gradient: "bg-gradient-to-br from-blue-100 via-cyan-50 to-purple-100",
    backgroundColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
    isDark: false,
    buttonClasses: {
      save: "border-blue-200 text-blue-700 hover:bg-blue-50",
      book: "bg-blue-500 text-white hover:bg-blue-600"
    },
    hasBackgroundAnimation: true
  },
  liquid: {
    name: "Liquid Morph",
    description: "Dynamic liquid effects with flowing and morphing animations",
    category: "Creative",
    gradient: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600",
    backgroundColor: "bg-gradient-liquid-bg",
    isDark: true,
    buttonClasses: {
      save: "bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm",
      book: "bg-white/20 text-white border-white/40 hover:bg-white/30 backdrop-blur-sm"
    }
  },
  cosmic: {
    name: "Cosmic Space",
    description: "Stellar design with cosmic particles and orbital animations",
    category: "Modern",
    gradient: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900",
    backgroundColor: "bg-gradient-to-b from-black via-indigo-950 to-black",
    isDark: true,
    buttonClasses: {
      save: "bg-white/10 text-white border-white/30 hover:bg-white/20",
      book: "bg-blue-500 text-white hover:bg-blue-400"
    }
  },
  holographic: {
    name: "Holographic Glow",
    description: "Futuristic holographic effects with animated glowing borders and floating particles",
    category: "Modern",
    gradient: "bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500",
    backgroundColor: "bg-background",
    isDark: false,
    buttonClasses: {
      save: "border-minimal-accent/30 text-minimal-accent hover:bg-minimal-accent/10",
      book: "bg-minimal-accent text-white hover:bg-minimal-accent/90"
    }
  },
  particle: {
    name: "Particle Storm",
    description: "Dynamic particle system with morphing shapes and orbital animations",
    category: "Modern",
    gradient: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    backgroundColor: "bg-background",
    isDark: false,
    buttonClasses: {
      save: "border-minimal-accent/30 text-minimal-accent hover:bg-minimal-accent/10",
      book: "bg-minimal-accent text-white hover:bg-minimal-accent/90"
    }
  },
  morphing: {
    name: "Morphing Liquid",
    description: "Liquid morphing backgrounds with shape-shifting borders and fluid transitions",
    category: "Creative",
    gradient: "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600",
    backgroundColor: "bg-background",
    isDark: false,
    buttonClasses: {
      save: "border-minimal-accent/30 text-minimal-accent hover:bg-minimal-accent/10",
      book: "bg-minimal-accent text-white hover:bg-minimal-accent/90"
    }
  },
  prism: {
    name: "Prismatic Motion",
    description: "Conic gradients, light beams, and floating prism shapes",
    category: "Creative",
    gradient: "bg-gradient-to-br from-amber-400 via-pink-400 to-purple-600",
    backgroundColor: "bg-background",
    isDark: false,
    buttonClasses: {
      save: "border-minimal-accent/30 text-minimal-accent hover:bg-minimal-accent/10",
      book: "bg-minimal-accent text-white hover:bg-minimal-accent/90"
    }
  },
  "liquid-glass": {
    name: "Modern Glass Effect",
    description: "iOS 26-inspired translucent glass effects with blur and smooth animations",
    category: "Modern",
    gradient: "bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900",
    backgroundColor: "bg-background",
    isDark: false,
    buttonClasses: {
      save: "border-minimal-accent/30 text-minimal-accent hover:bg-minimal-accent/10",
      book: "bg-minimal-accent text-white hover:bg-minimal-accent/90"
    }
  },
};

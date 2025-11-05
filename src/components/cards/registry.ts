import type { BaseCardProps } from "./shared";
import MinimalCard from "./MinimalCard";
import BoldCard from "./BoldCard";
import ElegantCard from "./ElegantCard";
import CreativeCard from "./CreativeCard";
import NeonCard from "./NeonCard";
import FloatingCard from "./FloatingCard";
import LiquidCard from "./LiquidCard";
import CosmicCard from "./CosmicCard";
import PrismCard from "./PrismCard";
import LiquidGlassCard from "./LiquidGlassCard";
import { HolographicCard } from "./HolographicCard";
import { ParticleCard } from "./ParticleCard";
import { MorphingCard } from "./MorphingCard";

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

export type CardComponent = (props: BaseCardProps) => JSX.Element;

export const CARD_COMPONENTS: Record<CardStyleId, CardComponent> = {
  minimal: MinimalCard as unknown as CardComponent,
  bold: BoldCard as unknown as CardComponent,
  elegant: ElegantCard as unknown as CardComponent,
  creative: CreativeCard as unknown as CardComponent,
  neon: NeonCard as unknown as CardComponent,
  floating: FloatingCard as unknown as CardComponent,
  liquid: LiquidCard as unknown as CardComponent,
  cosmic: CosmicCard as unknown as CardComponent,
  holographic: HolographicCard as unknown as CardComponent,
  particle: ParticleCard as unknown as CardComponent,
  morphing: MorphingCard as unknown as CardComponent,
  prism: PrismCard as unknown as CardComponent,
  "liquid-glass": LiquidGlassCard as unknown as CardComponent,
};

export const CARD_META: Record<CardStyleId, { 
  name: string; 
  description: string; 
  category: string;
  gradient: string;
}> = {
  minimal: { 
    name: "Minimal Clean", 
    description: "Clean, professional design with subtle borders and elegant typography",
    category: "Professional",
    gradient: "bg-gradient-minimal"
  },
  bold: { 
    name: "Bold Modern", 
    description: "Dark background with bright accents and strong visual impact",
    category: "Modern",
    gradient: "bg-gradient-bold"
  },
  elegant: { 
    name: "Elegant Professional", 
    description: "Sophisticated design with muted tones and luxury aesthetic",
    category: "Professional",
    gradient: "bg-gradient-elegant"
  },
  creative: { 
    name: "Creative Colorful", 
    description: "Vibrant gradients and playful design elements",
    category: "Creative",
    gradient: "bg-gradient-creative"
  },
  neon: { 
    name: "Neon Cyber", 
    description: "Cyberpunk-inspired with electric neon effects and glowing animations",
    category: "Modern",
    gradient: "bg-gradient-to-br from-purple-900 via-blue-900 to-black"
  },
  floating: { 
    name: "Floating Cloud", 
    description: "Serene floating elements with gentle cloud-like animations",
    category: "Creative",
    gradient: "bg-gradient-to-br from-blue-100 via-cyan-50 to-purple-100"
  },
  liquid: { 
    name: "Liquid Morph", 
    description: "Dynamic liquid effects with flowing and morphing animations",
    category: "Creative",
    gradient: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600"
  },
  cosmic: { 
    name: "Cosmic Space", 
    description: "Stellar design with cosmic particles and orbital animations",
    category: "Modern",
    gradient: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
  },
  holographic: { 
    name: "Holographic Glow", 
    description: "Futuristic holographic effects with animated glowing borders and floating particles",
    category: "Modern",
    gradient: "bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500"
  },
  particle: { 
    name: "Particle Storm", 
    description: "Dynamic particle system with morphing shapes and orbital animations",
    category: "Modern",
    gradient: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  },
  morphing: { 
    name: "Morphing Liquid", 
    description: "Liquid morphing backgrounds with shape-shifting borders and fluid transitions",
    category: "Creative",
    gradient: "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"
  },
  prism: { 
    name: "Prismatic Motion", 
    description: "Conic gradients, light beams, and floating prism shapes",
    category: "Creative",
    gradient: "bg-gradient-to-br from-amber-400 via-pink-400 to-purple-600"
  },
  "liquid-glass": { 
    name: "Liquid Glass", 
    description: "iOS 26-inspired translucent glass effects with blur and smooth animations",
    category: "Modern",
    gradient: "bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900"
  },
};



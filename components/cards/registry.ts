import { lazy } from 'react';
import type { BaseCardProps } from "./shared";
import type { CardStyleId } from '@/types/card';

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

// CardStyleId type is now imported from @/types/card (line 3)
// Re-export it here for backward compatibility with existing imports
export type { CardStyleId } from '@/types/card';

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
  },
  bold: {
    name: "Bold Dark",
    description: "Dark background with bright accents and strong visual impact",
    category: "Modern",
    gradient: "bg-gradient-bold",
    backgroundColor: "bg-gradient-bold",
    isDark: true,
  },
  elegant: {
    name: "Elegant Cream",
    description: "Sophisticated design with muted tones and luxury aesthetic",
    category: "Professional",
    gradient: "bg-gradient-elegant",
    backgroundColor: "bg-gradient-elegant",
    isDark: false,
  },
  creative: {
    name: "Creative Colorful",
    description: "Vibrant gradients and playful design elements",
    category: "Creative",
    gradient: "bg-gradient-creative",
    backgroundColor: "bg-gradient-creative",
    isDark: true,
  },
  neon: {
    name: "Neon Cyber",
    description: "Cyberpunk-inspired with electric neon effects and glowing animations",
    category: "Modern",
    gradient: "bg-gradient-to-br from-purple-900 via-blue-900 to-black",
    backgroundColor: "bg-gray-900",
    isDark: true,
    hasBackgroundAnimation: true
  },
  floating: {
    name: "Floating Cloud",
    description: "Serene floating elements with gentle cloud-like animations",
    category: "Creative",
    gradient: "bg-gradient-to-br from-blue-100 via-cyan-50 to-purple-100",
    backgroundColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
    isDark: false,
    hasBackgroundAnimation: true
  },
  liquid: {
    name: "Liquid Morph",
    description: "Dynamic liquid effects with flowing and morphing animations",
    category: "Creative",
    gradient: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600",
    backgroundColor: "bg-gradient-liquid-bg",
    isDark: true,
  },
  cosmic: {
    name: "Cosmic Space",
    description: "Stellar design with cosmic particles and orbital animations",
    category: "Modern",
    gradient: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900",
    backgroundColor: "bg-gradient-to-b from-black via-indigo-950 to-black",
    isDark: true,
  },
  holographic: {
    name: "Holographic Glow",
    description: "Futuristic holographic effects with animated glowing borders and floating particles",
    category: "Modern",
    gradient: "bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500",
    backgroundColor: "bg-background",
    isDark: false,
  },
  particle: {
    name: "Particle Storm",
    description: "Dynamic particle system with morphing shapes and orbital animations",
    category: "Modern",
    gradient: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    backgroundColor: "bg-background",
    isDark: true,
  },
  morphing: {
    name: "Morphing Liquid",
    description: "Liquid morphing backgrounds with shape-shifting borders and fluid transitions",
    category: "Creative",
    gradient: "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600",
    backgroundColor: "bg-background",
    isDark: true,
  },
  prism: {
    name: "Prismatic Motion",
    description: "Conic gradients, light beams, and floating prism shapes",
    category: "Creative",
    gradient: "bg-gradient-to-br from-amber-400 via-pink-400 to-purple-600",
    backgroundColor: "bg-background",
    isDark: false,
  },
  "liquid-glass": {
    name: "Modern Glass Effect",
    description: "iOS 26-inspired translucent glass effects with blur and smooth animations",
    category: "Modern",
    gradient: "bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900",
    backgroundColor: "bg-background",
    isDark: true,
  },
};

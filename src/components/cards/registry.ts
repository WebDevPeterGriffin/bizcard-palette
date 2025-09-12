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
  | 'prism';

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
};

export const CARD_META: Record<CardStyleId, { name: string; description: string }> = {
  minimal: { name: "Minimal Clean", description: "Clean, professional design with subtle borders and elegant typography" },
  bold: { name: "Bold Modern", description: "Dark background with bright accents and strong visual impact" },
  elegant: { name: "Elegant Professional", description: "Sophisticated design with muted tones and luxury aesthetic" },
  creative: { name: "Creative Colorful", description: "Vibrant gradients and playful design elements" },
  neon: { name: "Neon Cyber", description: "Cyberpunk-inspired with electric neon effects and glowing animations" },
  floating: { name: "Floating Cloud", description: "Serene floating elements with gentle cloud-like animations" },
  liquid: { name: "Liquid Morph", description: "Dynamic liquid effects with flowing and morphing animations" },
  cosmic: { name: "Cosmic Space", description: "Stellar design with cosmic particles and orbital animations" },
  holographic: { name: "Holographic Glow", description: "Futuristic holographic effects with animated glowing borders and floating particles" },
  particle: { name: "Particle Storm", description: "Dynamic particle system with morphing shapes and orbital animations" },
  morphing: { name: "Morphing Liquid", description: "Liquid morphing backgrounds with shape-shifting borders and fluid transitions" },
  prism: { name: "Prismatic Motion", description: "Conic gradients, light beams, and floating prism shapes" },
};



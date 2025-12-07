export const LANDING_PAGE_META = {
  "modern-saas": {
    name: "Modern SaaS",
    description: "A sleek, conversion-focused landing page perfect for SaaS products and tech startups",
    category: "Professional",
    gradient: "bg-gradient-to-br from-brand-primary to-brand-secondary",
    features: [
      "Hero section with email capture",
      "Feature showcase grid",
      "Social proof section",
      "Testimonials carousel",
      "Multiple CTA sections",
      "Fully responsive design"
    ],
    bestFor: "SaaS products, tech startups, and digital services looking to maximize conversions"
  }
} as const;

export type LandingPageStyleId = keyof typeof LANDING_PAGE_META;

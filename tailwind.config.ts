import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Brand Colors
        brand: {
          primary: "hsl(var(--brand-primary))",
          "primary-foreground": "hsl(var(--brand-primary-foreground))",
          secondary: "hsl(var(--brand-secondary))",
          accent: "hsl(var(--brand-accent))",
        },
        // Card Template Colors
        minimal: {
          accent: "hsl(var(--minimal-accent))",
          "accent-foreground": "hsl(var(--minimal-accent-foreground))",
        },
        bold: {
          accent: "hsl(var(--bold-accent))",
          "accent-foreground": "hsl(var(--bold-accent-foreground))",
          bg: "hsl(var(--bold-bg))",
        },
        elegant: {
          accent: "hsl(var(--elegant-accent))",
          "accent-foreground": "hsl(var(--elegant-accent-foreground))",
          bg: "hsl(var(--elegant-bg))",
        },
        creative: {
          accent: "hsl(var(--creative-accent))",
          "accent-foreground": "hsl(var(--creative-accent-foreground))",
        },
        liquid: {
          primary: "hsl(var(--liquid-primary))",
          secondary: "hsl(var(--liquid-secondary))",
          tertiary: "hsl(var(--liquid-tertiary))",
          "bg-start": "hsl(var(--liquid-bg-start))",
          "bg-mid": "hsl(var(--liquid-bg-mid))",
          "bg-end": "hsl(var(--liquid-bg-end))",
        },
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-minimal": "var(--gradient-minimal)",
        "gradient-bold": "var(--gradient-bold)",
        "gradient-elegant": "var(--gradient-elegant)",
        "gradient-creative": "var(--gradient-creative)",
        "gradient-liquid": "var(--gradient-liquid)",
        "gradient-liquid-bg": "var(--gradient-liquid-bg)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        hero: "var(--shadow-hero)",
      },
      transitionTimingFunction: {
        smooth: "var(--transition-smooth)",
        bounce: "var(--transition-bounce)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

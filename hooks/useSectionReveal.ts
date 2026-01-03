"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

// Register ScrollTrigger once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useSectionReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        // Ensure element is visible without animation
        gsap.set(element, { opacity: 1, y: 0, clearProps: "all" });
        return;
      }

      // Initial state
      gsap.set(element, { opacity: 0, y: 50 });

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 85%", // Trigger when top of section hits 85% of viewport height
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(element, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform", // Clear transform after animation to prevent stacking context issues if needed, though usually keeping it is fine. 
        // For reveal, we might want to keep it at 0. Let's remove clearProps for now to ensure it stays in place.
      });

      return () => {
        tl.kill();
      };
    },
    { scope: ref }
  ); // useGSAP handles cleanup of animations and ScrollTriggers created within this scope

  return ref;
}

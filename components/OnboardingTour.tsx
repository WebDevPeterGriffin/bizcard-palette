"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TourStep {
    targetId: string;
    title: string;
    description: string;
    position?: "top" | "bottom" | "left" | "right";
}

interface OnboardingTourProps {
    steps: TourStep[];
    isOpen: boolean;
    onComplete: () => void;
    onSkip: () => void;
}

export function OnboardingTour({ steps, isOpen, onComplete, onSkip }: OnboardingTourProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    const currentStep = steps[currentStepIndex];

    const updateTargetRect = useCallback(() => {
        if (!currentStep) return;
        const element = document.getElementById(currentStep.targetId);
        if (element) {
            // Scroll element into view if needed
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            setTargetRect(element.getBoundingClientRect());
        } else {
            // If element not found, maybe skip step or wait?
            // For now, let's just try again in a bit in case of rendering delays
            setTimeout(() => {
                const el = document.getElementById(currentStep.targetId);
                if (el) setTargetRect(el.getBoundingClientRect());
            }, 500);
        }
    }, [currentStep]);

    // Reset index when tour opens
    useEffect(() => {
        if (isOpen) {
            setCurrentStepIndex(0);
        }
    }, [isOpen]);

    // Update rect and listeners
    useEffect(() => {
        if (isOpen) {
            updateTargetRect();
            window.addEventListener("resize", updateTargetRect);
            window.addEventListener("scroll", updateTargetRect);
        }
        return () => {
            window.removeEventListener("resize", updateTargetRect);
            window.removeEventListener("scroll", updateTargetRect);
        };
    }, [isOpen, currentStepIndex, updateTargetRect]);

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        }
    };

    if (!isOpen || !currentStep) return null;

    // Calculate tooltip position
    const getTooltipStyle = () => {
        if (!targetRect) return {};

        const spacing = 20;
        const tooltipWidth = 320; // Approximate width
        const position = currentStep.position || "bottom";

        let top = 0;
        let left = 0;

        switch (position) {
            case "top":
                top = targetRect.top - spacing;
                left = targetRect.left + targetRect.width / 2;
                break;
            case "bottom":
                top = targetRect.bottom + spacing;
                left = targetRect.left + targetRect.width / 2;
                break;
            case "left":
                top = targetRect.top + targetRect.height / 2;
                left = targetRect.left - spacing;
                break;
            case "right":
                top = targetRect.top + targetRect.height / 2;
                left = targetRect.right + spacing;
                break;
        }

        return { top, left };
    };

    const tooltipPos = getTooltipStyle();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 pointer-events-none">
                    {/* Backdrop with cutout */}
                    <div className="absolute inset-0 bg-black/60 transition-colors duration-500" />

                    {/* Spotlight */}
                    {targetRect && (
                        <motion.div
                            initial={false}
                            animate={{
                                top: targetRect.top - 4,
                                left: targetRect.left - 4,
                                width: targetRect.width + 8,
                                height: targetRect.height + 8,
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="absolute rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] pointer-events-none ring-2 ring-brand-secondary ring-offset-2 ring-offset-transparent"
                        />
                    )}

                    {/* Tooltip */}
                    {targetRect && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: 1,
                                top: tooltipPos.top,
                                left: tooltipPos.left,
                                x: currentStep.position === "left" || currentStep.position === "right" ? 0 : "-50%",
                                y: currentStep.position === "left" || currentStep.position === "right" ? "-50%" : 0
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className={cn(
                                "absolute pointer-events-auto w-80 bg-white rounded-xl shadow-2xl p-6 border border-slate-100",
                                currentStep.position === "left" && "-translate-x-full -translate-y-1/2",
                                currentStep.position === "right" && "-translate-y-1/2",
                                (!currentStep.position || currentStep.position === "bottom") && "-translate-x-1/2",
                                currentStep.position === "top" && "-translate-x-1/2 -translate-y-full"
                            )}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
                                        Step {currentStepIndex + 1} of {steps.length}
                                    </span>
                                    <h3 className="text-lg font-bold text-brand-primary">
                                        {currentStep.title}
                                    </h3>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 -mt-2 -mr-2 text-slate-400 hover:text-slate-600"
                                    onClick={onSkip}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                {currentStep.description}
                            </p>

                            <div className="flex items-center justify-between">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleBack}
                                    disabled={currentStepIndex === 0}
                                    className="text-slate-500 hover:text-slate-900"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Back
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    size="sm"
                                    className="bg-brand-primary text-white hover:bg-brand-primary/90"
                                >
                                    {currentStepIndex === steps.length - 1 ? "Finish" : "Next"}
                                    {currentStepIndex !== steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}
        </AnimatePresence>
    );
}

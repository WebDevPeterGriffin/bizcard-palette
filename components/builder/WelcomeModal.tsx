"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MousePointer2, Palette, Share2, Undo2, Move, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
    {
        icon: MousePointer2,
        title: "Click to Edit",
        description: "Click on any text on the page to edit it directly. Your changes appear instantly!",
    },
    {
        icon: Palette,
        title: "Customize Colors",
        description: "Use the Colors tab to set your brand's primary and secondary colors.",
    },
    {
        icon: Share2,
        title: "Add Your Socials",
        description: "Go to Content tab to add your social media links. Empty = hidden!",
    },
    {
        icon: Undo2,
        title: "Undo Mistakes",
        description: "Press Ctrl+Z to undo, Ctrl+Y to redo. Or use the buttons in the panel.",
    },
    {
        icon: Move,
        title: "Move the Panel",
        description: "Drag the Builder panel anywhere on screen by grabbing its header.",
    },
];

export const WelcomeModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const hasSeenWelcome = localStorage.getItem("builder-welcome-seen");
        if (!hasSeenWelcome) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem("builder-welcome-seen", "true");
        setIsOpen(false);
    };

    const handleOpen = () => {
        setCurrentStep(0);
        setIsOpen(true);
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            handleClose();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const CurrentIcon = steps[currentStep].icon;

    return (
        <>
            {/* Floating Help Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpen}
                        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-slate-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-800 transition-colors"
                        title="View Instructions"
                    >
                        <HelpCircle className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 pb-12">
                                <h2 className="text-2xl font-bold mb-2">Welcome to the Builder! 🎨</h2>
                                <p className="text-slate-300 text-sm">
                                    Let&apos;s quickly show you how to customize your website.
                                </p>
                            </div>

                            {/* Content */}
                            <div className="p-6 -mt-6">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white rounded-xl shadow-lg border border-slate-100 p-6"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                            <CurrentIcon className="w-6 h-6 text-amber-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg mb-1">
                                                {steps[currentStep].title}
                                            </h3>
                                            <p className="text-slate-600 text-sm">
                                                {steps[currentStep].description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Progress Dots */}
                                <div className="flex justify-center gap-2 mt-6">
                                    {steps.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentStep(index)}
                                            className={`w-2 h-2 rounded-full transition-all ${index === currentStep
                                                ? "bg-amber-500 w-6"
                                                : "bg-slate-200 hover:bg-slate-300"
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Navigation */}
                                <div className="flex justify-between mt-6">
                                    <Button
                                        variant="ghost"
                                        onClick={handlePrev}
                                        disabled={currentStep === 0}
                                        className="text-slate-500"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        onClick={handleNext}
                                        className="bg-slate-900 hover:bg-slate-800"
                                    >
                                        {currentStep === steps.length - 1 ? "Get Started!" : "Next"}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

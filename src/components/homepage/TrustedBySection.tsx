import React from "react";

export default function TrustedBySection() {
    // Placeholder logos using text for now, styled to look like logos
    const logos = [
        "TechFlow",
        "StudioOne",
        "CreativeMinds",
        "NextLevel",
        "Artisan",
        "GrowthCo"
    ];

    return (
        <section className="py-10 border-b border-slate-100 bg-white">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
                    Trusted by creators, professionals, and small businesses
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {logos.map((logo, index) => (
                        <span
                            key={index}
                            className="text-xl md:text-2xl font-bold text-slate-400 hover:text-[#1A2D49] transition-colors cursor-default select-none"
                        >
                            {logo}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}

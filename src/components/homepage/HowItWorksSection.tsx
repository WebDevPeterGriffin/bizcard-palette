export default function HowItWorksSection() {
    return (
        <section className="px-4 py-20 bg-white">
            <div className="container mx-auto max-w-4xl">
                <h2 className="mb-16 text-center text-3xl md:text-4xl font-bold text-slate-900">How It Works</h2>
                <div className="grid gap-12 md:grid-cols-3 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>

                    <div className="text-center relative">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1A2D49] text-white text-2xl font-bold shadow-lg ring-4 ring-white">
                            1
                        </div>
                        <h3 className="mb-3 text-lg font-bold text-slate-900">Choose a Style</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Browse our 13 beautiful templates and pick the one that matches your personality.
                        </p>
                    </div>
                    <div className="text-center relative">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1A2D49] text-white text-2xl font-bold shadow-lg ring-4 ring-white">
                            2
                        </div>
                        <h3 className="mb-3 text-lg font-bold text-slate-900">Fill Your Info</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Complete our simple form with your contact details and social links.
                        </p>
                    </div>
                    <div className="text-center relative">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0B429] text-[#1A2D49] text-2xl font-bold shadow-lg ring-4 ring-white">
                            3
                        </div>
                        <h3 className="mb-3 text-lg font-bold text-slate-900">Get Your Card</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Instantly receive your personalized digital business card with a custom URL.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

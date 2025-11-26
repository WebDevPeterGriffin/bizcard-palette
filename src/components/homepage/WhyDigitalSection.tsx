import { Leaf, Share2, Zap } from "lucide-react";

export default function WhyDigitalSection() {
    return (
        <section className="px-4 py-20 bg-slate-50">
            <div className="container mx-auto max-w-6xl">
                <h2 className="mb-16 text-center text-3xl md:text-4xl font-bold text-slate-900">Why Go Digital?</h2>
                <div className="grid gap-10 md:grid-cols-3">
                    <div className="text-center px-4">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                            <Leaf className="h-10 w-10 text-emerald-600" />
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-slate-900">Eco-Friendly</h3>
                        <p className="text-slate-600 leading-relaxed">
                            No paper waste. Digital cards are environmentally responsible and sustainable for our planet.
                        </p>
                    </div>
                    <div className="text-center px-4">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                            <Share2 className="h-10 w-10 text-blue-600" />
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-slate-900">Easy Sharing</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Share instantly via QR code, email, or direct link. Your information is always up-to-date.
                        </p>
                    </div>
                    <div className="text-center px-4">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                            <Zap className="h-10 w-10 text-[#F0B429]" />
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-slate-900">Modern & Interactive</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Stand out with professional design, clickable links, and interactive contact information.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

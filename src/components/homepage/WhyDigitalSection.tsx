import { Leaf, Share2, Zap } from "lucide-react";

export default function WhyDigitalSection() {
    const benefits = [
        {
            title: "Fast Deployment",
            description: "Launch your digital business card or website in minutes, not days."
        },
        {
            title: "Professional Designs",
            description: "Choose from our curated collection of modern, high-converting templates."
        },
        {
            title: "Mobile Optimized",
            description: "Every design is built mobile-first to look perfect on any device."
        },
        {
            title: "Custom Domains",
            description: "Connect your own domain name for a truly professional brand presence."
        },
        {
            title: "Easy Sharing",
            description: "Share your profile instantly via QR code, link, or NFC."
        },
        {
            title: "AI-Powered Tools",
            description: "Smart features to help you write better copy and optimize your content."
        }
    ];

    return (
        <section className="py-24 px-4 bg-white relative overflow-hidden">
            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1A2D49] mb-4">
                        Why Choose Mild Tech Studios?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We build tools that help you stand out in the digital world.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-[#F0B429]/30 hover:shadow-lg transition-all group"
                        >
                            <h3 className="text-xl font-bold text-[#1A2D49] mb-3 group-hover:text-[#F0B429] transition-colors">
                                {benefit.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Check, HelpCircle } from "lucide-react";
import { useWaitlist } from "@/hooks/useWaitlist";
import { useNavigate } from "react-router-dom";
import FAQ from "@/components/FAQ";

export default function Pricing() {
    const { openWaitlist } = useWaitlist();
    const navigate = useNavigate();

    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "Perfect for individuals just starting out.",
            features: [
                "1 Digital Business Card",
                "Basic Website Templates",
                "Standard Analytics",
                "Community Support"
            ],
            cta: "Join Waitlist",
            action: openWaitlist,
            popular: false
        },
        {
            name: "Creator",
            price: "$12",
            period: "/month",
            description: "For professionals building their personal brand.",
            features: [
                "Unlimited Business Cards",
                "All Website Templates",
                "Custom Domain Connection",
                "Advanced Analytics",
                "Priority Support",
                "Remove Branding"
            ],
            cta: "Upgrade Now",
            action: () => navigate('/request'), // Placeholder for upgrade flow
            popular: true
        },
        {
            name: "Studio",
            price: "$49",
            period: "/month",
            description: "For agencies and businesses scaling up.",
            features: [
                "Everything in Creator",
                "Done-For-You Setup",
                "Team Dashboard",
                "AI Content Generation",
                "Dedicated Account Manager",
                "API Access"
            ],
            cta: "Book a Call",
            action: () => window.location.href = "mailto:hello@mildtechstudios.com",
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <Navbar />

            {/* Hero Section */}
            {/* Hero Section */}
            <PageHero
                title={<>Simple Pricing for <span className="text-[#F0B429]">Every Creator</span></>}
                subtitle="Choose the plan that fits your goals. No hidden fees. Cancel anytime."
            />

            {/* Plans Grid */}
            <section className="py-24 px-4 bg-slate-50 -mt-10">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative bg-white rounded-2xl p-8 shadow-lg border ${plan.popular
                                    ? "border-[#F0B429] shadow-xl scale-105 z-10"
                                    : "border-slate-100 hover:shadow-xl transition-all"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F0B429] text-[#1A2D49] px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-[#1A2D49] mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                                        {plan.period && <span className="text-slate-500">{plan.period}</span>}
                                    </div>
                                    <p className="text-slate-600 text-sm">{plan.description}</p>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className={`w-full py-6 font-bold text-lg ${plan.popular
                                        ? "bg-[#1A2D49] text-white hover:bg-[#2a456b]"
                                        : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                                        }`}
                                    onClick={plan.action}
                                >
                                    {plan.cta}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-4 bg-white">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl font-bold text-[#1A2D49] text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    <FAQ />
                </div>
            </section>

            <Footer />
        </div>
    );
}

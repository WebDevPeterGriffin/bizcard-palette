import { ArrowRight, Smartphone, Layout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ProductOverviewSection() {
    const navigate = useNavigate();

    return (
        <section id="products" className="py-20 px-4 bg-slate-50">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1A2D49] mb-4">
                        Our Products
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Everything you need to build a professional online presence.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Product 1: Digital Business Cards */}
                    <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-slate-100 overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F0B429]/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 group-hover:bg-[#F0B429]/20 transition-all"></div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-[#1A2D49] rounded-2xl flex items-center justify-center mb-6 text-[#F0B429]">
                                <Smartphone className="w-7 h-7" />
                            </div>

                            <h3 className="text-2xl font-bold text-[#1A2D49] mb-3">
                                Digital Business Cards
                            </h3>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Create a stunning digital business card in seconds. Share your contact info, social links, and more with a simple QR code or link.
                            </p>

                            <Button
                                variant="outline-brand"
                                onClick={() => navigate('/styles')}
                            >
                                View Card Styles
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Product 2: Website Templates */}
                    <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-slate-100 overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1A2D49]/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 group-hover:bg-[#1A2D49]/10 transition-all"></div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-[#F0B429] rounded-2xl flex items-center justify-center mb-6 text-[#1A2D49]">
                                <Layout className="w-7 h-7" />
                            </div>

                            <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-2xl font-bold text-[#1A2D49]">
                                    Website Templates
                                </h3>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wide">
                                    New
                                </span>
                            </div>

                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Launch a professional website in minutes with our modern, mobile-optimized templates. Perfect for portfolios, restaurants, and small businesses.
                            </p>

                            <Button
                                variant="brand"
                                onClick={() => navigate('/websites')}
                            >
                                Browse Website Templates
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

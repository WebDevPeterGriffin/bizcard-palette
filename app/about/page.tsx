import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/MainLayout";
import { Sparkles, Shield, Zap, Users, ArrowRight, Target, Heart, Globe } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us | Mild Tech Studios",
    description: "Learn about Mild Tech Studios - building digital identity solutions for professionals and creators.",
};

export default function AboutPage() {
    return (
        <MainLayout>
            <div className="min-h-screen bg-white font-sans text-slate-900">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-[#F2EDE7] py-24 md:py-32">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#F0B429]/10 blur-3xl"></div>
                        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#1A2D49]/5 blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-[#1A2D49]/10 text-[#1A2D49] text-sm font-medium mb-6 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-[#F0B429]" />
                            <span>Redefining Digital Identity</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-[#1A2D49] mb-6 tracking-tight">
                            We Build Tools for <br className="hidden md:block" />
                            <span className="text-[#F0B429]">Modern Professionals</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                            Mild Tech Studios is on a mission to simplify web presence. We empower creators, entrepreneurs, and professionals to stand out in a digital-first world.
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-20 md:py-32">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-[#F0B429]/20 rounded-2xl transform -rotate-2"></div>
                                <div className="relative bg-[#1A2D49] rounded-2xl p-8 md:p-12 text-white shadow-xl">
                                    <Target className="w-12 h-12 text-[#F0B429] mb-6" />
                                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                                        We believe everyone deserves a powerful digital presence. Whether you're a real estate agent, consultant, or creative, your online identity should reflect your unique value without technical barriers.
                                    </p>
                                    <p className="text-slate-300 text-lg leading-relaxed">
                                        We've created an ecosystem of tools that bridge the gap between professional design and ease of use.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#1A2D49] mb-2">Speed & Simplicity</h3>
                                        <p className="text-slate-600">We obsess over removing friction. What used to take days now takes minutes.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                                        <Heart className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#1A2D49] mb-2">Design Excellence</h3>
                                        <p className="text-slate-600">We don't compromise on aesthetics. Our templates are crafted by world-class designers.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#1A2D49] mb-2">Reliability & Trust</h3>
                                        <p className="text-slate-600">Built on enterprise-grade infrastructure to keep your digital presence secure and always online.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values / Stats Section */}
                <section className="bg-[#1A2D49] py-20 text-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                            <div>
                                <div className="text-4xl font-bold text-[#F0B429] mb-2">10k+</div>
                                <div className="text-slate-400 text-sm uppercase tracking-wider">Cards Created</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-[#F0B429] mb-2">99.9%</div>
                                <div className="text-slate-400 text-sm uppercase tracking-wider">Uptime</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-[#F0B429] mb-2">50+</div>
                                <div className="text-slate-400 text-sm uppercase tracking-wider">Templates</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-[#F0B429] mb-2">24/7</div>
                                <div className="text-slate-400 text-sm uppercase tracking-wider">Support</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What We Offer */}
                <section className="py-24 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1A2D49] mb-4">Our Ecosystem</h2>
                            <p className="text-slate-600 text-lg">Everything you need to build, manage, and grow your personal brand online.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {/* Product 1 */}
                            <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-[#F0B429]/30">
                                <div className="w-14 h-14 bg-[#F0B429]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Users className="w-7 h-7 text-[#F0B429]" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A2D49] mb-3">Digital Business Cards</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    The modern way to share contact info. NFC-enabled, QR code ready, and fully customizable. Ditch the paper and go digital.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center text-sm text-slate-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#F0B429] mr-2"></div>
                                        Instant sharing via QR or NFC
                                    </li>
                                    <li className="flex items-center text-sm text-slate-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#F0B429] mr-2"></div>
                                        Analytics and lead capture
                                    </li>
                                    <li className="flex items-center text-sm text-slate-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#F0B429] mr-2"></div>
                                        Eco-friendly alternative
                                    </li>
                                </ul>
                                <Link href="/styles">
                                    <Button variant="outline" className="w-full group-hover:bg-[#F0B429] group-hover:text-[#1A2D49] group-hover:border-[#F0B429] transition-all">
                                        Explore Styles
                                    </Button>
                                </Link>
                            </div>

                            {/* Product 2 */}
                            <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-[#1A2D49]/30">
                                <div className="w-14 h-14 bg-[#1A2D49]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Globe className="w-7 h-7 text-[#1A2D49]" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A2D49] mb-3">Professional Websites</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    Launch a stunning website in minutes with our industry-specific templates. Perfect for portfolios, agencies, and small businesses.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center text-sm text-slate-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#1A2D49] mr-2"></div>
                                        SEO optimized out of the box
                                    </li>
                                    <li className="flex items-center text-sm text-slate-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#1A2D49] mr-2"></div>
                                        Custom domain connection
                                    </li>
                                    <li className="flex items-center text-sm text-slate-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#1A2D49] mr-2"></div>
                                        Mobile-first responsive design
                                    </li>
                                </ul>
                                <Link href="/templates">
                                    <Button variant="outline" className="w-full group-hover:bg-[#1A2D49] group-hover:text-white group-hover:border-[#1A2D49] transition-all">
                                        View Templates
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="container mx-auto px-4 py-24 text-center">
                    <div className="relative bg-[#1A2D49] rounded-3xl p-10 md:p-20 overflow-hidden shadow-2xl">
                        {/* Abstract shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F0B429]/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                                Ready to Elevate Your Brand?
                            </h2>
                            <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                                Join thousands of professionals who trust Mild Tech Studios to manage their digital identity. Start for free today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/auth/signup">
                                    <Button size="lg" className="bg-[#F0B429] text-[#1A2D49] hover:bg-[#d9a325] font-bold px-8 h-14 text-lg w-full sm:w-auto">
                                        Get Started Free
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-14 text-lg w-full sm:w-auto">
                                        Contact Sales
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}

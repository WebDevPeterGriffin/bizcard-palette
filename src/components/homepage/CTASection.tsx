import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
    const navigate = useNavigate();

    return (
        <>
            {/* CTA Section */}
            <section className="relative px-4 py-24 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[#1A2D49]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A2D49] to-[#2a456b] opacity-90"></div>
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F0B429]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto max-w-4xl relative z-10">
                    <h2 className="mb-6 text-3xl md:text-5xl font-bold text-white tracking-tight">
                        Ready to Go Digital?
                    </h2>
                    <p className="mb-10 text-xl text-white/80 max-w-2xl mx-auto">
                        Join 10,000+ professionals who've made the switch to digital business cards.
                    </p>
                    <Button
                        size="lg"
                        className="bg-[#F0B429] text-[#1A2D49] hover:bg-[#ffcc52] hover:scale-105 transition-all shadow-xl px-10 py-7 text-lg font-bold rounded-full"
                        onClick={() => navigate('/request')}
                    >
                        Create Your Card Free
                        <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-50 border-t border-slate-200 px-4 py-12">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="mb-6">
                        <span className="text-2xl font-bold text-[#1A2D49]">BizCard</span>
                    </div>
                    <p className="text-slate-500 mb-6">
                        © 2024 Digital Business Cards. Creating modern connections.
                    </p>
                    <div className="flex justify-center gap-6 text-sm text-slate-400">
                        <a href="#" className="hover:text-[#1A2D49] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#1A2D49] transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-[#1A2D49] transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </>
    );
}

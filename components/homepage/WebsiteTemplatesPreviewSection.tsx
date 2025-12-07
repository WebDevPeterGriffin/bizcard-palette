import { ArrowRight, Layout, Utensils, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function WebsiteTemplatesPreviewSection() {
    const navigate = useNavigate();

    const templates = [
        {
            title: "Modern Portfolio",
            icon: <Layout className="w-8 h-8 text-[#F0B429]" />,
            description: "Showcase your work with a sleek, minimalist design.",
            color: "bg-slate-900"
        },
        {
            title: "Restaurant / Café",
            icon: <Utensils className="w-8 h-8 text-[#F0B429]" />,
            description: "Menu integration, reservations, and beautiful galleries.",
            color: "bg-[#1A2D49]"
        },
        {
            title: "Business Landing",
            icon: <Briefcase className="w-8 h-8 text-[#F0B429]" />,
            description: "Convert visitors into customers with a high-impact landing page.",
            color: "bg-slate-800"
        }
    ];

    return (
        <section className="py-20 px-4 bg-slate-50">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1A2D49] mb-4">
                        Website Templates
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                        Coming soon: Professional website templates to launch your brand.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {templates.map((template, index) => (
                        <div
                            key={index}
                            className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                        >
                            {/* Placeholder Background */}
                            <div className={`absolute inset-0 ${template.color} flex flex-col items-center justify-center p-8 text-center`}>
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                    {template.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {template.title}
                                </h3>
                                <p className="text-white/70 text-sm">
                                    {template.description}
                                </p>

                                {/* Coming Soon Badge */}
                                <div className="absolute top-4 right-4 px-3 py-1 bg-[#F0B429] text-[#1A2D49] text-xs font-bold rounded-full uppercase tracking-wider">
                                    Coming Soon
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Button
                        variant="brand"
                        onClick={() => navigate('/websites')}
                        className="px-8 py-6 text-lg"
                    >
                        Open Website Templates Page
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}

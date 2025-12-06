import React from "react";
import { Palette, Laptop, Store, Building2, Coffee, Home } from "lucide-react";

export default function AudienceSection() {
    const audiences = [
        {
            icon: <Palette className="w-6 h-6 text-[#F0B429]" />,
            title: "Creators",
            description: "Showcase your portfolio and artistic work."
        },
        {
            icon: <Laptop className="w-6 h-6 text-[#F0B429]" />,
            title: "Freelancers",
            description: "Present your services and book more clients."
        },
        {
            icon: <Store className="w-6 h-6 text-[#F0B429]" />,
            title: "Small Businesses",
            description: "Establish a professional online presence instantly."
        },
        {
            icon: <Building2 className="w-6 h-6 text-[#F0B429]" />,
            title: "Agencies",
            description: "Manage multiple client profiles efficiently."
        },
        {
            icon: <Coffee className="w-6 h-6 text-[#F0B429]" />,
            title: "Restaurants / Cafés",
            description: "Share menus and take reservations easily."
        },
        {
            icon: <Home className="w-6 h-6 text-[#F0B429]" />,
            title: "Real Estate Agents",
            description: "Display listings and capture leads effectively."
        }
    ];

    return (
        <section className="py-20 px-4 bg-slate-50">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1A2D49] mb-4">
                        Who Is This For?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Tailored solutions for every professional need.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {audiences.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-[#1A2D49]/5 rounded-xl flex items-center justify-center mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#1A2D49] mb-2">
                                {item.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

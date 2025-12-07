import React from "react";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
    const testimonials = [
        {
            quote: "The fastest way I’ve ever built a digital presence.",
            author: "Sarah J.",
            role: "Freelance Designer"
        },
        {
            quote: "Looks insanely professional — clients love it.",
            author: "Michael T.",
            role: "Real Estate Agent"
        },
        {
            quote: "The website templates helped me launch in minutes.",
            author: "Jessica L.",
            role: "Small Business Owner"
        }
    ];

    return (
        <section className="py-20 px-4 bg-white">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1A2D49] mb-4">
                        Loved by Professionals
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        See what our users are saying about Mild Tech Studios.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-slate-50 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[#F0B429] text-[#F0B429]" />
                                ))}
                            </div>
                            <p className="text-lg text-[#1A2D49] font-medium mb-6 leading-relaxed">
                                "{testimonial.quote}"
                            </p>
                            <div>
                                <div className="font-bold text-[#1A2D49]">{testimonial.author}</div>
                                <div className="text-sm text-slate-500">{testimonial.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

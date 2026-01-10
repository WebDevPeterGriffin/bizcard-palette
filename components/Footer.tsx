
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 px-4 py-16">
            <div className="container mx-auto max-w-6xl">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <img
                            src="/logo.svg"
                            alt="Mild Tech Studios"
                            className="h-40 w-auto mb-6 object-contain"
                        />
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Building the future of digital identity and web presence for professionals and creators.
                        </p>
                    </div>

                    {/* Products Column */}
                    <div>
                        <h4 className="font-bold text-[#1A2D49] mb-4">Products</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><Link href="/styles" className="hover:text-[#F0B429] transition-colors">Digital Business Cards</Link></li>
                            <li><Link href="/templates" className="hover:text-[#F0B429] transition-colors">Website Templates</Link></li>
                            <li><span className="text-slate-400 cursor-not-allowed">AI Tools (Coming Soon)</span></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="font-bold text-[#1A2D49] mb-4">Company</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><Link href="/about" className="hover:text-[#F0B429] transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-[#F0B429] transition-colors">Contact</Link></li>
                            <li><Link href="/pricing" className="hover:text-[#F0B429] transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h4 className="font-bold text-[#1A2D49] mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><Link href="/privacy-policy" className="hover:text-[#F0B429] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-conditions" className="hover:text-[#F0B429] transition-colors">Terms of Service</Link></li>
                            <li><Link href="/cookie-policy" className="hover:text-[#F0B429] transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 text-center text-slate-400 text-sm">
                    <p>© 2024 Mild Tech Studios. All rights reserved.</p>
                </div>
            </div>
        </footer >
    );
}

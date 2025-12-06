import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useWaitlist } from "@/hooks/useWaitlist";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { openWaitlist } = useWaitlist();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Digital Business Cards", path: "/styles" },
        { name: "Website Templates", path: "/websites" },
        { name: "Pricing", path: "/pricing" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 z-50">
                    <img
                        src="/icon.svg"
                        alt="Mild Tech Studios"
                        className="h-14 md:h-24 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium transition-colors hover:text-[#F0B429] ${isScrolled ? "text-slate-700" : "text-white/90"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Button
                        variant="ghost"
                        className={`text-sm font-medium ${isScrolled ? "text-[#1A2D49] hover:bg-slate-100" : "text-white hover:bg-white/10"
                            }`}
                        onClick={openWaitlist}
                    >
                        Join Waitlist
                    </Button>
                    <Button
                        variant="cta"
                        onClick={() => navigate("/request")}
                    >
                        Get Started
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className={isScrolled ? "text-[#1A2D49]" : "text-white"} />
                    ) : (
                        <Menu className={isScrolled ? "text-[#1A2D49]" : "text-white"} />
                    )}
                </button>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-[#1A2D49] z-40 flex flex-col items-center justify-center gap-8 md:hidden">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-2xl font-bold text-white hover:text-[#F0B429] transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-4 mt-8 w-full max-w-xs px-4">
                            <Button
                                variant="ghost"
                                className="w-full border border-white/20 text-white hover:bg-white/10"
                                onClick={() => {
                                    openWaitlist();
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Join Waitlist
                            </Button>
                            <Button
                                variant="cta"
                                className="w-full"
                                onClick={() => {
                                    navigate("/request");
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

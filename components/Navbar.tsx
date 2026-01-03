"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useWaitlist } from "@/hooks/useWaitlist";
import { createClient } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const { openWaitlist } = useWaitlist();
    const supabase = createClient();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Check current auth state
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    // Different nav links for authenticated vs unauthenticated users
    const navLinks = user
        ? [
            { name: "Dashboard", path: "/dashboard" },
            { name: "Digital Business Cards", path: "/styles" },
            { name: "Website Templates", path: "/websites" },
        ]
        : [
            { name: "Home", path: "/" },
            { name: "Digital Business Cards", path: "/styles" },
            { name: "Website Templates", path: "/websites" },
            { name: "Pricing", path: "/pricing" },
            { name: "Contact", path: "/contact" },
        ];

    const isTransparentPage = ["/", "/styles", "/websites", "/pricing", "/contact"].includes(pathname);
    const showSolidNav = isScrolled || !isTransparentPage;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showSolidNav
                ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 z-50">
                    <img
                        src="/icon.svg"
                        alt="Mild Tech Studios"
                        className="h-14 md:h-16 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className={`text-sm font-medium transition-colors hover:text-[#F0B429] ${showSolidNav ? "text-slate-700" : "text-white/90"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {!loading && (
                        <>
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className={`text-sm font-medium ${showSolidNav ? "text-[#1A2D49] hover:bg-slate-100" : "text-white hover:bg-white/10"
                                                }`}
                                        >
                                            <User className="mr-2 h-4 w-4" />
                                            Account
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard">Dashboard</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Sign out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <>
                                    <Button
                                        variant="ghost"
                                        className={`text-sm font-medium ${showSolidNav ? "text-[#1A2D49] hover:bg-slate-100" : "text-white hover:bg-white/10"
                                            }`}
                                        onClick={() => router.push("/auth/login")}
                                    >
                                        Sign in
                                    </Button>
                                </>
                            )}
                            <Button
                                variant="cta"
                                onClick={() => router.push("/request")}
                            >
                                Get Started
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className={showSolidNav ? "text-[#1A2D49]" : "text-white"} />
                    ) : (
                        <Menu className={showSolidNav ? "text-[#1A2D49]" : "text-white"} />
                    )}
                </button>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-[#1A2D49] z-40 flex flex-col items-center justify-center gap-8 md:hidden">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className="text-2xl font-bold text-white hover:text-[#F0B429] transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-4 mt-8 w-full max-w-xs px-4">
                            {user ? (
                                <>
                                    <Button
                                        variant="ghost"
                                        className="w-full border border-white/20 text-white hover:bg-white/10"
                                        onClick={() => {
                                            router.push("/dashboard");
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        Dashboard
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full border border-white/20 text-white hover:bg-white/10"
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        Sign out
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="ghost"
                                    className="w-full border border-white/20 text-white hover:bg-white/10"
                                    onClick={() => {
                                        router.push("/auth/login");
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    Sign in
                                </Button>
                            )}
                            <Button
                                variant="cta"
                                className="w-full"
                                onClick={() => {
                                    router.push("/request");
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

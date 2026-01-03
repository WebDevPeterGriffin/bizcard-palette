"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, ArrowLeft } from "lucide-react";
import FloatingOrbs from "@/components/FloatingOrbs";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const supabase = createClient();

    const redirectTo = searchParams.get("redirect") || "/dashboard";
    const error = searchParams.get("error");

    // Show error from URL params (e.g., from callback)
    if (error === "auth") {
        toast({
            title: "Authentication failed",
            description: "Please try logging in again",
            variant: "destructive",
        });
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast({
                title: "Welcome back!",
                description: "You have been logged in successfully",
            });

            router.push(redirectTo);
            router.refresh();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Login failed";
            toast({
                title: "Login failed",
                description: message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex">
            {/* Left Side - Animated Background */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center bg-[#1A2D49]">
                {/* Gradient Background */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, #1A2D49 0%, #3D5A73 35%, #8B7355 65%, #F0B429 100%)',
                    }}
                />

                {/* Floating Orbs */}
                <FloatingOrbs />

                {/* Content Overlay */}
                <div className="relative z-10 p-12 text-white max-w-lg">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Welcome Back to <br />
                        <span className="text-[#F0B429]">Mild Tech Studios</span>
                    </h1>
                    <p className="text-xl text-white/90 leading-relaxed">
                        Manage your digital business cards, track analytics, and grow your professional network all in one place.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo/Header */}
                    <div className="text-center lg:text-left">
                        <Link href="/" className="inline-flex items-center gap-2 mb-8 lg:hidden">
                            <img src="/icon.svg" alt="Logo" className="h-10 w-auto" />
                            <span className="font-bold text-xl">Mild Tech Studios</span>
                        </Link>
                        <h2 className="text-3xl font-bold tracking-tight">Sign in</h2>
                        <p className="text-muted-foreground mt-2">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-11"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm text-brand-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 h-11"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-brand-primary hover:bg-brand-primary/90 text-base"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Don&apos;t have an account? </span>
                        <Link
                            href="/auth/signup"
                            className="text-brand-primary hover:underline font-medium"
                        >
                            Sign up for free
                        </Link>
                    </div>

                    <div className="pt-8 border-t text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

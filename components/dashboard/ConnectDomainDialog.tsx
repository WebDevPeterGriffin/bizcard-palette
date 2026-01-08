"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Loader2, Check, AlertTriangle, Trash2, RefreshCw, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { VercelDomainResponse, VercelConfigResponse } from "@/lib/vercel";

interface ConnectDomainDialogProps {
    websiteConfig: Tables<"website_configs">;
    onUpdate: () => void;
}

export function ConnectDomainDialog({ websiteConfig, onUpdate }: ConnectDomainDialogProps) {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [domain, setDomain] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const [manualCheckRequired, setManualCheckRequired] = useState(false);

    // Access domain fields directly - types now include these columns
    const customDomain = websiteConfig.custom_domain;
    const domainConfig = websiteConfig.domain_config as VercelDomainResponse | null;

    // Determine if we should show verified state
    const isVerified = domainConfig?.verified && !manualCheckRequired;

    const handleAddDomain = async () => {
        if (!domain) return;
        setIsLoading(true);
        try {
            const response = await fetch("/api/domains", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    domain,
                    template: websiteConfig.template
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to add domain");
            }

            toast({
                title: "Domain added",
                description: "Please configure your DNS records to verify ownership.",
            });
            setManualCheckRequired(true); // Force user to click verify
            onUpdate();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async () => {
        if (!customDomain) return;
        setIsVerifying(true);
        try {
            const response = await fetch(`/api/domains?domain=${customDomain}&t=${Date.now()}`);
            const data = await response.json();

            if (data.domain?.verified) {
                toast({
                    title: "Domain verified!",
                    description: "Your website is now live on your custom domain.",
                });
                setManualCheckRequired(false); // Allow verified state to show
            } else {
                toast({
                    title: "Not yet verified",
                    description: "DNS changes can take up to 48 hours to propagate. Please try again later.",
                    variant: "destructive",
                });
            }
            onUpdate();
        } catch (error) {
            console.error(error);
        } finally {
            setIsVerifying(false);
        }
    };

    const handleRemove = async () => {
        if (!confirm("Are you sure you want to remove this domain?")) return;
        setIsLoading(true);
        try {
            const response = await fetch(`/api/domains?domain=${customDomain}&template=${websiteConfig.template}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to remove domain");
            }

            toast({
                title: "Domain removed",
                description: "Your website is no longer accessible via this domain.",
            });
            setDomain("");
            onUpdate();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied to clipboard" });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Globe className="w-4 h-4" />
                    {customDomain ? "Manage Domain" : "Connect Domain"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Connect Custom Domain</DialogTitle>
                    <DialogDescription>
                        Use your own domain (e.g., yoursite.com) for your website.
                    </DialogDescription>
                </DialogHeader>

                {!customDomain ? (
                    <div className="space-y-4 py-4">
                        {!websiteConfig.is_published ? (
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
                                <div className="flex items-center gap-2 font-semibold mb-1">
                                    <AlertTriangle className="w-4 h-4" />
                                    Website Not Published
                                </div>
                                <p className="text-sm opacity-90">
                                    You must publish your website before connecting a custom domain. Please publish your site from the dashboard or builder first.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="domain">Domain Name</Label>
                                    <Input
                                        id="domain"
                                        placeholder="example.com"
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Enter the domain you want to connect (e.g., www.example.com)
                                    </p>
                                </div>
                                <Button
                                    className="w-full"
                                    onClick={handleAddDomain}
                                    disabled={!domain || isLoading}
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                    Add Domain
                                </Button>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6 py-4">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-slate-500" />
                                <span className="font-medium">{customDomain}</span>
                            </div>
                            {isVerified ? (
                                <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    <Check className="w-3 h-3" /> Verified
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                                    <AlertTriangle className="w-3 h-3" /> Pending DNS
                                </span>
                            )}
                        </div>

                        {!isVerified && (
                            <div className="space-y-4">
                                <div className="text-sm text-slate-600">
                                    <p className="mb-2">Log in to your domain provider (e.g., GoDaddy, Namecheap) and add the following records. Then click "Verify Connection".</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="p-3 bg-slate-50 rounded border text-sm">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-semibold text-xs uppercase text-slate-500">A Record</span>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard("76.76.21.21")}>
                                                <Copy className="w-3 h-3" />
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div>
                                                <span className="text-xs text-slate-500 block">Name</span>
                                                <span className="font-mono">@</span>
                                            </div>
                                            <div className="col-span-2">
                                                <span className="text-xs text-slate-500 block">Value</span>
                                                <span className="font-mono">76.76.21.21</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-3 bg-slate-50 rounded border text-sm">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-semibold text-xs uppercase text-slate-500">CNAME Record</span>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard("cname.vercel-dns.com")}>
                                                <Copy className="w-3 h-3" />
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div>
                                                <span className="text-xs text-slate-500 block">Name</span>
                                                <span className="font-mono">www</span>
                                            </div>
                                            <div className="col-span-2">
                                                <span className="text-xs text-slate-500 block">Value</span>
                                                <span className="font-mono">cname.vercel-dns.com</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="secondary"
                                    className="w-full"
                                    onClick={handleVerify}
                                    disabled={isVerifying}
                                >
                                    {isVerifying ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                                    Verify Connection
                                </Button>
                            </div>

                        )}

                        {isVerified && (
                            <div className="space-y-4">
                                <div className="p-3 bg-green-50 rounded border border-green-100 text-sm text-green-800">
                                    <p className="font-medium flex items-center gap-2">
                                        <Check className="w-4 h-4" />
                                        Domain Connected
                                    </p>
                                    <p className="mt-1 text-xs opacity-90">
                                        Your domain is successfully pointing to our servers.
                                    </p>
                                </div>

                                <div className="text-xs text-center text-slate-500">
                                    <p>Need to check your records?</p>
                                </div>

                                <div className="space-y-3 opacity-75 hover:opacity-100 transition-opacity">
                                    {/* Logic to determine if it's a subdomain or root domain */}
                                    {(() => {
                                        const isSubdomain = customDomain && customDomain.split('.').length > 2;
                                        const subdomainPart = isSubdomain ? customDomain.split('.')[0] : 'www';

                                        if (isSubdomain) {
                                            return (
                                                <div className="p-3 bg-slate-50 rounded border text-sm">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="font-semibold text-xs uppercase text-slate-500">CNAME Record</span>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard("cname.vercel-dns.com")}>
                                                            <Copy className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <div>
                                                            <span className="text-xs text-slate-500 block">Name</span>
                                                            <span className="font-mono">{subdomainPart}</span>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <span className="text-xs text-slate-500 block">Value</span>
                                                            <span className="font-mono">cname.vercel-dns.com</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <>
                                                    <div className="p-3 bg-slate-50 rounded border text-sm">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="font-semibold text-xs uppercase text-slate-500">A Record</span>
                                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard("76.76.21.21")}>
                                                                <Copy className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-2">
                                                            <div>
                                                                <span className="text-xs text-slate-500 block">Name</span>
                                                                <span className="font-mono">@</span>
                                                            </div>
                                                            <div className="col-span-2">
                                                                <span className="text-xs text-slate-500 block">Value</span>
                                                                <span className="font-mono">76.76.21.21</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="p-3 bg-slate-50 rounded border text-sm">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="font-semibold text-xs uppercase text-slate-500">CNAME Record</span>
                                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard("cname.vercel-dns.com")}>
                                                                <Copy className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-2">
                                                            <div>
                                                                <span className="text-xs text-slate-500 block">Name</span>
                                                                <span className="font-mono">www</span>
                                                            </div>
                                                            <div className="col-span-2">
                                                                <span className="text-xs text-slate-500 block">Value</span>
                                                                <span className="font-mono">cname.vercel-dns.com</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        }
                                    })()}
                                </div>
                            </div>
                        )}

                        <Button
                            variant="ghost"
                            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={handleRemove}
                            disabled={isLoading}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Domain
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog >
    );
}

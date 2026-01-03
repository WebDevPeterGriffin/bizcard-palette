"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface TemplateRequestDialogProps {
    children: React.ReactNode;
    templateName: string;
    onUpdatePreview?: (type: 'personal' | 'broker', url: string) => void;
}

export function TemplateRequestDialog({
    children,
    templateName,
    onUpdatePreview = () => { },
}: TemplateRequestDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'personal' | 'broker') => {
        const file = e.target.files?.[0];
        if (file && onUpdatePreview) {
            const url = URL.createObjectURL(file);
            onUpdatePreview(type, url);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSuccess(true);
        toast.success("Request sent successfully!");

        // Reset after a delay
        setTimeout(() => {
            setOpen(false);
            setIsSuccess(false);
        }, 2000);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                        <p className="text-slate-600">
                            We'll be in touch shortly to discuss your new <strong>{templateName}</strong> website.
                        </p>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>Request {templateName} Template</DialogTitle>
                            <DialogDescription>
                                Fill out the form below to get started with your new website.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 py-4">
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" placeholder="John Doe" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" required />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="agency">Agency Name</Label>
                                        <Input id="agency" placeholder="Luxe Estates" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="license">License Number</Label>
                                        <Input id="license" placeholder="DRE #12345678" required />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="personal-logo">Personal Logo</Label>
                                        <Input
                                            id="personal-logo"
                                            type="file"
                                            accept="image/*"
                                            className="cursor-pointer"
                                            onChange={(e) => handleFileChange(e, 'personal')}
                                        />
                                        <p className="text-[10px] text-slate-500">For Navbar (Transparent PNG recommended)</p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="broker-logo">Broker Logo</Label>
                                        <Input
                                            id="broker-logo"
                                            type="file"
                                            accept="image/*"
                                            className="cursor-pointer"
                                            onChange={(e) => handleFileChange(e, 'broker')}
                                        />
                                        <p className="text-[10px] text-slate-500">For Footer (Transparent PNG recommended)</p>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="current-site">Current Website (Optional)</Label>
                                    <Input id="current-site" placeholder="https://..." />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="notes">Tell us about your needs</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="I need a website for my real estate business..."
                                        className="min-h-[80px]"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="w-full bg-[#1A2D49] hover:bg-[#1A2D49]/90" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending Request...
                                        </>
                                    ) : (
                                        "Submit Request"
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

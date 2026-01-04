"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Turnstile } from "@marsidev/react-turnstile";

interface JoinWaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function JoinWaitlistModal({ isOpen, onClose }: JoinWaitlistModalProps) {
    const supabase = createClient();
    const [email, setEmail] = useState("");
    const [interest, setInterest] = useState("both");
    const [isLoading, setIsLoading] = useState(false);

    const [token, setToken] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast.error("Please complete the captcha");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await supabase.functions.invoke('submit-contact', {
                body: {
                    type: 'waitlist',
                    data: { email, interest },
                    token
                }
            });

            if (error) throw error;
            if (data?.error) {
                if (data.error === 'Already on waitlist') {
                    toast.info("You're already on the waitlist!", {
                        description: "We'll keep you posted.",
                    });
                    onClose();
                    return;
                }
                throw new Error(data.error);
            }

            toast.success("You've been added to the waitlist!", {
                description: "We'll notify you when we launch.",
            });

            setEmail("");
            setToken(null);
            onClose();
        } catch (error) {
            console.error("Error joining waitlist:", error);
            toast.error("Failed to join waitlist", {
                description: "Please try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#1A2D49]">Join the Waitlist</DialogTitle>
                    <DialogDescription>
                        Be the first to know when we launch new features and templates.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="interest">I'm interested in...</Label>
                        <Select value={interest} onValueChange={setInterest}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cards">Digital Business Cards</SelectItem>
                                <SelectItem value="websites">Website Templates</SelectItem>
                                <SelectItem value="both">Both</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-center">
                        <Turnstile
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                            onSuccess={setToken}
                            onExpire={() => setToken(null)}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="cta"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Joining...
                                </>
                            ) : (
                                "Join Waitlist"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

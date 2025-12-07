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

interface JoinWaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function JoinWaitlistModal({ isOpen, onClose }: JoinWaitlistModalProps) {
    const supabase = createClient();
    const [email, setEmail] = useState("");
    const [interest, setInterest] = useState("both");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabase
                .from('waitlist')
                .insert({ email, interest });

            if (error) {
                if (error.code === '23505') { // Unique violation
                    toast.info("You're already on the waitlist!", {
                        description: "We'll keep you posted.",
                    });
                    onClose();
                    return;
                }
                throw error;
            }

            // Notify admin (non-blocking)
            supabase.functions.invoke('notify-admin', {
                body: {
                    type: 'waitlist',
                    data: { email, interest }
                }
            }).catch(err => console.error('Email notification failed:', err));

            toast.success("You've been added to the waitlist!", {
                description: "We'll notify you when we launch.",
            });

            setEmail("");
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

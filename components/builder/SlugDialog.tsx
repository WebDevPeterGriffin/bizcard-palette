"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SlugDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (slug: string) => Promise<boolean>;
    isSaving: boolean;
}

export function SlugDialog({ isOpen, onOpenChange, onSave, isSaving }: SlugDialogProps) {
    const [slugInput, setSlugInput] = React.useState('');

    const handleSlugSave = async () => {
        if (!slugInput.trim()) {
            toast.error("Please enter a website name");
            return;
        }

        const success = await onSave(slugInput.toLowerCase().replace(/\s+/g, '-'));
        if (success) {
            toast.success("Website saved successfully!");
            onOpenChange(false);
        } else {
            toast.error("Failed to save website. Name might be taken.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Name Your Website</DialogTitle>
                    <DialogDescription>
                        Choose a unique name for your website. This will be your website's address.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="slug" className="mb-2 block">Website Name</Label>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-sm">/websites/</span>
                        <Input
                            id="slug"
                            value={slugInput}
                            onChange={(e) => setSlugInput(e.target.value)}
                            placeholder="my-awesome-site"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSlugSave} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Website
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

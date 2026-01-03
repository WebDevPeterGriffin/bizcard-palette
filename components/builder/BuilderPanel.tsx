"use client";

import React from "react";
import { motion } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Palette, Image as ImageIcon, Type, Save, Trash2, Undo, Redo, GripVertical, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const BuilderPanel = () => {
    const {
        config,
        updateColor,
        updateLogo,
        updateImage,
        updateText,
        updateSocialLink,
        removeSocialLink,
        undo,
        redo,
        canUndo,
        canRedo,
        saveConfig,
        isSaving,
        hasUnsavedChanges,
        slug,
    } = useBuilder();
    const router = useRouter();
    const [isUploading, setIsUploading] = React.useState(false);
    const [isSlugDialogOpen, setIsSlugDialogOpen] = React.useState(false);
    const [slugInput, setSlugInput] = React.useState('');

    const uploadToStorage = async (file: File, type: string): Promise<string | null> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        try {
            const response = await fetch('/api/websites/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                toast.error(data.error || 'Upload failed');
                return null;
            }

            const data = await response.json();
            return data.url;
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload image');
            return null;
        }
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'personal' | 'broker') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const url = await uploadToStorage(file, `${type}-logo`);
        setIsUploading(false);

        if (url) {
            updateLogo(type, url);
            toast.success(`${type === 'personal' ? 'Personal' : 'Broker'} logo uploaded!`);
        }
    };

    const handleHeadshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const url = await uploadToStorage(file, 'headshot');
        setIsUploading(false);

        if (url) {
            updateImage('headshot', url);
            toast.success('Headshot uploaded!');
        }
    };

    const handleSave = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            // Redirect to login
            toast.info("Please log in to save your website.");
            router.push('/auth/login?redirect=/websites/realtor');
            return;
        }

        if (!slug) {
            setIsSlugDialogOpen(true);
            return;
        }

        const success = await saveConfig();
        if (success) {
            toast.success("Website saved successfully!");
        } else {
            toast.error("Failed to save website. Please try again.");
        }
    };

    const handleSlugSave = async () => {
        if (!slugInput.trim()) {
            toast.error("Please enter a website name");
            return;
        }

        const success = await saveConfig(slugInput.toLowerCase().replace(/\s+/g, '-'));
        if (success) {
            toast.success("Website saved successfully!");
            setIsSlugDialogOpen(false);
        } else {
            toast.error("Failed to save website. Name might be taken.");
        }
    };

    return (
        <>
            <Dialog open={isSlugDialogOpen} onOpenChange={setIsSlugDialogOpen}>
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
                        <Button variant="outline" onClick={() => setIsSlugDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSlugSave} disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Website
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <motion.div
                drag
                dragMomentum={false}
                className="fixed top-24 left-6 z-50 w-80 bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[calc(100vh-8rem)]"
            >
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center cursor-grab active:cursor-grabbing">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-slate-400" />
                        Builder
                    </h3>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={undo}
                            disabled={!canUndo}
                            className="h-8 w-8 text-slate-500 hover:text-slate-900"
                            title="Undo (Ctrl+Z)"
                        >
                            <Undo className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={redo}
                            disabled={!canRedo}
                            className="h-8 w-8 text-slate-500 hover:text-slate-900"
                            title="Redo (Ctrl+Y)"
                        >
                            <Redo className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <Tabs defaultValue="colors" className="w-full">
                        <TabsList className="w-full grid grid-cols-3 p-1 bg-slate-100/50">
                            <TabsTrigger value="colors" className="text-xs">Colors</TabsTrigger>
                            <TabsTrigger value="assets" className="text-xs">Assets</TabsTrigger>
                            <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
                        </TabsList>

                        <div className="p-6 space-y-6">
                            <TabsContent value="colors" className="space-y-6 mt-0">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Primary Color</Label>
                                        <div className="flex gap-3 items-center">
                                            <input
                                                type="color"
                                                value={config.colors.primary}
                                                onChange={(e) => updateColor('primary', e.target.value)}
                                                className="h-10 w-10 rounded-lg cursor-pointer border-0 p-0"
                                            />
                                            <Input
                                                value={config.colors.primary}
                                                onChange={(e) => updateColor('primary', e.target.value)}
                                                className="font-mono text-sm"
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-400">Used for buttons, headers, and accents.</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Secondary Color</Label>
                                        <div className="flex gap-3 items-center">
                                            <input
                                                type="color"
                                                value={config.colors.secondary}
                                                onChange={(e) => updateColor('secondary', e.target.value)}
                                                className="h-10 w-10 rounded-lg cursor-pointer border-0 p-0"
                                            />
                                            <Input
                                                value={config.colors.secondary}
                                                onChange={(e) => updateColor('secondary', e.target.value)}
                                                className="font-mono text-sm"
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-400">Used for highlights and call-to-actions.</p>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="assets" className="space-y-6 mt-0">
                                <div className="space-y-4">
                                    {/* Headshot Upload */}
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Headshot</Label>
                                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors text-center cursor-pointer relative">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={handleHeadshotUpload}
                                                disabled={isUploading}
                                            />
                                            {config.content.images.headshot ? (
                                                <div className="relative group">
                                                    <img src={config.content.images.headshot} alt="Headshot" className="h-24 mx-auto object-cover rounded-lg shadow-sm" />
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            updateImage('headshot', '');
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                        title="Remove headshot"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-slate-400 flex flex-col items-center gap-2">
                                                    <ImageIcon className="w-6 h-6" />
                                                    <span className="text-xs">Upload Headshot</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Personal Logo</Label>
                                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors text-center cursor-pointer relative">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={(e) => handleLogoUpload(e, 'personal')}
                                            />
                                            {config.content.logos.personal ? (
                                                <div className="relative group">
                                                    <img src={config.content.logos.personal} alt="Personal" className="h-12 mx-auto object-contain" />
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            updateLogo('personal', null);
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                        title="Remove logo"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-slate-400 flex flex-col items-center gap-2">
                                                    <ImageIcon className="w-6 h-6" />
                                                    <span className="text-xs">Click to upload</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Broker Logo</Label>
                                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors text-center cursor-pointer relative">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={(e) => handleLogoUpload(e, 'broker')}
                                            />
                                            {config.content.logos.broker ? (
                                                <div className="relative group">
                                                    <img src={config.content.logos.broker} alt="Broker" className="h-12 mx-auto object-contain" />
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            updateLogo('broker', null);
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                        title="Remove logo"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-slate-400 flex flex-col items-center gap-2">
                                                    <ImageIcon className="w-6 h-6" />
                                                    <span className="text-xs">Click to upload</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="content" className="space-y-6 mt-0">
                                <div className="text-center py-8 text-slate-500">
                                    <Type className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm font-medium text-slate-800">Click-to-Edit Enabled</p>
                                    <p className="text-xs mt-2 text-slate-500">
                                        Simply click on any text on the website preview to edit it directly.
                                    </p>
                                    <div className="mt-4 p-3 bg-amber-50 rounded-lg text-xs text-amber-700 border border-amber-100">
                                        <p>Try clicking on the Hero Title or About Description!</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <h4 className="text-sm font-bold text-slate-800">Contact Information</h4>
                                    <div className="space-y-3">
                                        <div className="space-y-2">
                                            <Label className="text-xs text-slate-500">Email Address</Label>
                                            <Input
                                                value={config.content.text['contact.email']}
                                                onChange={(e) => updateText('contact.email', e.target.value)}
                                                placeholder="hello@example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs text-slate-500">Phone Number</Label>
                                            <Input
                                                value={config.content.text['contact.phone']}
                                                onChange={(e) => updateText('contact.phone', e.target.value)}
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs text-slate-500">Office Address</Label>
                                            <textarea
                                                className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                value={config.content.text['contact.address']}
                                                onChange={(e) => updateText('contact.address', e.target.value)}
                                                placeholder="123 Luxury Blvd..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <h4 className="text-sm font-bold text-slate-800">Social Media Links</h4>
                                    <p className="text-xs text-slate-500">Add your social media profiles. Leave URL empty to hide a platform.</p>
                                    <div className="space-y-3">
                                        {(['instagram', 'linkedin', 'facebook', 'twitter', 'youtube', 'tiktok'] as const).map((platform) => {
                                            const link = config.content.socialLinks.find(l => l.platform === platform);
                                            return (
                                                <div key={platform} className="flex items-center gap-2">
                                                    <Label className="text-xs text-slate-500 w-20 capitalize">{platform}</Label>
                                                    <Input
                                                        value={link?.url || ''}
                                                        onChange={(e) => {
                                                            if (e.target.value) {
                                                                updateSocialLink(platform, e.target.value);
                                                            } else {
                                                                removeSocialLink(platform);
                                                            }
                                                        }}
                                                        placeholder={`https://${platform}.com/...`}
                                                        className="flex-1 text-xs"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <Button
                        className="w-full bg-slate-900 hover:bg-slate-800 gap-2"
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Saved'}
                    </Button>
                </div>
            </motion.div>
        </>
    );
};

"use client";

import React from "react";
import { motion } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Undo, Redo, GripVertical, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ColorsTab } from "@/components/builder/ColorsTab";
import { AssetsTab } from "@/components/builder/AssetsTab";
import { ContentTab } from "@/components/builder/ContentTab";
import { SlugDialog } from "@/components/builder/SlugDialog";

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

    return (
        <>
            <SlugDialog
                isOpen={isSlugDialogOpen}
                onOpenChange={setIsSlugDialogOpen}
                onSave={saveConfig}
                isSaving={isSaving}
            />

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
                            <ColorsTab config={config} updateColor={updateColor} />

                            <AssetsTab
                                config={config}
                                updateImage={updateImage}
                                updateLogo={updateLogo}
                                setIsUploading={setIsUploading}
                                isUploading={isUploading}
                            />

                            <ContentTab
                                config={config}
                                updateText={updateText}
                                updateSocialLink={updateSocialLink}
                                removeSocialLink={removeSocialLink}
                            />
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

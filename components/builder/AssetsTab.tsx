"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Image as ImageIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { WebsiteConfig } from "@/context/BuilderContext";
import { TemplateSchema } from "@/types/builder";

interface AssetsTabProps {
    config: WebsiteConfig;
    schema: TemplateSchema;
    updateImage: (key: string, value: string) => void;
    updateLogo: (type: 'personal' | 'broker', value: string | null) => void;
    setIsUploading: (isUploading: boolean) => void;
    isUploading: boolean;
}

export function AssetsTab({ config, schema, updateImage, updateLogo, setIsUploading, isUploading }: AssetsTabProps) {

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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const url = await uploadToStorage(file, key);
        setIsUploading(false);

        if (url) {
            updateImage(key, url);
            toast.success('Image uploaded!');
        }
    };

    return (
        <TabsContent value="assets" className="space-y-6 mt-0">
            <div className="space-y-4">
                {schema.assets.map((asset) => (
                    <div key={asset.key} className="space-y-2">
                        <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{asset.label}</Label>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors text-center cursor-pointer relative">
                            <Input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    if (asset.type === 'logo') {
                                        handleLogoUpload(e, asset.key as 'personal' | 'broker');
                                    } else {
                                        handleImageUpload(e, asset.key);
                                    }
                                }}
                                disabled={isUploading}
                            />
                            {asset.type === 'logo' ? (
                                config.content.logos[asset.key as 'personal' | 'broker'] ? (
                                    <div className="relative group">
                                        <img
                                            src={config.content.logos[asset.key as 'personal' | 'broker'] || ''}
                                            alt={asset.label}
                                            className="h-12 mx-auto object-contain"
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateLogo(asset.key as 'personal' | 'broker', null);
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
                                )
                            ) : (
                                config.content.images[asset.key] ? (
                                    <div className="relative group">
                                        <img
                                            src={config.content.images[asset.key]}
                                            alt={asset.label}
                                            className="h-24 mx-auto object-cover rounded-lg shadow-sm"
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateImage(asset.key, '');
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Remove image"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-slate-400 flex flex-col items-center gap-2">
                                        <ImageIcon className="w-6 h-6" />
                                        <span className="text-xs">Click to upload</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </TabsContent>
    );
}

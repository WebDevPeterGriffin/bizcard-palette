"use client";

import React, { useState, useRef, useEffect } from "react";
import { useBuilder } from "@/context/BuilderContext";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

interface EditableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    id: string;
    initialValue: string;
    uploadType?: 'image' | 'logo';
    className?: string;
    children?: React.ReactNode;
}

export const EditableImage = ({
    id,
    initialValue,
    uploadType = 'image',
    className,
    alt,
    children,
    ...props
}: EditableImageProps) => {
    const { updateImage, updateLogo, isReadOnly } = useBuilder();
    const [isUploading, setIsUploading] = useState(false);
    const [src, setSrc] = useState(initialValue);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setSrc(initialValue);
    }, [initialValue]);

    const handleClick = (e: React.MouseEvent) => {
        if (isReadOnly) return;
        // e.preventDefault();
        fileInputRef.current?.click();
    };

    const uploadToStorage = async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', uploadType === 'logo' ? `${id}-logo` : id);

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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const url = await uploadToStorage(file);
        setIsUploading(false);

        if (url) {
            setSrc(url);
            if (uploadType === 'logo') {
                updateLogo(id as 'personal' | 'broker', url);
            } else {
                updateImage(id, url);
            }
            toast.success('Image updated!');
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    if (isReadOnly) {
        return (
            <div className={cn("relative", className)}>
                <img
                    src={src}
                    alt={alt || "Image"}
                    className="w-full h-full object-cover"
                    {...props}
                />
                {children}
            </div>
        );
    }

    return (
        <div
            className={cn(
                "relative group cursor-pointer transition-all",
                className
            )}
            onClick={handleClick}
        >
            <img
                src={src}
                alt={alt || "Image"}
                className={cn("w-full h-full object-cover", className)} // Ensure img fills container if container has dimensions
                {...props}
            />

            {children}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[inherit] z-20 cursor-pointer">
                <div className="bg-white/90 text-slate-900 px-3 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium transform scale-95 group-hover:scale-100 transition-transform">
                    {isUploading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Uploading...</span>
                        </>
                    ) : (
                        <>
                            <Upload className="w-4 h-4" />
                            <span>Change Image</span>
                        </>
                    )}
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
            />
        </div>
    );
};

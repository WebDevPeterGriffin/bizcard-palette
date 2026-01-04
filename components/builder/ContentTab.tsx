"use client";

import React from "react";
import { WebsiteConfig, SocialLink } from "@/context/BuilderContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Instagram, Linkedin, Facebook, Twitter, Youtube } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TemplateSchema } from "@/types/builder";

interface ContentTabProps {
    config: WebsiteConfig;
    schema: TemplateSchema;
    updateText: (key: string, value: string) => void;
    updateSocialLink: (platform: SocialLink['platform'], url: string) => void;
    removeSocialLink: (platform: SocialLink['platform']) => void;
}

export const ContentTab = ({
    config,
    schema,
    updateText,
    updateSocialLink,
    removeSocialLink
}: ContentTabProps) => {
    const [newPlatform, setNewPlatform] = React.useState<SocialLink['platform']>('instagram');

    const handleAddSocial = () => {
        updateSocialLink(newPlatform, '');
    };

    const getIcon = (platform: string) => {
        switch (platform) {
            case 'instagram': return <Instagram className="w-4 h-4" />;
            case 'linkedin': return <Linkedin className="w-4 h-4" />;
            case 'facebook': return <Facebook className="w-4 h-4" />;
            case 'twitter': return <Twitter className="w-4 h-4" />;
            case 'youtube': return <Youtube className="w-4 h-4" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-8">
            {/* Contact Info Section */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 border-b pb-2">Contact Information</h3>

                <div className="space-y-2">
                    <Label htmlFor="contact.email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</Label>
                    <Input
                        id="contact.email"
                        value={config.content.text['contact.email'] || ''}
                        onChange={(e) => updateText('contact.email', e.target.value)}
                        placeholder="hello@example.com"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="contact.phone" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</Label>
                    <Input
                        id="contact.phone"
                        value={config.content.text['contact.phone'] || ''}
                        onChange={(e) => updateText('contact.phone', e.target.value)}
                        placeholder="+1 (555) 000-0000"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="contact.address" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Address</Label>
                    <Input
                        id="contact.address"
                        value={config.content.text['contact.address'] || ''}
                        onChange={(e) => updateText('contact.address', e.target.value)}
                        placeholder="123 Main St, City, Country"
                    />
                </div>
            </div>

            {/* Social Media Section */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 border-b pb-2">Social Media</h3>

                <div className="space-y-3">
                    {config.content.socialLinks.map((link) => (
                        <div key={link.platform} className="flex gap-2 items-center">
                            <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                                {getIcon(link.platform)}
                            </div>
                            <Input
                                value={link.url}
                                onChange={(e) => updateSocialLink(link.platform, e.target.value)}
                                placeholder={`Your ${link.platform} URL`}
                                className="flex-1"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeSocialLink(link.platform)}
                                className="text-slate-400 hover:text-red-500"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 pt-2">
                    <Select value={newPlatform} onValueChange={(v) => setNewPlatform(v as SocialLink['platform'])}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="tiktok">TikTok</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleAddSocial} variant="outline" className="flex-1 gap-2">
                        <Plus className="w-4 h-4" />
                        Add Link
                    </Button>
                </div>
            </div>
        </div>
    );
};

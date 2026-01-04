"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Type } from "lucide-react";
import { WebsiteConfig, SocialLink } from "@/context/BuilderContext";

interface ContentTabProps {
    config: WebsiteConfig;
    updateText: (key: string, value: string) => void;
    updateSocialLink: (platform: SocialLink['platform'], url: string) => void;
    removeSocialLink: (platform: SocialLink['platform']) => void;
}

export function ContentTab({ config, updateText, updateSocialLink, removeSocialLink }: ContentTabProps) {
    return (
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
    );
}

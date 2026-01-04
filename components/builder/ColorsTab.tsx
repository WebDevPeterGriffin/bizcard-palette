"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { WebsiteConfig } from "@/context/BuilderContext";

interface ColorsTabProps {
    config: WebsiteConfig;
    updateColor: (key: keyof WebsiteConfig['colors'], value: string) => void;
}

export function ColorsTab({ config, updateColor }: ColorsTabProps) {
    return (
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
    );
}

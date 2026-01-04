"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WebsiteConfig } from "@/context/BuilderContext";
import { TemplateSchema } from "@/types/builder";

interface ColorsTabProps {
    config: WebsiteConfig;
    schema: TemplateSchema;
    updateColor: (key: keyof WebsiteConfig['colors'], value: string) => void;
}

export function ColorsTab({ config, schema, updateColor }: ColorsTabProps) {
    return (
        <div className="space-y-6 mt-0">
            <div className="space-y-4">
                {schema.colors.map((color) => (
                    <div key={color.key} className="space-y-2">
                        <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{color.label}</Label>
                        <div className="flex gap-3 items-center">
                            <input
                                type="color"
                                value={config.colors[color.key as keyof WebsiteConfig['colors']]}
                                onChange={(e) => updateColor(color.key as keyof WebsiteConfig['colors'], e.target.value)}
                                className="h-10 w-10 rounded-lg cursor-pointer border-0 p-0"
                            />
                            <Input
                                value={config.colors[color.key as keyof WebsiteConfig['colors']]}
                                onChange={(e) => updateColor(color.key as keyof WebsiteConfig['colors'], e.target.value)}
                                className="font-mono text-sm"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

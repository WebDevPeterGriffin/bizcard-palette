"use client";

import { BuilderProvider } from "@/context/BuilderContext";
import { RealtorTemplate } from "@/components/websites/realtor/RealtorTemplate";
import { Tables } from "@/integrations/supabase/types";

import { CreativeTemplate } from "@/components/websites/creative/CreativeTemplate";

interface WebsiteClientProps {
    config: Tables<"website_configs">;
}

export default function WebsiteClient({ config }: WebsiteClientProps) {
    // Cast the JSON config to the expected type
    // In a real app, we should validate this with Zod
    const websiteConfig = config.config as any;
    const template = config.template || 'realtor';

    return (
        <BuilderProvider initialConfig={websiteConfig} readOnly={true} userId={config.user_id}>
            {template === 'creative' ? <CreativeTemplate /> : <RealtorTemplate />}
        </BuilderProvider>
    );
}

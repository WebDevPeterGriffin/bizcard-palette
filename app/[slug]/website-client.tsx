"use client";

import { BuilderProvider } from "@/context/BuilderContext";
import { RealtorTemplate } from "@/components/websites/realtor/RealtorTemplate";
import { Tables } from "@/integrations/supabase/types";

interface WebsiteClientProps {
    config: Tables<"website_configs">;
}

export default function WebsiteClient({ config }: WebsiteClientProps) {
    // Cast the JSON config to the expected type
    // In a real app, we should validate this with Zod
    const websiteConfig = config.config as any;

    return (
        <BuilderProvider initialConfig={websiteConfig} readOnly={true} userId={config.user_id}>
            <RealtorTemplate />
        </BuilderProvider>
    );
}

"use client";

import React, { useEffect, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { BuilderProvider, useBuilder, WebsiteConfig } from "@/context/BuilderContext";
import { CreativeTemplate } from "@/components/websites/creative/CreativeTemplate";
import { RealtorTemplate } from "@/components/websites/realtor/RealtorTemplate";
import { realtorConfig } from "@/config/templates/realtor.config";
import { creativeConfig } from "@/config/templates/creative.config";
import { useParams, useRouter } from "next/navigation";

const PreviewContent = () => {
    const { config, setConfig } = useBuilder();
    const params = useParams();
    const router = useRouter();
    const templateParam = params.template as string;

    useEffect(() => {
        if (templateParam === 'realtor') {
            setConfig(realtorConfig);
        } else if (templateParam === 'creative') {
            setConfig(creativeConfig);
        } else {
            router.push('/');
        }
    }, [templateParam, setConfig, router]);

    return (
        <>
            {config.template === 'creative' ? <CreativeTemplate /> : <RealtorTemplate />}
        </>
    );
};

export default function TemplatePreviewPage() {
    return (
        <BuilderProvider readOnly>
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
            }>
                <PreviewContent />
            </Suspense>
        </BuilderProvider>
    );
}

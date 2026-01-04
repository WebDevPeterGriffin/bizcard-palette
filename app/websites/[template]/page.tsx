"use client";

import React, { useEffect, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { BuilderProvider, useBuilder } from "@/context/BuilderContext";
import { BuilderPanel } from "@/components/builder/BuilderPanel";
import { WelcomeModal } from "@/components/builder/WelcomeModal";
import { CreativeTemplate } from "@/components/websites/creative/CreativeTemplate";
import { RealtorTemplate } from "@/components/websites/realtor/RealtorTemplate";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";

const EditorPageContent = () => {
    const { loadConfig, config } = useBuilder();
    const params = useParams();
    const router = useRouter();
    const templateParam = params.template as string;

    useEffect(() => {
        const init = async () => {
            if (templateParam === 'realtor' || templateParam === 'creative') {
                await loadConfig(templateParam);
            } else {
                // Invalid template, redirect to templates page
                router.push('/websites');
            }
        };
        init();
    }, [loadConfig, templateParam, router]);

    return (
        <>
            <WelcomeModal />
            <BuilderPanel />
            {config.template === 'creative' ? <CreativeTemplate /> : <RealtorTemplate />}
        </>
    );
};

export default function EditorPage() {
    const [userId, setUserId] = React.useState<string | undefined>(undefined);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                setUserId(user.id);
            }
        });
    }, []);

    return (
        <BuilderProvider userId={userId}>
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
            }>
                <EditorPageContent />
            </Suspense>
        </BuilderProvider>
    );
}

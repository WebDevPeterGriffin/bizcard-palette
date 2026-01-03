"use client";

import React, { useEffect } from "react";
import { BuilderProvider, useBuilder } from "@/context/BuilderContext";
import { BuilderPanel } from "@/components/builder/BuilderPanel";
import { WelcomeModal } from "@/components/builder/WelcomeModal";


import { RealtorTemplate } from "@/components/websites/realtor/RealtorTemplate";

import { createClient } from "@/lib/supabase/client";

const RealtorPageContent = () => {
    const { loadConfig } = useBuilder();

    useEffect(() => {
        loadConfig();
    }, [loadConfig]);

    return (
        <>
            <WelcomeModal />
            <BuilderPanel />
            <RealtorTemplate />
        </>
    );
};

export default function RealtorPage() {
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
            <RealtorPageContent />
        </BuilderProvider>
    );
}

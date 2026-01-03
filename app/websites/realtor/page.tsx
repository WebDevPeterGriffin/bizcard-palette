"use client";

import { useEffect } from "react";
import { BuilderProvider, useBuilder } from "@/context/BuilderContext";
import { BuilderPanel } from "@/components/builder/BuilderPanel";
import { WelcomeModal } from "@/components/builder/WelcomeModal";


import { RealtorTemplate } from "@/components/websites/realtor/RealtorTemplate";

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
    return (
        <BuilderProvider>
            <RealtorPageContent />
        </BuilderProvider>
    );
}

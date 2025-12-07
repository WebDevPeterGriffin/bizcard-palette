import { Metadata } from "next";
import RequestFormClient from "./client";

export const metadata: Metadata = {
    title: "Create Your Digital Business Card - Request Form",
    description: "Fill out our simple form to create your personalized digital business card. Add your contact info, social links, and headshot to get started.",
    alternates: {
        canonical: "/request",
    },
};

export default function RequestPage() {
    return <RequestFormClient />;
}

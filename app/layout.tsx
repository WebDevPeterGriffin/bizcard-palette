import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MildTech Studios - Digital Business Cards & Website Templates",
    description: "Create your professional digital business card. Eco-friendly, easy to share, modern alternative to paper cards. Choose from beautiful styles and get your personalized card instantly.",
    authors: [{ name: "MildTech Studios" }],
    icons: {
        icon: "/icon.svg",
    },
    openGraph: {
        title: "MildTech Studios - Professional Digital Solutions",
        description: "Create your professional digital business card. Eco-friendly, easy to share, modern alternative to paper cards.",
        type: "website",
        images: ["/images/icon.svg"],
    },
    twitter: {
        card: "summary_large_image",
        site: "@mildtechstudios",
        images: ["/images/icon.svg"],
    },
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "MildTech Studios",
    },
    other: {
        "mobile-web-app-capable": "yes",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}

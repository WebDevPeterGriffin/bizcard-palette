import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Digital Business Cards - Eco-Friendly Professional Networking",
    description: "Create your professional digital business card. Eco-friendly, easy to share, modern alternative to paper cards. Choose from 4 beautiful styles and get your personalized card instantly.",
    authors: [{ name: "Lovable" }],
    openGraph: {
        title: "Digital Business Cards - Professional Networking",
        description: "Create your professional digital business card. Eco-friendly, easy to share, modern alternative to paper cards.",
        type: "website",
        images: ["https://storage.googleapis.com/gpt-engineer-file-uploads/ZdoB5pEmHIXRFlBMS9MxhXnwerc2/social-images/social-1757587891784-dbc-preview.png"],
    },
    twitter: {
        card: "summary_large_image",
        site: "@lovable_dev",
        images: ["https://storage.googleapis.com/gpt-engineer-file-uploads/ZdoB5pEmHIXRFlBMS9MxhXnwerc2/social-images/social-1757587891784-dbc-preview.png"],
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
                    <Navbar />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}

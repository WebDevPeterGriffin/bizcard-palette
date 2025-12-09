export default function CardLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-[#f5f0e9]">
                {children}
            </body>
        </html>
    );
}

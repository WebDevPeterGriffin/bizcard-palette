import MainLayout from "@/components/MainLayout";

export default function TermsConditions() {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-24 max-w-4xl">
                <h1 className="text-4xl font-bold text-[#1A2D49] mb-8">Terms and Conditions</h1>
                <div className="prose prose-slate max-w-none">
                    <p className="mb-4">Last updated: January 4, 2026</p>

                    <h2 className="text-2xl font-bold text-[#1A2D49] mt-8 mb-4">1. Agreement to Terms</h2>
                    <p className="mb-4">
                        These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Mild Tech Studios ("we," "us" or "our"), concerning your access to and use of our website and services.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1A2D49] mt-8 mb-4">2. Intellectual Property Rights</h2>
                    <p className="mb-4">
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1A2D49] mt-8 mb-4">3. User Representations</h2>
                    <p className="mb-4">
                        By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not a minor in the jurisdiction in which you reside.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1A2D49] mt-8 mb-4">4. Prohibited Activities</h2>
                    <p className="mb-4">
                        You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1A2D49] mt-8 mb-4">5. Termination</h2>
                    <p className="mb-4">
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1A2D49] mt-8 mb-4">6. Contact Us</h2>
                    <p className="mb-4">
                        In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                        <br />
                        Email: support@mildtechstudios.com
                    </p>
                </div>
            </div>
        </MainLayout>
    );
}

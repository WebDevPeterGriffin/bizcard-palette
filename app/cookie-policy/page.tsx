import MainLayout from "@/components/MainLayout";

export default function CookiePolicy() {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-24 max-w-4xl">
                <h1 className="text-4xl font-bold text-[#1A2D49] mb-8">Cookie Policy</h1>
                <div className="prose prose-slate max-w-none">
                    <p className="mb-4">Last updated: January 4, 2026</p>

                    <h2 className="text-2xl font-bold text-[#1A2D49] mt-8 mb-4">1. What Are Cookies</h2>
                    <p className="mb-4">
                        Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1A2D49] mt-8 mb-4">2. How We Use Cookies</h2>
                    <p className="mb-4">
                        We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1A2D49] mt-8 mb-4">3. The Cookies We Set</h2>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>
                            <strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration.
                        </li>
                        <li>
                            <strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page.
                        </li>
                        <li>
                            <strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#1A2D49] mt-8 mb-4">4. Third Party Cookies</h2>
                    <p className="mb-4">
                        In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>
                            This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#1A2D49] mt-8 mb-4">5. More Information</h2>
                    <p className="mb-4">
                        Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
                    </p>
                    <p className="mb-4">
                        For more information, you can contact us at: support@mildtechstudios.com
                    </p>
                </div>
            </div>
        </MainLayout>
    );
}

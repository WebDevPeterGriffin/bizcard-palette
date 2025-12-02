import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import { CARD_COMPONENTS, CARD_META, CardStyleId } from "@/components/cards/registry";

const PreviewCard = () => {
    const navigate = useNavigate();
    const { styleId } = useParams<{ styleId: string }>();

    // Validate styleId
    const isValidStyle = styleId && styleId in CARD_COMPONENTS;
    const styleKey = isValidStyle ? (styleId as CardStyleId) : 'minimal';
    const CardComponent = CARD_COMPONENTS[styleKey];
    const meta = CARD_META[styleKey];

    if (!isValidStyle) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Style Not Found</h1>
                    <Button onClick={() => navigate('/styles')}>Back to Styles</Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={`${meta.name} Preview - Digital Business Card`}
                description={`Preview the ${meta.name} digital business card style. ${meta.description}`}
                canonical={`/preview/${styleId}`}
            />

            <div className="min-h-screen bg-background">
                {/* Header */}
                <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <Button variant="ghost" onClick={() => navigate('/styles')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Styles
                            </Button>
                            <h1 className="text-xl font-semibold">{meta.name} Preview</h1>
                            <Button onClick={() => navigate(`/request?style=${styleId}`)}>
                                Choose This Style
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <main className="container mx-auto px-4 py-12">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">{meta.name} Style</h2>
                            <p className="text-muted-foreground">{meta.description}</p>
                        </div>

                        <div className="flex justify-center">
                            <React.Suspense fallback={<div className="text-center p-8">Loading preview...</div>}>
                                <CardComponent
                                    cardId={`preview-${styleId}`}
                                    slug={`preview-${styleId}`}
                                    name="John Doe"
                                    title="Senior Product Manager"
                                    company="Tech Innovations Inc."
                                    emails={["john.doe@techinnovations.com", "johndoe@gmail.com"]}
                                    phones={["+1 (555) 123-4567", "+1 (555) 987-6543"]}
                                    website="www.johndoe.com"
                                    socialLinks={[
                                        { platform: "linkedin", url: "https://linkedin.com/in/johndoe", label: "LinkedIn" },
                                        { platform: "twitter", url: "https://twitter.com/johndoe", label: "Twitter" },
                                        { platform: "github", url: "https://github.com/johndoe", label: "GitHub" }
                                    ]}
                                    headshotUrl={null}
                                    bookingEnabled={true}
                                    bookingInstructions="Please select your preferred time slot. I'm available Monday-Friday, 9 AM - 5 PM EST."
                                />
                            </React.Suspense>
                        </div>

                        <div className="mt-8 text-center">
                            <Button
                                onClick={() => navigate(`/request?style=${styleId}`)}
                                size="lg"
                                className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90"
                            >
                                Create Your Card with This Style
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default PreviewCard;

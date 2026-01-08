import { Construction } from "lucide-react";

export default function UnderConstructionPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
            <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="bg-brand-primary/5 p-4 rounded-full inline-flex mb-6">
                    <Construction className="w-12 h-12 text-brand-primary" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-3">
                    Website Under Construction
                </h1>
                <p className="text-slate-600 mb-8">
                    This website is currently being worked on by the owner. Please check back soon!
                </p>
                <div className="text-xs text-slate-400">
                    Powered by MildTech Studios
                </div>
            </div>
        </div>
    );
}

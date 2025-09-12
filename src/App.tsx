import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Styles from "./pages/Styles";
import RequestForm from "./pages/RequestForm";
import GeneratedCard from "./pages/GeneratedCard";
import PreviewMinimal from "./pages/PreviewMinimal";
import PreviewElegant from "./pages/PreviewElegant";
import PreviewBold from "./pages/PreviewBold";
import PreviewCreative from "./pages/PreviewCreative";
import PreviewNeon from "./pages/PreviewNeon";
import PreviewFloating from "./pages/PreviewFloating";
import PreviewLiquid from "./pages/PreviewLiquid";
import PreviewCosmic from "./pages/PreviewCosmic";
import PreviewHolographic from "./pages/PreviewHolographic";
import PreviewParticle from "./pages/PreviewParticle";
import PreviewMorphing from "./pages/PreviewMorphing";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/styles" element={<Styles />} />
            <Route path="/preview/minimal" element={<PreviewMinimal />} />
            <Route path="/preview/elegant" element={<PreviewElegant />} />
            <Route path="/preview/bold" element={<PreviewBold />} />
            <Route path="/preview/creative" element={<PreviewCreative />} />
            <Route path="/preview/neon" element={<PreviewNeon />} />
            <Route path="/preview/floating" element={<PreviewFloating />} />
            <Route path="/preview/liquid" element={<PreviewLiquid />} />
            <Route path="/preview/cosmic" element={<PreviewCosmic />} />
            <Route path="/preview/holographic" element={<PreviewHolographic />} />
            <Route path="/preview/particle" element={<PreviewParticle />} />
            <Route path="/preview/morphing" element={<PreviewMorphing />} />
            <Route path="/request" element={<RequestForm />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/card/:slug" element={<GeneratedCard />} />
            <Route path="/:slug" element={<GeneratedCard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
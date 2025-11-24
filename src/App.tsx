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
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import StyleLanding from "./pages/StyleLanding";
import Success from "./pages/Success";
import LandingPageStyles from "./pages/LandingPageStyles";
import PreviewLandingPage from "./pages/PreviewLandingPage";
import PreviewCard from "./pages/PreviewCard";

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
            <Route path="/style/:styleId" element={<StyleLanding />} />
            <Route path="/success/:slug" element={<Success />} />
            <Route path="/landing-pages" element={<LandingPageStyles />} />
            <Route path="/landing-page/preview/:styleId" element={<PreviewLandingPage />} />

            {/* Consolidated Preview Route */}
            <Route path="/preview/:styleId" element={<PreviewCard />} />

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
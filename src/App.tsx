import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Styles from "./pages/Styles";
import GeneratedCard from "./pages/GeneratedCard";
import StyleLanding from "./pages/StyleLanding";
import LandingPageStyles from "./pages/LandingPageStyles";
import PreviewLandingPage from "./pages/PreviewLandingPage";
import PreviewCard from "./pages/PreviewCard";

// Lazy load heavy routes for code splitting
const RequestForm = lazy(() => import("./pages/RequestForm"));
const Admin = lazy(() => import("./pages/Admin"));
const Success = lazy(() => import("./pages/Success"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-lg">Loading...</div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
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
              <Route path="/success/:slug" element={
                <Suspense fallback={<PageLoader />}>
                  <Success />
                </Suspense>
              } />
              <Route path="/landing-pages" element={<LandingPageStyles />} />
              <Route path="/landing-page/preview/:styleId" element={<PreviewLandingPage />} />

              {/* Consolidated Preview Route */}
              <Route path="/preview/:styleId" element={<PreviewCard />} />

              <Route path="/request" element={
                <Suspense fallback={<PageLoader />}>
                  <RequestForm />
                </Suspense>
              } />
              <Route path="/admin" element={
                <Suspense fallback={<PageLoader />}>
                  <Admin />
                </Suspense>
              } />
              <Route path="/:slug" element={<GeneratedCard />} />
              <Route path="*" element={
                <Suspense fallback={<PageLoader />}>
                  <NotFound />
                </Suspense>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
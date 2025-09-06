import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PreviewMinimal from "./pages/PreviewMinimal";
import PreviewBold from "./pages/PreviewBold";
import PreviewElegant from "./pages/PreviewElegant";
import PreviewCreative from "./pages/PreviewCreative";
import RequestForm from "./pages/RequestForm";
import GeneratedCard from "./pages/GeneratedCard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/preview/minimal" element={<PreviewMinimal />} />
          <Route path="/preview/bold" element={<PreviewBold />} />
          <Route path="/preview/elegant" element={<PreviewElegant />} />
          <Route path="/preview/creative" element={<PreviewCreative />} />
          <Route path="/request" element={<RequestForm />} />
          <Route path="/:slug" element={<GeneratedCard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
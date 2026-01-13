import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Clientele from "./pages/Clientele";
import ContactUs from "./pages/ContactUs";
import TheionDigital from "./pages/TheionDigital";
import TheionTechnologies from "./pages/TheionTechnologies";
import TheionRecruits from "./pages/TheionRecruits";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/clientele" element={<Clientele />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/theion-digital" element={<TheionDigital />} />
          <Route path="/theion-technologies" element={<TheionTechnologies />} />
          <Route path="/theion-recruits" element={<TheionRecruits />} />
          {/* Unified Auth Route */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/get-started" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
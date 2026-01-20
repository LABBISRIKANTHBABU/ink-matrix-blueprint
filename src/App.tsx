import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Clientele from "./pages/Clientele";
import ContactUs from "./pages/ContactUs";
import TheonDigital from "./pages/TheonDigital";
import TheonOverseas from "./pages/TheonOverseas";
import TheonRecruiter from "./pages/TheonRecruiter";
import TheonEducation from "./pages/TheonEducation";
import TheonTravel from "./pages/TheonTravel";
import TheonTechnologies from "./pages/TheonTechnologies";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

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
          <Route path="/theon-digital" element={<TheonDigital />} />
          <Route path="/theon-overseas" element={<TheonOverseas />} />
          <Route path="/theon-recruiter" element={<TheonRecruiter />} />
          <Route path="/theon-education" element={<TheonEducation />} />
          <Route path="/theon-travel" element={<TheonTravel />} />
          <Route path="/theon-technologies" element={<TheonTechnologies />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/get-started" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

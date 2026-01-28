import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Clientele from "./pages/Clientele";
import ContactUs from "./pages/ContactUs";
import TheionOverseas from "./pages/TheionOverseas";
import TheionJobs from "./pages/TheionJobs";
import TheionDigital from "./pages/TheionDigital";
import OverseasEducation from "./pages/overseas/OverseasEducation";
import OverseasJobs from "./pages/overseas/OverseasJobs";
import TheionRecruits from "./pages/TheionRecruits";
import TheionEducation from "./pages/TheionEducation";
import TheionTravel from "./pages/TheionTravel";
import TheionTechnologies from "./pages/TheionTechnologies";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

// Inner component to handle routes and animation
const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about-us" element={<PageTransition><AboutUs /></PageTransition>} />
        <Route path="/clientele" element={<PageTransition><Clientele /></PageTransition>} />
        <Route path="/contact-us" element={<PageTransition><ContactUs /></PageTransition>} />
        <Route path="/theion-digital" element={<PageTransition><TheionDigital /></PageTransition>} />
        <Route path="/theion-overseas" element={<PageTransition><TheionOverseas /></PageTransition>} />
        <Route path="/theion-jobs" element={<PageTransition><TheionJobs /></PageTransition>} />
        <Route path="/theion-overseas/education" element={<PageTransition><OverseasEducation /></PageTransition>} />
        <Route path="/theion-overseas/jobs" element={<PageTransition><OverseasJobs /></PageTransition>} />
        <Route path="/theion-recruits" element={<PageTransition><TheionRecruits /></PageTransition>} />
        <Route path="/theion-education" element={<PageTransition><TheionEducation /></PageTransition>} />
        <Route path="/theion-travel" element={<PageTransition><TheionTravel /></PageTransition>} />
        <Route path="/theion-technologies" element={<PageTransition><TheionTechnologies /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
        <Route path="/get-started" element={<PageTransition><AuthPage /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

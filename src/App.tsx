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
        <Route path="/theon-digital" element={<PageTransition><TheonDigital /></PageTransition>} />
        <Route path="/theon-overseas" element={<PageTransition><TheonOverseas /></PageTransition>} />
        <Route path="/theon-recruiter" element={<PageTransition><TheonRecruiter /></PageTransition>} />
        <Route path="/theon-education" element={<PageTransition><TheonEducation /></PageTransition>} />
        <Route path="/theon-travel" element={<PageTransition><TheonTravel /></PageTransition>} />
        <Route path="/theon-technologies" element={<PageTransition><TheonTechnologies /></PageTransition>} />
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

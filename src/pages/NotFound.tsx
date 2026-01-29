import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 blur-[120px]" />
      <div className="text-center relative z-10">
        <h1 className="mb-4 text-8xl font-display font-bold text-gradient-gold">404</h1>
        <p className="mb-8 text-2xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="inline-block bg-primary text-black px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

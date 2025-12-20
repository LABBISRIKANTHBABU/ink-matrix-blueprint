import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, User } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/components/home/HeroCarousel';
import TrustBadges from '@/components/home/TrustBadges';
import BusinessNeeds from '@/components/home/BusinessNeeds';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryGrid from '@/components/home/CategoryGrid';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const WelcomeBanner = () => {
  const { user, userProfile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showBanner, setShowBanner] = useState(false);
  
  useEffect(() => {
    // Show banner if user just signed in (detected by 'welcome' param or first load with user)
    const isNewSession = searchParams.get('welcome') === 'true' || 
      (user && sessionStorage.getItem('welcomed') !== 'true');
    
    if (user && isNewSession) {
      setShowBanner(true);
      sessionStorage.setItem('welcomed', 'true');
      // Remove welcome param from URL
      if (searchParams.get('welcome')) {
        searchParams.delete('welcome');
        setSearchParams(searchParams, { replace: true });
      }
      // Auto-hide after 8 seconds
      const timer = setTimeout(() => setShowBanner(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [user, searchParams, setSearchParams]);
  
  const displayName = userProfile?.name || user?.displayName || user?.email?.split('@')[0] || 'there';
  
  if (!user || !showBanner) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-primary via-navy-light to-primary border-b border-accent/20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-accent/20 rounded-full">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />
                ) : (
                  <User className="w-6 h-6 text-accent" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h3 className="text-lg font-semibold text-primary-foreground">
                    Welcome back, {displayName}!
                  </h3>
                </div>
                <p className="text-sm text-primary-foreground/80 mt-0.5">
                  {userProfile?.phone 
                    ? "You're all set! Explore our premium corporate gifts."
                    : "Complete your profile to get personalized recommendations."}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10"
              onClick={() => setShowBanner(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Welcome Banner for authenticated users */}
      <WelcomeBanner />
      
      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Business Needs Section */}
        <BusinessNeeds />

        {/* Bestsellers */}
        <FeaturedProducts
          title="Bestsellers"
          subtitle="Our most popular corporate gifts"
          badge="bestseller"
          limit={4}
        />

        {/* Category Grid */}
        <CategoryGrid />

        {/* New Arrivals */}
        <FeaturedProducts
          title="New Arrivals"
          subtitle="Fresh additions to our collection"
          badge="new"
          limit={4}
        />

        {/* Tech & Gadgets */}
        <div className="bg-muted/30">
          <FeaturedProducts
            title="Tech & Gadgets"
            subtitle="Modern essentials for the digital workplace"
            category="tech-gadgets"
            limit={4}
          />
        </div>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Need Custom Solutions?
            </h2>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8 text-lg">
              Get personalized quotes for bulk orders, custom branding, and exclusive corporate packages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/bulk-orders"
                className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-amber-dark transition-colors shadow-glow"
              >
                Request a Quote
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-primary-foreground text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/10 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

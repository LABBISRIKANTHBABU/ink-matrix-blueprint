import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/components/home/HeroCarousel';
import TrustBadges from '@/components/home/TrustBadges';
import BusinessNeeds from '@/components/home/BusinessNeeds';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryGrid from '@/components/home/CategoryGrid';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
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

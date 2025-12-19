import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: 'Premium Corporate Gifts',
    subtitle: 'Make Every Impression Count',
    description: 'Elevate your brand with custom merchandise that speaks volumes.',
    cta: 'Explore Collection',
    link: '/products',
    image: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=1920&q=80',
  },
  {
    id: 2,
    title: 'Bulk Order Discounts',
    subtitle: 'Up to 40% Off',
    description: 'Special pricing for orders of 50+ units. Perfect for events and teams.',
    cta: 'Get Quote',
    link: '/bulk-orders',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
  },
  {
    id: 3,
    title: 'Custom Drinkware',
    subtitle: 'Your Logo, Your Style',
    description: 'Premium tumblers, mugs, and bottles with laser engraving.',
    cta: 'Shop Drinkware',
    link: '/category/drinkware',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1920&q=80',
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/70 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-primary-foreground"
            >
              <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-sm font-semibold rounded-full mb-4">
                {slides[currentSlide].subtitle}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {slides[currentSlide].title}
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {slides[currentSlide].description}
              </p>
              <Link to={slides[currentSlide].link}>
                <Button size="lg" className="bg-accent hover:bg-amber-dark text-accent-foreground font-semibold px-8 shadow-glow">
                  {slides[currentSlide].cta}
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-card/20 backdrop-blur-sm rounded-full text-primary-foreground hover:bg-card/40 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-card/20 backdrop-blur-sm rounded-full text-primary-foreground hover:bg-card/40 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-accent'
                : 'w-2 bg-primary-foreground/50 hover:bg-primary-foreground/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;

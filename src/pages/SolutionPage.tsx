import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Package, 
  Truck, 
  Palette, 
  Users, 
  Star,
  Rocket,
  Building2,
  PartyPopper,
  Gift,
  Target,
  TrendingUp,
  Sparkles,
  Clock,
  Shield,
  Heart,
  Award
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/data';

// Solution page configurations
const solutionConfigs = {
  startups: {
    title: 'For Startups',
    subtitle: 'Budget-Friendly Branded Merchandise',
    description: 'Launch your brand without breaking the bank. Quality promotional products designed for growing businesses with smart pricing and low minimum orders.',
    heroImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80',
    icon: Rocket,
    color: 'from-emerald-500 to-teal-600',
    stats: [
      { value: '50+', label: 'Products Under ₹100' },
      { value: '25 pcs', label: 'Low MOQ' },
      { value: '48hrs', label: 'Quick Turnaround' },
      { value: '100%', label: 'Customizable' },
    ],
    benefits: [
      { icon: Target, title: 'Budget-Friendly Pricing', description: 'Competitive rates designed for startups with limited marketing budgets' },
      { icon: Package, title: 'Low Minimum Orders', description: 'Start with as few as 25 pieces - perfect for testing products' },
      { icon: Rocket, title: 'Quick Turnaround', description: 'Fast production times to meet your launch deadlines' },
      { icon: Palette, title: 'Free Design Support', description: 'Our designers help bring your brand vision to life' },
    ],
    categories: ['Pens', 'Notebooks & Diaries', 'Keychains', 'Mugs & Tumblers'],
    useCases: [
      'Product launch giveaways',
      'Trade show booth swag',
      'Customer appreciation gifts',
      'Team building merchandise',
      'Social media contest prizes',
      'Referral program incentives',
    ],
    testimonial: {
      quote: "As a bootstrapped startup, every rupee counts. Ink Matrix helped us create professional branded merchandise that made us look established without the enterprise price tag.",
      author: "Priya Sharma",
      role: "Founder, TechStart India",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
    },
    cta: 'Get Startup Pricing',
    filterTags: ['budget', 'affordable', 'startup'],
  },
  corporate: {
    title: 'Corporate Gifts',
    subtitle: 'Premium Gifts for Clients & Partners',
    description: 'Make lasting impressions with sophisticated corporate gifts. Premium quality products that reflect your company\'s excellence and strengthen business relationships.',
    heroImage: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=1200&q=80',
    icon: Building2,
    color: 'from-amber-500 to-orange-600',
    stats: [
      { value: '500+', label: 'Premium Products' },
      { value: 'AAA', label: 'Quality Grade' },
      { value: '15+', label: 'Years Experience' },
      { value: '10K+', label: 'Corporate Clients' },
    ],
    benefits: [
      { icon: Award, title: 'Premium Quality', description: 'Only the finest materials and craftsmanship for distinguished gifts' },
      { icon: Palette, title: 'Elegant Customization', description: 'Sophisticated branding options including embossing and engraving' },
      { icon: Gift, title: 'Luxury Packaging', description: 'Premium gift boxes and presentation that impress recipients' },
      { icon: Users, title: 'Dedicated Account Manager', description: 'Personal support for all your corporate gifting needs' },
    ],
    categories: ['Gift Sets', 'Desktop Organizers', 'Electronics & Accessories', 'Water Bottles'],
    useCases: [
      'Client appreciation gifts',
      'Partner milestone celebrations',
      'Executive gifting programs',
      'Board member presents',
      'VIP customer rewards',
      'Annual corporate gifts',
    ],
    testimonial: {
      quote: "The quality of gifts we received exceeded our expectations. Our clients were genuinely impressed, and it strengthened our business relationships significantly.",
      author: "Rajesh Kumar",
      role: "VP Marketing, Fortune 500 Company",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
    },
    cta: 'Request Premium Catalog',
    filterTags: ['premium', 'luxury', 'executive'],
  },
  events: {
    title: 'Event Merchandise',
    subtitle: 'Branded Swag for Conferences & Events',
    description: 'Create memorable experiences with event-ready merchandise. From conferences to corporate retreats, we deliver branded products that attendees will treasure.',
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    icon: PartyPopper,
    color: 'from-violet-500 to-purple-600',
    stats: [
      { value: '1000+', label: 'Events Served' },
      { value: '7 days', label: 'Rush Delivery' },
      { value: '50K+', label: 'Pieces/Month' },
      { value: '99%', label: 'On-Time Delivery' },
    ],
    benefits: [
      { icon: Clock, title: 'Rush Orders Available', description: 'Tight deadline? We offer expedited production for urgent events' },
      { icon: Package, title: 'Bulk Quantity Discounts', description: 'Save more with volume pricing for large events' },
      { icon: Truck, title: 'Venue Delivery', description: 'Direct delivery to your event venue, hassle-free' },
      { icon: Sparkles, title: 'Trending Products', description: 'Latest and most popular swag items that attendees love' },
    ],
    categories: ['Mugs & Tumblers', 'Pens', 'Keychains', 'Water Bottles'],
    useCases: [
      'Tech conferences',
      'Trade shows & exhibitions',
      'Product launches',
      'Corporate retreats',
      'Seminars & workshops',
      'Award ceremonies',
    ],
    testimonial: {
      quote: "We needed 5000 branded items in just 10 days for our annual conference. Ink Matrix delivered on time and the quality was outstanding. Attendees loved the swag!",
      author: "Amit Patel",
      role: "Event Manager, TechConf India",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
    },
    cta: 'Plan Your Event',
    filterTags: ['event', 'conference', 'bulk'],
  },
  employee: {
    title: 'Employee Kits',
    subtitle: 'Welcome Kits & Appreciation Gifts',
    description: 'Build company culture and boost morale with thoughtfully curated employee kits. From onboarding welcome boxes to recognition awards, celebrate your team.',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    icon: Heart,
    color: 'from-rose-500 to-pink-600',
    stats: [
      { value: '200+', label: 'Companies Trust Us' },
      { value: '50K+', label: 'Employees Gifted' },
      { value: '4.9/5', label: 'Satisfaction Rate' },
      { value: '24/7', label: 'HR Support' },
    ],
    benefits: [
      { icon: Gift, title: 'Curated Kit Options', description: 'Pre-designed kits or fully customized combinations for your team' },
      { icon: Users, title: 'Individual Personalization', description: 'Add employee names and welcome messages to each item' },
      { icon: Truck, title: 'Direct-to-Home Delivery', description: 'Ship kits directly to remote employees anywhere in India' },
      { icon: Shield, title: 'Consistent Quality', description: 'Same premium quality whether ordering 10 or 10,000 kits' },
    ],
    categories: ['Notebooks & Diaries', 'Desktop Organizers', 'Mugs & Tumblers', 'Gift Sets'],
    useCases: [
      'New hire welcome kits',
      'Work anniversary gifts',
      'Festival celebration boxes',
      'Remote employee care packages',
      'Team achievement rewards',
      'Retirement appreciation gifts',
    ],
    testimonial: {
      quote: "Our onboarding experience transformed after partnering with Ink Matrix. New hires feel valued from day one, and it's reflected in our improved retention rates.",
      author: "Sneha Reddy",
      role: "HR Director, Global Tech Corp",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
    },
    cta: 'Build Your Kit',
    filterTags: ['employee', 'welcome', 'appreciation'],
  },
};

const SolutionPage = () => {
  const { solutionId } = useParams<{ solutionId: string }>();
  const config = solutionConfigs[solutionId as keyof typeof solutionConfigs];

  if (!config) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Solution Not Found</h1>
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Filter products by relevant categories
  const relevantProducts = products
    .filter(p => config.categories.includes(p.category))
    .slice(0, 8);

  const IconComponent = config.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={config.heroImage} 
              alt={config.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 py-20">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className={`bg-gradient-to-r ${config.color} text-white border-0 mb-6 px-4 py-2`}>
                  <IconComponent className="w-4 h-4 mr-2" />
                  Business Solutions
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {config.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium mb-4">
                  {config.subtitle}
                </p>
                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                  {config.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                    {config.cta} <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    View Products
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {config.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We understand your unique needs and deliver solutions tailored specifically for {config.title.toLowerCase()}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.benefits.map((benefit, index) => {
                const BenefitIcon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${config.color} flex items-center justify-center mb-4`}>
                      <BenefitIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Perfect For</h2>
                <p className="text-muted-foreground mb-8">
                  Our {config.title.toLowerCase()} solutions are designed for a wide range of business needs
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {config.useCases.map((useCase, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{useCase}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                  "{config.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <img 
                    src={config.testimonial.avatar} 
                    alt={config.testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{config.testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{config.testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Recommended Products Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Recommended Products</h2>
                <p className="text-muted-foreground">
                  Curated selection perfect for {config.title.toLowerCase()}
                </p>
              </div>
              <Link to={`/products?categories=${config.categories.join(',')}`}>
                <Button variant="outline" className="gap-2">
                  View All Products <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relevantProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
              <p className="text-muted-foreground">
                Explore product categories most popular for {config.title.toLowerCase()}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {config.categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link 
                    to={`/products?category=${encodeURIComponent(category)}`}
                    className="block group"
                  >
                    <div className="bg-card rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 border border-border">
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${config.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Package className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-20 bg-gradient-to-r ${config.color}`}>
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Contact our team to discuss your requirements and get a customized quote for your {config.title.toLowerCase()} needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-foreground hover:bg-white/90 gap-2">
                  Get Free Quote <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Call: +91 98765 43210
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SolutionPage;

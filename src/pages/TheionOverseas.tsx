import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/services/theon-overseas.jpg";
import immigrationConsultingImg from "@/assets/services/overseas/immigration_consulting.png";
import internationalPlacementsImg from "@/assets/services/overseas/international_placements.png";
import documentProcessingImg from "@/assets/services/overseas/document_processing.png";
import relocationSupportImg from "@/assets/services/overseas/relocation_support.png";

const services = [
  {
    image: immigrationConsultingImg,
    title: "Immigration Consulting",
    description: "Expert guidance on visa applications, work permits, and immigration processes for multiple countries.",
  },
  {
    image: internationalPlacementsImg,
    title: "International Placements",
    description: "Connect with global opportunities through our extensive network of international employers.",
  },
  {
    image: documentProcessingImg,
    title: "Document Processing",
    description: "Comprehensive document verification, attestation, and processing services.",
  },
  {
    image: relocationSupportImg,
    title: "Relocation Support",
    description: "End-to-end relocation assistance including accommodation, banking, and settlement services.",
  },
];

const destinations = [
  "United Kingdom", "United States", "Canada", "Australia", "Germany", "UAE"
];

const TheonOverseas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="container relative px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
                Global Opportunities
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mt-4 mb-6">
                Theion <span className="text-gradient-gold">Overseas</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Your gateway to international opportunities. We help professionals and
                businesses expand beyond borders with expert immigration and relocation services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/theion-education">
                  <Button className="btn-gold rounded-full px-8 py-6 w-full sm:w-auto">
                    Overseas Education <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/theion-recruits">
                  <Button className="btn-outline-gold rounded-full px-8 py-6 w-full sm:w-auto">
                    Overseas Jobs <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-primary/20 shadow-2xl">
                <img
                  src={heroImg}
                  alt="Theion Overseas Services"
                  className="w-full h-80 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background-secondary">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              Our Services
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-4">
              What We Offer
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card-premium overflow-hidden group h-full flex flex-col"
              >
                <div className="relative h-64 w-full overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>
                  <Link to="/contact-us" className="mt-auto">
                    <Button className="w-full btn-gold rounded-lg py-2 text-sm font-medium" aria-label={`Contact us about ${service.title}`}>
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 bg-background">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              Popular Destinations
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-4">
              Where We Can Help You Go
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 bg-card rounded-xl border border-border/50 text-center hover:border-primary/50 transition-all duration-300"
              >
                <span className="text-foreground font-medium">{destination}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section className="py-20 bg-background-secondary">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
                Target Audience
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6">
                Who Is It For?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our overseas services are designed for professionals seeking international careers,
                students pursuing education abroad, businesses expanding globally, and families
                looking to relocate to new countries for better opportunities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Start Your International Journey
            </h2>
            <p className="text-muted-foreground mb-8">
              Take the first step towards your global aspirations. Contact us today.
            </p>
            <Link to="/contact-us">
              <Button className="btn-gold rounded-full px-10 py-6 text-lg">
                Contact Us Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TheonOverseas;

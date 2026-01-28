import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/services/theon-overseas.jpg";

const countries = [
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "Europe", code: "eu" },
  { name: "China", code: "cn" },
  { name: "Japan", code: "jp" },
  { name: "Australia", code: "au" },
  { name: "New Zealand", code: "nz" },
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
                <Link to="/theion-jobs">
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

      {/* Countries Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              Global Reach
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-4">
              Explore Opportunities By Country
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Select a country to learn more about visa processes, job opportunities, and education pathways.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <Link to="/contact-us" key={country.code}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="card-premium p-6 flex flex-col items-center justify-center gap-4 group cursor-pointer h-full border border-primary/10 hover:border-primary/40 bg-card hover:bg-card/80 transition-all duration-300 rounded-xl shadow-lg hover:shadow-primary/10"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-background shadow-md group-hover:shadow-lg transition-shadow duration-300 relative">
                    <img
                      src={`https://flagcdn.com/${country.code}.svg`}
                      alt={`${country.name} Flag`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors text-center">
                    {country.name}
                  </h3>
                  <span className="text-xs text-primary/60 uppercase tracking-widest font-medium group-hover:text-primary transition-colors">
                    View Details
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section className="py-20 bg-background">
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
      <section className="py-20 bg-background-secondary">
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

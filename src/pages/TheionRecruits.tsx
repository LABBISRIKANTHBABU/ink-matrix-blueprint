import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Globe, MapPin, ArrowRight, Users, Building, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const recruitmentTypes = [
  {
    id: "overseas",
    icon: Globe,
    title: "Overseas Recruitment",
    description: "Access a global talent pool with our international recruitment services. We connect businesses with skilled professionals from around the world, handling all aspects of international hiring including visa processing, relocation support, and cross-cultural integration.",
    features: [
      "Global talent sourcing",
      "Visa and immigration support",
      "Relocation assistance",
      "Cross-cultural onboarding",
      "Compliance management",
    ],
  },
  {
    id: "domestic",
    icon: MapPin,
    title: "Domestic Recruitment",
    description: "Comprehensive local hiring solutions tailored to your regional market. Our domestic recruitment services help you find the right talent quickly, with deep understanding of local labor markets, salary benchmarks, and industry-specific requirements.",
    features: [
      "Local market expertise",
      "Industry-specific sourcing",
      "Background verification",
      "Salary benchmarking",
      "Quick turnaround",
    ],
  },
];

const TheionRecruits = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="container relative px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              Theion Recruits
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mt-4 mb-6">
              Premium <span className="text-gradient-gold">Talent Acquisition</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Premium talent acquisition and workforce solutions for global enterprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-background-secondary border-y border-border/30">
        <div className="container px-6">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: Users, label: "Candidates Placed", value: "500+" },
              { icon: Building, label: "Client Companies", value: "100+" },
              { icon: Briefcase, label: "Industries Served", value: "20+" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <span className="block font-display text-2xl md:text-3xl font-bold text-gradient-gold">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recruitment Types */}
      <section className="py-20 bg-background">
        <div className="container px-6">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {recruitmentTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="card-premium p-8 md:p-10 h-full"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    {type.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {type.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {type.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact-us" className="mt-auto block w-full md:w-auto">
                    <Button className="btn-outline-gold rounded-full px-6 py-5 group w-full" aria-label={`Contact us about ${type.title}`}>
                      Contact Us
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
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
              Looking for the Right Talent?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let us help you find the perfect candidates for your organization.
              Our recruitment experts are ready to assist.
            </p>
            <Link to="/contact-us">
              <Button className="btn-gold px-8 py-6 text-base rounded-full group">
                Start Hiring
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TheionRecruits;
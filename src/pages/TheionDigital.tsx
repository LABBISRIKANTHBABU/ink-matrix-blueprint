import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    image: "/src/assets/services/data-ai.png",
    title: "Data & AI",
    description: "Unlock AI potential with predictive intelligence, generative tools, and autonomous agents to transform your business operations.",
  },
  {
    image: "/src/assets/services/managed-it.png",
    title: "Managed IT Services",
    description: "Digital transformation consulting with strategy and digital presence optimization for modern enterprises.",
  },
  {
    image: "/src/assets/services/cyber-security.png",
    title: "Cyber Security",
    description: "Comprehensive security consulting and digital support to protect your organization from evolving threats.",
  },
  {
    image: "/src/assets/services/cloud-services.png",
    title: "Cloud Services",
    description: "Seamless, secure cloud experiences that scale with your business needs and drive operational efficiency.",
  },
  {
    image: "/src/assets/services/system-integrations.png",
    title: "System Integrations",
    description: "Seamless backend and frontend integration services to unify your technology ecosystem.",
  },
  {
    image: "/src/assets/services/testing.png",
    title: "Testing",
    description: "Manual and automated QA services ensuring reliability, performance, and quality across all platforms.",
  },
  {
    image: "/src/assets/services/digital-marketing.png",
    title: "Digital Marketing",
    description: "SEO, paid advertising, and content strategy to drive leads, visibility, and sustainable growth.",
  },
  {
    image: "/src/assets/services/web-development.png",
    title: "Web Development",
    description: "Secure, scalable websites and applications with exceptional UX focus and modern architecture.",
  },
];

const TheionDigital = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="container relative px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
              <div className="space-y-6 flex flex-col justify-center h-full">
                <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
                  Theion Digital [SAAS]
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
                  Innovative Consulting Solutions for{" "}
                  <span className="text-gradient-gold">Theion Consulting</span>
                </h1>
              </div>

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full aspect-video rounded-3xl overflow-hidden border border-border/50 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent z-10" />
                  <img
                    src="/src/assets/services/theion-digital.png"
                    alt="Theion Digital Details"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="pl-6 border-l border-primary/20">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Comprehensive digital and IT services designed to transform your business
                    and drive sustainable growth.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background-secondary">
        <div className="container px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-premium p-0 overflow-hidden group cursor-pointer h-full flex flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-60" />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
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
              );
            })}
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-muted-foreground mb-8">
              Contact us today to discuss how our digital solutions can help you achieve your goals.
            </p>
            <Link to="/contact-us">
              <Button className="btn-gold px-8 py-6 text-base rounded-full group">
                Get Started
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

export default TheionDigital;
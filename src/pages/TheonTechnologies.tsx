import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/services/theon-technologies.jpg";
import itInfrastructureImg from "@/assets/services/technologies/it_infrastructure.png";
import cloudServicesImg from "@/assets/services/technologies/cloud_services.png";
import cybersecurityImg from "@/assets/services/technologies/cybersecurity.png";
import dataSolutionsImg from "@/assets/services/technologies/data_solutions.png";

const services = [
  {
    image: itInfrastructureImg,
    title: "IT Infrastructure",
    description: "Design, deployment, and management of robust IT infrastructure solutions for enterprises.",
  },
  {
    image: cloudServicesImg,
    title: "Cloud Services",
    description: "Cloud migration, optimization, and managed services for AWS, Azure, and Google Cloud.",
  },
  {
    image: cybersecurityImg,
    title: "Cybersecurity",
    description: "Comprehensive security solutions including assessments, implementation, and monitoring.",
  },
  {
    image: dataSolutionsImg,
    title: "Data Solutions",
    description: "Data architecture, analytics platforms, and business intelligence implementations.",
  },
];

const technologies = [
  "AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "Terraform"
];

const TheonTechnologies = () => {
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
                Tech Solutions
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mt-4 mb-6">
                Theon <span className="text-gradient-gold">Technologies</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Enterprise technology consulting and infrastructure solutions. We help
                organizations build resilient, scalable, and secure technology foundations.
              </p>
              <Link to="/contact-us">
                <Button className="btn-gold rounded-full px-8 py-6">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
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
                  alt="Theon Technologies"
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
              Technology Solutions
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
                className="card-premium overflow-hidden group"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-background">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              Our Expertise
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-4">
              Technologies We Work With
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 bg-card rounded-xl border border-border/50 text-center hover:border-primary/50 transition-all duration-300"
              >
                <span className="text-foreground font-medium">{tech}</span>
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
                Our technology solutions cater to enterprises seeking to modernize their IT infrastructure,
                organizations migrating to cloud platforms, and businesses requiring robust cybersecurity
                and data management solutions.
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
              Ready to Transform Your Technology?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how we can build a better technology foundation for your business.
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

export default TheonTechnologies;

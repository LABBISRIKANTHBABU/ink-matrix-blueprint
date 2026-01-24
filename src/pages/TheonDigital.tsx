import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/services/theon-digital.jpg";
import customSoftwareImg from "@/assets/custom_software.png";
import digitalTransformationImg from "@/assets/digital_transformation.png";
import cloudSolutionsImg from "@/assets/cloud_solutions.png";
import mobileAppImg from "@/assets/mobile_app.png";
import enterpriseIntegrationImg from "@/assets/enterprise_integration.png";
import dataAnalyticsImg from "@/assets/data_analytics.png";

const services = [
  {
    image: dataAnalyticsImg,
    title: "Data Analytics & AI",
    description: "Advanced analytics and AI-powered insights to drive data-informed decision making.",
  },
  {
    image: customSoftwareImg,
    title: "Custom Software Development",
    description: "Tailored software solutions designed to meet your unique business requirements and drive operational efficiency.",
  },
  {
    image: digitalTransformationImg,
    title: "Digital Transformation",
    description: "End-to-end digital transformation strategies that modernize your business processes and technology stack.",
  },
  {
    image: cloudSolutionsImg,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and migration services to enhance flexibility and reduce operational costs.",
  },
  {
    image: mobileAppImg,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
  },
  {
    image: enterpriseIntegrationImg,
    title: "Enterprise Integration",
    description: "Seamless integration of disparate systems to create unified, efficient business workflows.",
  },
];

const TheonDigital = () => {
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
                Digital Solutions
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mt-4 mb-6">
                Theon <span className="text-gradient-gold">Digital</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Transform your business with cutting-edge software solutions and comprehensive
                digital transformation services designed for the modern enterprise.
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
                  alt="Theon Digital Solutions"
                  className="w-full h-80 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Comprehensive digital solutions to accelerate your business growth and stay ahead of the competition.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="relative h-48 w-full overflow-hidden">
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
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our digital solutions are designed for forward-thinking organizations that want to
                leverage technology for competitive advantage. Whether you're a startup looking to
                build your first product or an enterprise seeking digital transformation, we have
                the expertise to help you succeed.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {["Startups & SMEs", "Enterprise Companies", "Government Agencies"].map((item) => (
                  <div key={item} className="p-6 bg-card rounded-xl border border-border/50">
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
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
              Ready to Transform?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how our digital solutions can drive your business forward.
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

export default TheonDigital;

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import SalesforceLogo from "@/assets/Technologies/salesforce.png";
import SAPLogo from "@/assets/Technologies/sap.png";
import MicrosoftLogo from "@/assets/Technologies/microsoft.png";
import AWSLogo from "@/assets/Technologies/aws.png";
import OracleLogo from "@/assets/Technologies/oracle.png";
import MetaLogo from "@/assets/Technologies/meta.png";
import AdobeLogo from "@/assets/Technologies/adobe.png";

const technologies = [
  {
    name: "Salesforce",
    logo: SalesforceLogo,
    description: "CRM implementation and optimization covering Sales Cloud, Service Cloud, Marketing Cloud, and custom development solutions.",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    name: "SAP",
    logo: SAPLogo,
    description: "Business operations transformation with SAP including S/4HANA, ECC, BTP, SuccessFactors, and end-to-end implementations.",
    color: "from-indigo-500/20 to-indigo-600/10",
  },
  {
    name: "Microsoft",
    logo: MicrosoftLogo,
    description: "Secure, scalable solutions with Azure, Dynamics 365, Power Platform, M365, and comprehensive security services.",
    color: "from-cyan-500/20 to-cyan-600/10",
  },
  {
    name: "AWS",
    logo: AWSLogo,
    description: "Cloud-native solutions including cloud strategy, applications, analytics, DevOps, and infrastructure management.",
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    name: "Oracle",
    logo: OracleLogo,
    description: "Enterprise systems via Oracle Cloud, ERP, HCM, and comprehensive database management solutions.",
    color: "from-red-500/20 to-red-600/10",
  },
  {
    name: "Meta Platforms",
    logo: MetaLogo,
    description: "Digital engagement, analytics, and advertising solutions for modern social and digital experiences.",
    color: "from-blue-400/20 to-blue-500/10",
  },
  {
    name: "Adobe",
    logo: AdobeLogo,
    description: "Digital experience optimization with Adobe Experience Cloud, Analytics, Commerce, and Creative Cloud solutions.",
    color: "from-rose-500/20 to-rose-600/10",
  },
];

const TheionTechnologies = () => {
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
              Theion Technologies
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mt-4 mb-6">
              Technology <span className="text-gradient-gold">Partnerships</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Expert consulting and implementation across leading enterprise technology platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technologies List */}
      <section className="py-20 bg-background-secondary">
        <div className="container px-6 max-w-5xl mx-auto">
          <div className="space-y-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-premium p-8 md:p-10"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Logo */}
                  <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center flex-shrink-0 border border-border/50 p-6`}>
                    <img
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      className="w-full h-full object-contain filter brightness-100"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col h-full">
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                      {tech.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {tech.description}
                    </p>
                    <Link to="/contact-us" className="mt-auto">
                      <Button className="btn-outline-gold rounded-lg px-6 py-2 text-sm font-medium group" aria-label={`Contact us about ${tech.name} services`}>
                        Contact Us
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
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
              Need Technology Expertise?
            </h2>
            <p className="text-muted-foreground mb-8">
              Our certified consultants can help you implement and optimize
              enterprise technology solutions tailored to your business needs.
            </p>
            <Link to="/contact-us">
              <Button className="btn-gold px-8 py-6 text-base rounded-full group">
                Contact Our Experts
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

export default TheionTechnologies;
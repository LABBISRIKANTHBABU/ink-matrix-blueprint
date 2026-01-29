import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import SalesforceLogo from "@/assets/Technologies/salesforce_new.png";
import SAPLogo from "@/assets/Technologies/sap_new.png";
import MicrosoftLogo from "@/assets/Technologies/microsoft_new.png";
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
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card border border-border/50 rounded-2xl overflow-hidden group flex flex-col h-full shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                {/* Logo Container */}
                <div className={`aspect-[4/3] bg-gradient-to-br ${tech.color} flex items-center justify-center p-6 relative overflow-hidden backdrop-blur-sm`}>
                  <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-transparent" />
                  <img
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    className="w-full h-full object-contain filter drop-shadow-xl transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {tech.description}
                  </p>

                  <Link to="/contact-us" className="mt-auto">
                    <Button
                      variant="ghost"
                      className="w-full justify-between border border-border/50 hover:bg-primary hover:text-black group/btn"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
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
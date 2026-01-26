import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import client logos
import oracleLogo from "@/assets/clients/oracle.jpg";
import metaLogo from "@/assets/clients/meta.jpg";
import awsLogo from "@/assets/clients/aws.jpg";
import microsoftLogo from "@/assets/clients/microsoft.jpg";
import sapLogo from "@/assets/clients/sap.jpg";
import adobeLogo from "@/assets/clients/adobe.jpg";
import thyTargetLogo from "@/assets/clients/thy-target.jpg";
import tapLogo from "@/assets/clients/tap.jpg";
import upgradLogo from "@/assets/clients/upgrad.jpg";
import keyloopLogo from "@/assets/clients/keyloop.jpg";
import twocomsLogo from "@/assets/clients/2coms.jpg";
import karnatakaGovtLogo from "@/assets/clients/karnataka-govt.jpg";
import virginAtlanticLogo from "@/assets/clients/virgin-atlantic.jpg";
import hurtigrutenLogo from "@/assets/clients/hurtigruten.jpg";

const partners = [
  {
    name: "Oracle",
    logo: oracleLogo,
    description: "Global leader in cloud computing and enterprise software solutions, powering businesses worldwide with innovative database and cloud technologies."
  },
  {
    name: "Meta",
    logo: metaLogo,
    description: "Pioneer in social technology and metaverse development, connecting billions of people through Facebook, Instagram, WhatsApp, and cutting-edge VR platforms."
  },
  {
    name: "AWS",
    logo: awsLogo,
    description: "Amazon Web Services - the world's most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services globally."
  },
  {
    name: "Microsoft",
    logo: microsoftLogo,
    description: "Technology giant empowering individuals and organizations through innovative software, cloud services, and enterprise solutions."
  },
  {
    name: "SAP",
    logo: sapLogo,
    description: "Market leader in enterprise application software, helping companies run at their best with intelligent ERP and business solutions."
  },
  {
    name: "Adobe",
    logo: adobeLogo,
    description: "Creative and digital experience leader, revolutionizing how the world creates, communicates, and collaborates through innovative software."
  },
  {
    name: "Thy Target",
    logo: thyTargetLogo,
    description: "Strategic marketing and brand consultancy specializing in targeted campaigns and digital growth strategies for modern businesses."
  },
  {
    name: "TAP",
    logo: tapLogo,
    description: "Innovative technology and payment solutions provider, enabling seamless digital transactions and business automation."
  },
  {
    name: "upGrad",
    logo: upgradLogo,
    description: "India's largest online higher education company, partnering with world-class universities to offer career-impacting programs."
  },
  {
    name: "Keyloop",
    logo: keyloopLogo,
    description: "Leading automotive retail technology provider, transforming the car buying experience with innovative digital solutions."
  },
  {
    name: "2COMS",
    logo: twocomsLogo,
    description: "Comprehensive HR solutions provider specializing in recruitment, staffing, and skill development services across industries."
  },
  {
    name: "Government of Karnataka",
    logo: karnatakaGovtLogo,
    description: "Official government body of Karnataka state, India, partnering for public sector digital transformation and citizen services."
  },
  {
    name: "Virgin Atlantic",
    logo: virginAtlanticLogo,
    description: "Award-winning British airline known for exceptional customer service and innovative travel experiences across the globe."
  },
  {
    name: "Hurtigruten",
    logo: hurtigrutenLogo,
    description: "World's leading expedition cruise company, offering unique adventure travel and sustainable tourism experiences worldwide."
  },
];

const Clientele = () => {
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
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              Clientele
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground mt-4 mb-6">
              Our <span className="text-gradient-gold">Partners</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Trusted by leading organizations across industries worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 bg-background-secondary">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-card border border-border/50 rounded-xl overflow-hidden group cursor-pointer transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Logo Container */}
                <div className="aspect-[4/3] bg-white flex items-center justify-center p-6 border-b border-border/30">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Description */}
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-4">
              Want to become a partner?
            </p>
            <a 
              href="/contact-us" 
              className="text-primary hover:underline font-medium"
            >
              Get in touch with us →
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Clientele;

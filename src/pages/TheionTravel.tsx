import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/services/theon-travel.jpg";
import corporateTravelImg from "@/assets/services/travel/corporate_travel_management.png"; // Re-using existing
import tourismImg from "@/assets/services/travel/destination_management.png"; // Re-using as Tourism image

const TheionTravel = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="container relative px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-6">
                Theion <span className="text-gradient-gold">Travel</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-foreground/80 mb-4">
                Seamless corporate and leisure travel solutions tailored to your needs
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We simplify travel planning for businesses and individuals with reliable, end-to-end travel services.
              </p>
              <Link to="/contact-us">
                <Button className="btn-gold rounded-full px-8 py-6 text-lg">
                  Contact Us
                </Button>
              </Link>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-primary/20 shadow-2xl">
                <img
                  src={heroImg}
                  alt="Theion Travel Experience"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Our Travel Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Service 1: Corporate Travel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-premium overflow-hidden group flex flex-col h-full rounded-2xl border border-border/50 bg-card hover:border-primary/40 transition-all duration-300"
            >
              <div className="h-64 md:h-80 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={corporateTravelImg}
                  alt="Corporate Travel"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">Corporate Travel</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  End-to-end travel management solutions for businesses, ensuring efficiency, comfort, and cost control.
                </p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {[
                    "Business trip planning",
                    "Flight & accommodation bookings",
                    "Travel coordination for teams",
                    "Flexible scheduling support"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link to="/contact-us" className="mt-auto">
                  <Button className="w-full btn-gold rounded-lg py-6 text-base font-medium">
                    Know More
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Service 2: Tourism Visiting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-premium overflow-hidden group flex flex-col h-full rounded-2xl border border-border/50 bg-card hover:border-primary/40 transition-all duration-300"
            >
              <div className="h-64 md:h-80 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={tourismImg}
                  alt="Tourism Visiting"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">Tourism Visiting</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Personalized tourism and vacation planning services designed for memorable travel experiences.
                </p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {[
                    "Domestic & international tourism",
                    "Customized travel itineraries",
                    "Group & family tours",
                    "End-to-end trip coordination"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link to="/contact-us" className="mt-auto">
                  <Button className="w-full btn-gold rounded-lg py-6 text-base font-medium">
                    Know More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background border-t border-border/30">
        <div className="container px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold text-foreground">
              Why Choose Theion Travel
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Experienced travel coordination",
              "Reliable planning & execution",
              "Customer-focused approach",
              "End-to-end support"
            ].map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border/50 text-center shadow-sm hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-1 bg-primary mx-auto mb-4 rounded-full" />
                <p className="font-medium text-foreground">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay/background adjustment */}
        <div className="container px-6 relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-8">
            Planning a business trip or your next vacation?
          </h2>
          <Link to="/contact-us">
            <Button className="btn-gold rounded-full px-12 py-8 text-xl font-semibold shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TheionTravel;

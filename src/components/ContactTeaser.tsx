import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight, MessageCircle, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Kurnool, Andhra Pradesh",
    subvalue: "India",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+919912245345",
    subvalue: "Mon-Fri, 9AM-5PM",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@theionconsulting.com",
    subvalue: "We reply within 24 hours",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Monday - Friday",
    subvalue: "09:00 AM - 05:00 PM",
  },
];

const ContactTeaser = () => {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4">
            Connect with us Now!
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Contact us for an initial call to understand your business requirements
          </p>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center gap-6 mb-12"
        >
          {[
            { icon: Instagram, href: "https://www.instagram.com/theionconsulting/", label: "Instagram" },
            { icon: Linkedin, href: "https://www.linkedin.com/search/results/all/?keywords=theion%20consulting&origin=GLOBAL_SEARCH_HEADER&sid=NF", label: "LinkedIn" },
            { icon: Twitter, href: "https://x.com/Theionconsultin", label: "Twitter" },
            { icon: Mail, href: "mailto:info@theionconsulting.com", label: "Email" },
          ].map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label === "Email" ? "_self" : "_blank"}
                rel={social.label === "Email" ? "" : "noopener noreferrer"}
                aria-label={social.label}
                className="w-12 h-12 rounded-full bg-background border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                whileHover={{ y: -4, scale: 1.1 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Floating Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-card border border-border/50 rounded-2xl p-8 md:p-12 shadow-[0_20px_80px_-20px_hsl(0_0%_0%_/_0.5)]">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
              <div className="absolute top-4 right-4 w-full h-full border-t-2 border-r-2 border-primary/30 rounded-tr-2xl" />
            </div>

            {/* Contact Info Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-background-secondary flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </span>
                      <p className="text-foreground font-medium mt-1">{item.value}</p>
                      <p className="text-sm text-muted-foreground">{item.subvalue}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border/50">
              <Link to="/contact-us" className="flex-1">
                <Button className="btn-gold w-full py-6 rounded-full group">
                  Contact Us
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a
                href="https://wa.me/919912245345"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="ghost" className="btn-outline-gold w-full py-6 rounded-full group">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Message on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactTeaser;
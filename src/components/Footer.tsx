import { motion } from "framer-motion";
import { Instagram, Linkedin, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/theionconsulting/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/search/results/all/?keywords=theion%20consulting&origin=GLOBAL_SEARCH_HEADER&sid=NF", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/Theionconsultin", label: "Twitter" },
    { icon: Mail, href: "mailto:info@theionconsulting.com", label: "Email" },
  ];

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about-us" },
        { name: "Clientele", href: "/clientele" },
        { name: "Contact Us", href: "/contact-us" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Theion Digital", href: "/theion-digital" },
        { name: "Theion Overseas", href: "/theion-overseas" },
        { name: "Theion Recruits", href: "/theion-recruits" },
        { name: "Theion Education", href: "/theion-education" },
        { name: "Theion Travel", href: "/theion-travel" },
        { name: "Theion Technologies", href: "/theion-technologies" },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t border-border/30">
      <div className="container px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div whileHover={{ scale: 1.02 }} className="inline-block mb-6">
              <Link to="/" className="font-display text-2xl font-semibold text-foreground">
                <span className="text-gradient-gold">THEION</span>
              </Link>
            </motion.div>
            <p className="text-muted-foreground max-w-sm mb-6">
              A new age consulting firm transforming businesses through innovation,
              technology, and strategic partnership.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-background-secondary border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-medium text-foreground mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Theion Consulting – All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
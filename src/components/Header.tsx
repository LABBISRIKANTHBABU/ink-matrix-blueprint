import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "@/assets/logo-circular.png";

import { auth } from "@/lib/firebase"; // Import auth

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser); // Track user state
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Auth listener
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    }
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Clientele", href: "/clientele" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const services = [
    { name: "Theion Digital", href: "/theion-digital" },
    { name: "Theion Overseas", href: "/theion-overseas" },
    { name: "Theion Technologies", href: "/theion-technologies" },
    { name: "Theion Travel", href: "/theion-travel" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-background/95 backdrop-blur-md border-b border-border/50"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative shrink-0">
            <Link to="/" className="flex items-center justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-primary/20 bg-black shadow-lg flex items-center justify-center">
                <img
                  src={logoImg}
                  alt="Theion Consulting"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`nav-link text-sm tracking-wide ${isActive(link.href) ? "active" : ""}`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dynamic Button: Profile or Get Started */}
            {user ? (
              <Link
                to="/profile"
                className="px-5 py-2.5 rounded-full bg-secondary/80 text-secondary-foreground text-sm font-semibold tracking-wide border border-primary/20 hover:bg-secondary transition-all duration-300 flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Profile
              </Link>
            ) : (
              <Link
                to="/auth"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/80 to-primary text-primary-foreground text-sm font-semibold tracking-wide hover:shadow-[0_0_20px_-5px_hsl(41_52%_54%_/_0.5)] transition-all duration-300"
              >
                Get Started
              </Link>
            )}

          </nav>

          {/* Services Dropdown - Desktop */}
          <div className="hidden lg:block relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onMouseEnter={() => setIsDropdownOpen(true)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="tracking-wide">Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            <motion.div
              initial={false}
              animate={{
                opacity: isDropdownOpen ? 1 : 0,
                y: isDropdownOpen ? 0 : 10,
                pointerEvents: isDropdownOpen ? "auto" : "none",
              }}
              transition={{ duration: 0.2 }}
              onMouseLeave={() => setIsDropdownOpen(false)}
              className="absolute right-0 top-full mt-4 w-72 bg-card border border-border/50 rounded-lg overflow-visible shadow-lg"
            >
              {services.map((service) => (
                <div key={service.name} className="relative group/item">
                  <Link
                    to={service.href}
                    className={`flex items-center justify-between px-5 py-4 text-sm transition-all duration-300 border-b border-border/30 last:border-0 ${isActive(service.href)
                      ? "text-foreground bg-background-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-background-secondary"
                      }`}
                    onClick={() => {
                      if (service.name !== "Theion Overseas") setIsDropdownOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                      {service.name}
                    </div>
                    {service.name === "Theion Overseas" && (
                      <ChevronDown className="w-4 h-4 -rotate-90 text-muted-foreground" />
                    )}
                  </Link>

                  {/* Sub-menu for Theion Overseas */}
                  {service.name === "Theion Overseas" && (
                    <div className="absolute top-0 right-full mr-2 w-64 bg-card border border-border/50 rounded-lg shadow-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300">
                      <Link
                        to="/theion-education"
                        className="block px-5 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-background-secondary border-b border-border/30 first:rounded-t-lg"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Overseas Education
                      </Link>
                      <Link
                        to="/theion-recruits"
                        className="block px-5 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-background-secondary last:rounded-b-lg"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Overseas Jobs
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border/50"
          >
            <nav className="container px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm tracking-wide py-2 ${isActive(link.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-border/30 pt-4 mt-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Services</span>
                {services.map((service) => (
                  <div key={service.name}>
                    <Link
                      to={service.href}
                      className={`block text-sm tracking-wide py-2 mt-2 ${isActive(service.href) ? "text-primary" : "text-muted-foreground"
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {service.name}
                    </Link>
                    {service.name === "Theion Overseas" && (
                      <div className="pl-4 border-l border-border/30 ml-2 mt-1 space-y-2">
                        <Link
                          to="/theion-education"
                          className="block text-sm text-muted-foreground/80 hover:text-foreground"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Overseas Education
                        </Link>
                        <Link
                          to="/theion-recruits"
                          className="block text-sm text-muted-foreground/80 hover:text-foreground"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Overseas Jobs
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-2">
                {/* Mobile Dynamic Button */}
                {user ? (
                  <Link
                    to="/profile"
                    className="block w-full text-center px-5 py-3 rounded-xl bg-secondary/80 text-secondary-foreground text-sm font-bold tracking-wide shadow-lg border border-primary/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    className="block w-full text-center px-5 py-3 rounded-xl bg-gradient-to-r from-primary/80 to-primary text-primary-foreground text-sm font-bold tracking-wide shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
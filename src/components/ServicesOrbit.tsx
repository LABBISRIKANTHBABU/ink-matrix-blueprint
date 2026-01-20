import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/theion-logo.jpg";

// Service images
import theonDigitalImg from "@/assets/services/theon-digital.jpg";
import theonOverseasImg from "@/assets/services/theon-overseas.jpg";
import theonRecruiterImg from "@/assets/services/theon-recruiter.jpg";
import theonEducationImg from "@/assets/services/theon-education.jpg";
import theonTravelImg from "@/assets/services/theon-travel.jpg";
import theonTechnologiesImg from "@/assets/services/theon-technologies.jpg";

const services = [
  {
    id: "digital",
    name: "Theon Digital",
    description: "Cutting-edge software solutions and digital transformation.",
    image: theonDigitalImg,
    link: "/theon-digital"
  },
  {
    id: "overseas",
    name: "Theon Overseas",
    description: "Global expansion and international business solutions.",
    image: theonOverseasImg,
    link: "/theon-overseas"
  },
  {
    id: "recruiter",
    name: "Theon Recruiter",
    description: "Premium talent acquisition and workforce solutions.",
    image: theonRecruiterImg,
    link: "/theon-recruiter"
  },
  {
    id: "education",
    name: "Theon Education",
    description: "Professional training and skill development programs.",
    image: theonEducationImg,
    link: "/theon-education"
  },
  {
    id: "travel",
    name: "Theon Travel",
    description: "Corporate travel management and executive services.",
    image: theonTravelImg,
    link: "/theon-travel"
  },
  {
    id: "technologies",
    name: "Theon Technologies",
    description: "Enterprise technology consulting and infrastructure.",
    image: theonTechnologiesImg,
    link: "/theon-technologies"
  },
];

const ServicesOrbit = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [tooltipSide, setTooltipSide] = useState<'left' | 'right'>('right');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const orbitRadius = isMobile ? 140 : 230;

  const handleMouseEnter = (e: React.MouseEvent, serviceId: string) => {
    if (!isMobile) {
      setIsHovered(true);
      setActiveService(serviceId);

      const rect = e.currentTarget.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (rect.left + rect.width / 2 < viewportWidth / 2) {
        setTooltipSide('left');
      } else {
        setTooltipSide('right');
      }
    }
  };

  const handleServiceClick = (e: React.MouseEvent | React.TouchEvent, serviceId: string) => {
    if (isMobile) {
      if (activeService === serviceId) {
        return;
      } else {
        e.preventDefault();
        setActiveService(serviceId);
      }
    }
  };

  return (
    <section className="relative py-12 md:py-24 overflow-hidden bg-background">
      {/* Section Header */}
      <div className="container px-6 mb-8 md:mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
            Our Expertise
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mt-4">
            Comprehensive Solutions
          </h2>
        </motion.div>
      </div>

      {/* Orbit View */}
      <div className="flex flex-col relative items-center justify-center h-[450px] md:h-[650px] w-full max-w-[900px] mx-auto perspective-[1000px]">
        {/* Center Static Logo with Gold Ring */}
        <div className="absolute z-20 w-28 h-28 md:w-40 md:h-40 rounded-full flex items-center justify-center">
          {/* Outer gold ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/60 animate-pulse-glow" />
          {/* Inner container */}
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-card border border-primary/20 flex items-center justify-center shadow-2xl shadow-black/80 overflow-hidden">
            <img
              src={logoImg}
              alt="Theion Consulting Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mobile Central Active Service Label */}
        <AnimatePresence>
          {isMobile && activeService && (
            <div className="absolute z-50 pointer-events-none flex flex-col items-center justify-center w-full top-1/2 mt-28">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-card/90 backdrop-blur-md border border-primary/30 rounded-xl px-6 py-3 shadow-xl text-center"
              >
                <span className="text-primary font-display font-semibold text-sm tracking-wide block">
                  {services.find(s => s.id === activeService)?.name}
                </span>
                <Link 
                  to={services.find(s => s.id === activeService)?.link || "#"}
                  className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"
                >
                  View Details <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Rotating Orbit Container */}
        <div
          className={`absolute inset-0 w-full h-full flex items-center justify-center animate-orbit ${isHovered || (isMobile && activeService) ? 'paused' : ''}`}
        >
          {services.map((service, index) => {
            const angleDeg = (index * 360) / services.length;
            const angleRad = (angleDeg * Math.PI) / 180;

            const x = Math.cos(angleRad) * orbitRadius;
            const y = Math.sin(angleRad) * orbitRadius;

            return (
              <div
                key={service.id}
                className="absolute flex items-center justify-center"
                style={{
                  transform: `translate(${x}px, ${y}px)`
                }}
              >
                {/* Counter-Rotating Node to keep it upright */}
                <div className={`animate-counter-orbit ${isHovered || (isMobile && activeService) ? 'paused' : ''}`}>
                  <Link
                    to={service.link}
                    className="relative group block"
                    onClick={(e) => handleServiceClick(e, service.id)}
                    onMouseEnter={(e) => handleMouseEnter(e, service.id)}
                    onMouseLeave={() => {
                      if (!isMobile) {
                        setIsHovered(false);
                        setActiveService(null);
                      }
                    }}
                  >
                    {/* Service Node Circle with Image */}
                    <motion.div
                      animate={{
                        scale: activeService === service.id ? 1.15 : 1,
                        borderColor: activeService === service.id ? "hsl(41 52% 54%)" : "rgba(255,255,255,0.1)",
                      }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 backdrop-blur-md flex flex-col items-center justify-center relative z-30 transition-all duration-300 overflow-hidden"
                      style={{
                        boxShadow: activeService === service.id ? "0 0 30px -5px hsl(41 52% 54% / 0.5)" : "none"
                      }}
                    >
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay with service name */}
                      <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${activeService === service.id ? 'opacity-0' : 'opacity-60'}`}>
                        <span className="text-[8px] md:text-[10px] text-foreground font-medium text-center px-1 leading-tight">
                          {service.name.replace("Theon ", "")}
                        </span>
                      </div>
                    </motion.div>

                    {/* Tooltip Label Panel - DESKTOP ONLY */}
                    <AnimatePresence>
                      {activeService === service.id && !isMobile && (
                        <motion.div
                          initial={{ opacity: 0, x: tooltipSide === 'left' ? -20 : 20, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: tooltipSide === 'left' ? -10 : 10, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-1/2 -translate-y-1/2 w-72 z-40 ${tooltipSide === 'left'
                            ? "right-full mr-6"
                            : "left-full ml-6"
                            }`}
                        >
                          <div className="bg-popover/95 backdrop-blur-xl border border-primary/30 rounded-xl p-5 shadow-2xl relative">
                            {/* Connector Line */}
                            <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-[1px] bg-primary/50 ${tooltipSide === 'left' ? "left-full" : "right-full"
                              }`} />
                            <div className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary ${tooltipSide === 'left' ? "left-full -ml-1" : "right-full -mr-1"
                              }`} />

                            <h3 className="font-display font-semibold text-primary text-lg mb-2">{service.name}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{service.description}</p>
                            <div className="text-[10px] text-primary uppercase tracking-widest font-bold flex items-center gap-1.5 pt-2 border-t border-border/30">
                              View Details <ArrowRight className="w-3 h-3" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOrbit;

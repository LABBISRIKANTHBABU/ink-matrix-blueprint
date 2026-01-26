import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Monitor, Globe, Users, GraduationCap, Plane, Server } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/theion-logo.jpg";

const services = [
  {
    id: "digital",
    name: "Theion Digital",
    description: "Cutting-edge software solutions and digital transformation.",
    icon: Monitor,
    link: "/theion-digital"
  },
  {
    id: "overseas",
    name: "Theion Overseas",
    description: "Global expansion and international business solutions.",
    icon: Globe,
    link: "/theion-overseas"
  },
  {
    id: "travel",
    name: "Theion Travel",
    description: "Corporate travel management and executive services.",
    icon: Plane,
    link: "/theion-travel"
  },
  {
    id: "technologies",
    name: "Theion Technologies",
    description: "Enterprise technology consulting and infrastructure.",
    icon: Server,
    link: "/theion-technologies"
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
  const orbitRadius = isMobile ? 150 : 260; // Increased radius slightly for bigger nodes

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
      <div className="flex flex-col relative items-center justify-center h-[500px] md:h-[750px] w-full max-w-[1000px] mx-auto perspective-[1000px]">
        {/* Center Static Logo with Enhanced Gold Ring */}
        <div className="absolute z-20 w-40 h-40 md:w-60 md:h-60 rounded-full flex items-center justify-center">
          {/* Outer gold ring / Glow */}
          <div className="absolute inset-0 rounded-full border border-primary/40 shadow-[0_0_60px_10px_hsl(41_52%_54%_/_0.3)] animate-pulse-glow" />
          <div className="absolute inset-2 rounded-full border border-primary/20" />

          {/* Inner container */}
          <div className="w-36 h-36 md:w-56 md:h-56 rounded-full bg-black/80 backdrop-blur-sm border border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(201,162,77,0.2)] overflow-hidden">
            <img
              src={logoImg}
              alt="Theion Consulting Logo"
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Mobile Central Active Service Label */}
        <AnimatePresence>
          {isMobile && activeService && (
            <div className="absolute z-50 pointer-events-none flex flex-col items-center justify-center w-full top-1/2 mt-32">
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
            const Icon = service.icon;

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
                    {/* Service Node Circle with Icon and Text */}
                    <motion.div
                      animate={{
                        scale: activeService === service.id ? 1.1 : 1,
                        borderColor: activeService === service.id ? "hsl(41 52% 54%)" : "rgba(201,162,77,0.2)",
                        backgroundColor: activeService === service.id ? "rgba(20,20,20,0.95)" : "rgba(10,10,10,0.85)",
                      }}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full border backdrop-blur-md flex flex-col items-center justify-center relative z-30 transition-all duration-300 shadow-lg px-2 text-center gap-1"
                      style={{
                        boxShadow: activeService === service.id ? "0 0 30px -5px hsl(41 52% 54% / 0.5)" : "0 4px 10px rgba(0,0,0,0.5)"
                      }}
                    >
                      <Icon className={`w-6 h-6 md:w-8 md:h-8 mb-1 ${activeService === service.id ? 'text-primary' : 'text-muted-foreground group-hover:text-primary transition-colors'}`} />

                      <span className={`text-[9px] md:text-[11px] font-medium leading-tight ${activeService === service.id ? 'text-primary' : 'text-foreground/80'}`}>
                        {service.name.replace("Theion ", "")}
                      </span>
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

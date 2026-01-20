import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Search, Target, Award } from "lucide-react";
import heroImg from "@/assets/services/theon-recruiter.jpg";

const services = [
  {
    icon: Search,
    title: "Executive Search",
    description: "Specialized recruitment for C-suite and senior leadership positions across industries."
  },
  {
    icon: Users,
    title: "Bulk Hiring",
    description: "Efficient large-scale recruitment solutions for organizations with high-volume hiring needs."
  },
  {
    icon: Target,
    title: "Specialized Recruitment",
    description: "Targeted talent acquisition for niche roles in IT, healthcare, engineering, and more."
  },
  {
    icon: Award,
    title: "RPO Services",
    description: "Comprehensive Recruitment Process Outsourcing to streamline your entire hiring workflow."
  }
];

const stats = [
  { value: "5000+", label: "Candidates Placed" },
  { value: "200+", label: "Client Companies" },
  { value: "15+", label: "Industries Served" }
];

const TheonRecruiter = () => {
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
                Talent Solutions
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mt-4 mb-6">
                Theon <span className="text-gradient-gold">Recruiter</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Premium talent acquisition and workforce solutions. We connect exceptional 
                candidates with leading organizations to build high-performing teams.
              </p>
              <Link to="/contact-us">
                <Button className="btn-gold rounded-full px-8 py-6">
                  Start Hiring <ArrowRight className="ml-2 w-5 h-5" />
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
                  alt="Theon Recruiter Services" 
                  className="w-full h-80 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-background-secondary border-y border-border/30">
        <div className="container px-6">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="block font-display text-3xl md:text-4xl font-bold text-gradient-gold">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground mt-2">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
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
              Recruitment Solutions
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-premium p-8 flex gap-6"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section className="py-20 bg-background-secondary">
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
              <p className="text-muted-foreground leading-relaxed">
                Our recruitment services cater to companies of all sizes—from startups building 
                their founding teams to large enterprises scaling their workforce. We also help 
                job seekers find their dream roles at top organizations.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <div className="p-6 bg-card rounded-xl border border-border/50">
                  <h3 className="text-foreground font-semibold mb-2">For Employers</h3>
                  <p className="text-muted-foreground text-sm">Find the right talent faster with our expert recruitment team.</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border/50">
                  <h3 className="text-foreground font-semibold mb-2">For Job Seekers</h3>
                  <p className="text-muted-foreground text-sm">Access exclusive job opportunities at leading companies.</p>
                </div>
              </div>
            </motion.div>
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
              Ready to Build Your Dream Team?
            </h2>
            <p className="text-muted-foreground mb-8">
              Partner with us to find exceptional talent for your organization.
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

export default TheonRecruiter;

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/services/theon-education.jpg";
import technicalTrainingImg from "@/assets/services/education/technical_training.png";
import corporateTrainingImg from "@/assets/services/education/corporate_training.png";
import professionalCertificationsImg from "@/assets/services/education/professional_certifications.png";
import skillDevelopmentImg from "@/assets/services/education/skill_development.png";

const programs = [
  {
    image: technicalTrainingImg,
    title: "Technical Training",
    description: "Industry-relevant courses in software development, data science, cloud computing, and cybersecurity.",
  },
  {
    image: corporateTrainingImg,
    title: "Corporate Training",
    description: "Customized training programs for organizations to upskill their workforce.",
  },
  {
    image: professionalCertificationsImg,
    title: "Professional Certifications",
    description: "Preparation courses for globally recognized certifications in various domains.",
  },
  {
    image: skillDevelopmentImg,
    title: "Skill Development",
    description: "Soft skills, leadership, and management training for career advancement.",
  },
];

const features = [
  "Expert Industry Instructors",
  "Hands-on Projects",
  "Flexible Learning Options",
  "Career Support Services",
  "Industry Partnerships",
  "Certification Programs"
];

const TheonEducation = () => {
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
                Learning & Development
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mt-4 mb-6">
                Theon <span className="text-gradient-gold">Education</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Empowering professionals with world-class training and skill development
                programs designed to accelerate career growth and organizational success.
              </p>
              <Link to="/contact-us">
                <Button className="btn-gold rounded-full px-8 py-6">
                  Explore Programs <ArrowRight className="ml-2 w-5 h-5" />
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
                  alt="Theon Education Programs"
                  className="w-full h-80 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-background-secondary">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              Our Programs
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-4">
              What We Offer
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card-premium overflow-hidden group"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-4">
              Our Advantages
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 bg-card rounded-xl border border-border/50 text-center hover:border-primary/50 transition-all duration-300"
              >
                <span className="text-foreground font-medium">{feature}</span>
              </motion.div>
            ))}
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
                Our education programs cater to students looking to kickstart their careers,
                professionals seeking to upskill, and organizations wanting to develop their
                workforce capabilities for sustained competitive advantage.
              </p>
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
              Start Your Learning Journey
            </h2>
            <p className="text-muted-foreground mb-8">
              Invest in your future with our comprehensive training programs.
            </p>
            <Link to="/contact-us">
              <Button className="btn-gold rounded-full px-10 py-6 text-lg">
                Enroll Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TheonEducation;

import logoImg from "@/assets/theion-logo.jpg";
import collaborativeImg from "@/assets/collaborative.png";
import agileImg from "@/assets/agile.png";
import outcomeImg from "@/assets/outcome.png";
import teamImg from "@/assets/team.png";

import { motion, useInView } from "framer-motion";

import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


// import { Users, Target, Lightbulb, Handshake } from "lucide-react";

const approachItems = [
  {
    image: collaborativeImg,
    title: "Collaborative",
    description: "We work closely with clients to understand their unique challenges and goals.",
  },
  {
    image: agileImg,
    title: "Agile",
    description: "Adaptive methodologies that respond quickly to changing business needs.",
  },
  {
    image: outcomeImg,
    title: "Outcome-Driven",
    description: "Focused on delivering measurable value and tangible results.",
  },
  {
    image: teamImg,
    title: "Expert Team",
    description: "Experienced consultants, tech specialists, and recruitment professionals.",
  },
];

const AboutUs = () => {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });

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
            className="max-w-3xl"
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              About Us
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground mt-4 mb-6">
              About <span className="text-gradient-gold">Theion Consulting</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Theion Consulting is a global firm established in 2023 with headquarters in London, United Kingdom.
              We provide IT consulting, business solutions, and talent services to organizations that aim for
              scalable, high-impact growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-background-secondary">
        <div className="container px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Who Are We
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We work with organizations that aim for scalable, high-impact growth. Our expertise lies in
                aligning technology, strategy, and skilled talent with business objectives to deliver
                transformative results.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team brings together experienced consultants, technology specialists, and recruitment
                professionals who combine strategic thinking with hands-on expertise to understand your
                goals and deliver outcomes that matter.
              </p>
            </motion.div>

            {/* Decorative Element */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-80 hidden lg:block"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 rounded-full border border-primary/20 flex items-center justify-center">
                  <div className="w-72 h-72 rounded-full border border-primary/30 flex items-center justify-center">
                    <div className="w-56 h-56 rounded-full bg-gradient-to-br from-primary/40 via-black to-black flex items-center justify-center overflow-hidden shadow-2xl shadow-primary/20">
                      <img src={logoImg} alt="Theion Consulting" className="w-full h-full object-contain scale-110" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-background">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              How We Work
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-4">
              Our Approach
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              We deliver tailored solutions through collaborative, agile, and outcome-driven methodologies
              that align with your business objectives.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approachItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card-premium p-6 text-center group"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg border border-primary/20 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Our Team Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
                Our People
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6">
                Our Team
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our team consists of experienced consultants, technology specialists, and recruitment
                professionals who bring together strategic thinking and hands-on expertise. We work
                closely with clients to understand their goals and deliver outcomes that matter.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our focus is on collaboration, accountability, and continuous improvement — ensuring
                every engagement creates lasting value for your organization.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-8 mt-12"
            >
              {[
                { value: "2023", label: "Established" },
                { value: "London", label: "Headquarters" },
                { value: "Global", label: "Reach" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="block font-display text-2xl md:text-3xl font-bold text-gradient-gold">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div >
      </section >

      <Footer />
    </div >
  );
};

export default AboutUs;
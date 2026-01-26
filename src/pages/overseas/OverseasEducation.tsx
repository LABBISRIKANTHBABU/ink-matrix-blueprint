import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import corporateTrainingImg from "@/assets/services/education/corporate_training.png";
import professionalCertImg from "@/assets/services/education/professional_certifications.png";
import skillDevImg from "@/assets/services/education/skill_development.png";
import technicalTrainingImg from "@/assets/services/education/technical_training.png";

const services = [
    {
        image: professionalCertImg,
        title: "University Admission",
        description: "Guidance on selecting top universities and navigating the admission process for your desired course.",
    },
    {
        image: skillDevImg,
        title: "Course Selection",
        description: "Expert advice on choosing the right course that aligns with your career goals and interests.",
    },
    {
        image: corporateTrainingImg,
        title: "Student Visa Support",
        description: "Comprehensive assistance with student visa applications, financial documentation, and interviews.",
    },
    {
        image: technicalTrainingImg,
        title: "Scholarship Assistance",
        description: "Help in identifying and applying for scholarships to reduce the financial burden of overseas education.",
    },
];

const OverseasEducation = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial opacity-50" />
                <div className="container relative px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
                            Theion Overseas
                        </span>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mt-4 mb-6">
                            Overseas <span className="text-gradient-gold">Education</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Unlock global opportunities with world-class education. We guide you every step of the way.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services */}
            <section className="py-20 bg-background-secondary">
                <div className="container px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="card-premium overflow-hidden group h-full"
                            >
                                <div className="relative h-48 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                                        {service.description}
                                    </p>
                                    <Link to="/contact-us" className="mt-auto">
                                        <Button className="w-full btn-gold rounded-lg py-2 text-sm font-medium" aria-label={`Contact us about ${service.title}`}>
                                            Contact Us
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
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
                            Start Your Educational Journey
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Contact our education counselors today to plan your future abroad.
                        </p>
                        <Link to="/contact-us">
                            <Button className="btn-gold rounded-full px-10 py-6 text-lg group">
                                Apply Now <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default OverseasEducation;

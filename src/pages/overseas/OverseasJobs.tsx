import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import bulkHiringImg from "@/assets/services/recruiter/bulk_hiring.png";
import executiveSearchImg from "@/assets/services/recruiter/executive_search.png";
import rpoServicesImg from "@/assets/services/recruiter/rpo_services.png";
import specializedRecruitmentImg from "@/assets/services/recruiter/specialized_recruitment.png";

const services = [
    {
        image: executiveSearchImg,
        title: "International Job Search",
        description: "Access to exclusive job openings in top international markets across various industries.",
    },
    {
        image: rpoServicesImg,
        title: "Work Visa Processing",
        description: "Expert assistance with work permit applications, employer sponsorship, and documentation.",
    },
    {
        image: specializedRecruitmentImg,
        title: "Relocation Support",
        description: "Pre-departure briefings, accommodation assistance, and settlement support in your new country.",
    },
    {
        image: bulkHiringImg,
        title: "Career Counseling",
        description: "Personalized career guidance to match your skills and experience with global opportunities.",
    },
];

const OverseasJobs = () => {
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
                            Overseas <span className="text-gradient-gold">Jobs</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Accelerate your career with international work opportunities. We connect you to the world.
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
                            Find Your Dream Job Abroad
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Submit your resume and let our experts find the perfect role for you.
                        </p>
                        <Link to="/contact-us">
                            <Button className="btn-gold rounded-full px-10 py-6 text-lg group">
                                Get Hired <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default OverseasJobs;

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";

// Job Data
const jobs = [
    {
        id: 1,
        title: "Truck Drivers",
        country: "Germany",
        countryCode: "de",
        industry: "Transport",
        type: "Full-time",
    },
    {
        id: 2,
        title: "ITI Electrician",
        country: "Germany",
        countryCode: "de",
        industry: "Electrical",
        type: "Technical",
    },
    {
        id: 3,
        title: "Diploma Electrician",
        country: "Germany",
        countryCode: "de",
        industry: "Electrical",
        type: "Technical",
    },
    {
        id: 4,
        title: "Nursing",
        country: "Germany",
        countryCode: "de",
        industry: "Healthcare",
        type: "Medical",
    },
    {
        id: 5,
        title: "Nursing",
        country: "Spain",
        countryCode: "es",
        industry: "Healthcare",
        type: "Medical",
    },
];

const countries = ["All", "Germany", "Spain"];

const TheionJobs = () => {
    const [selectedCountry, setSelectedCountry] = useState("All");

    const filteredJobs =
        selectedCountry === "All"
            ? jobs
            : jobs.filter((job) => job.country === selectedCountry);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial opacity-50" />
                <div className="container relative px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
                            Overseas Opportunities
                        </span>
                        <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mt-4 mb-6">
                            Theion <span className="text-gradient-gold">Jobs</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                            Explore tailored career opportunities in Germany and Spain. We connect skilled professionals with top international employers.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Jobs Section */}
            <section className="py-20 bg-background-secondary min-h-[600px]">
                <div className="container px-6">

                    {/* Country Filter */}
                    <div className="flex justify-center mb-12">
                        <div className="flex gap-4 p-1 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full">
                            {countries.map((country) => (
                                <button
                                    key={country}
                                    onClick={() => setSelectedCountry(country)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCountry === country
                                            ? "bg-primary text-primary-foreground shadow-lg"
                                            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                        }`}
                                >
                                    {country}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Job Grid */}
                    <motion.div
                        layout
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredJobs.map((job) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={job.id}
                                className="card-premium p-6 flex flex-col gap-6 group hover:shadow-primary/10 border border-primary/10 hover:border-primary/40 bg-card transition-all duration-300 rounded-xl"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {job.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                            <img
                                                src={`https://flagcdn.com/${job.countryCode}.svg`}
                                                alt={job.country}
                                                className="w-5 h-5 rounded-full object-cover"
                                            />
                                            <span>{job.country}</span>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
                                        {job.industry}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground/80">
                                        <Briefcase className="w-4 h-4 text-primary/70" />
                                        <span>{job.type}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground/80">
                                        <MapPin className="w-4 h-4 text-primary/70" />
                                        <span>Relocation Support Available</span>
                                    </div>
                                </div>

                                <div className="pt-4 mt-auto border-t border-border/30">
                                    <Link to="/contact-us">
                                        <Button className="w-full btn-outline-gold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                            Know More <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredJobs.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            No jobs found for the selected filter.
                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TheionJobs;

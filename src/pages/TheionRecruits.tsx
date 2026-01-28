import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  Clock,
  Filter,
  X,
  Search,
  ChevronRight,
} from "lucide-react";

import microsoftImg from "@/assets/Technologies/microsoft.png";
import awsImg from "@/assets/Technologies/aws.png";
import sapImg from "@/assets/Technologies/sap.png";
import oracleImg from "@/assets/Technologies/oracle.png";
import salesforceImg from "@/assets/Technologies/salesforce.png";
import adobeImg from "@/assets/Technologies/adobe.png";
import twoComsImg from "@/assets/clients/2coms.jpg";
import virginImg from "@/assets/clients/virgin-atlantic.jpg";

// --- Mock Data ---

interface Job {
  id: string;
  title: string;
  country: string;
  city?: string;
  type: string;
  experience: string;
  industry: string;
  role: string;
  description: string;
}

const JOBS_DATA: Job[] = [
  {
    id: "1",
    title: "Senior Electrical Engineer",
    country: "Germany",
    city: "Berlin",
    type: "Full-time",
    experience: "5+ years",
    industry: "Electrical",
    role: "Engineer",
    description: "Lead electrical system designs for large-scale industrial projects. Requires German language proficiency B1.",
  },
  {
    id: "2",
    title: "Heavy Truck Driver",
    country: "Canada",
    city: "Toronto",
    type: "Contract",
    experience: "3-5 years",
    industry: "Transport",
    role: "Driver",
    description: "Long-haul transport opportunities across provinces. Clean driving record and valid license required.",
  },
  {
    id: "3",
    title: "Registered Nurse",
    country: "UK",
    city: "London",
    type: "Full-time",
    experience: "3-5 years",
    industry: "Healthcare",
    role: "Healthcare", // Mapped to closest role or add Healthcare
    description: "Join top NHS trusts. NMC registration support provided. Competitive salary and relocation package.",
  },
  {
    id: "4",
    title: "IT Project Manager",
    country: "USA",
    city: "New York",
    type: "Full-time",
    experience: "5+ years",
    industry: "IT",
    role: "Manager",
    description: "Manage cross-functional teams to deliver enterprise software solutions. PMP certification preferred.",
  },
  {
    id: "5",
    title: "Industrial Electrician",
    country: "Australia",
    city: "Perth",
    type: "Full-time",
    experience: "3-5 years",
    industry: "Manufacturing",
    role: "Electrician",
    description: "Maintenance and installation of industrial machinery. Trade certificate mandatory.",
  },
  {
    id: "6",
    title: "Software Developer (Frontend)",
    country: "Germany",
    city: "Munich",
    type: "Full-time",
    experience: "0-2 years",
    industry: "IT",
    role: "Developer",
    description: "React/TypeScript developer needed for a growing fintech startup. English-speaking environment.",
  },
  {
    id: "7",
    title: "Site Technician",
    country: "UAE",
    city: "Dubai",
    type: "Contract",
    experience: "0-2 years",
    industry: "Construction",
    role: "Technician",
    description: "On-site support for construction machinery and equipment. Housing and transport provided.",
  },
];

// --- Filter Options ---

const COUNTRIES = ["Germany", "UK", "USA", "Canada", "Australia", "Japan", "New Zealand", "UAE"];
const JOB_TYPES = ["Full-time", "Contract", "Part-time", "Internship"];
const EXPERIENCE_LEVELS = ["0-2 years", "3-5 years", "5+ years"];
const JOB_ROLES = ["Engineer", "Developer", "Manager", "Electrician", "Technician", "Driver", "Healthcare"];
const INDUSTRIES = ["Electrical", "IT", "Construction", "Transport", "Manufacturing", "Healthcare"];

const TheionRecruits = () => {
  // --- State ---
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: "All",
    jobTypes: [] as string[],
    experience: "All",
    roles: [] as string[],
    industries: [] as string[],
  });

  // --- Handlers ---
  const handleCountryChange = (value: string) => {
    setFilters((prev) => ({ ...prev, country: value }));
  };

  const handleCheckboxChange = (category: "jobTypes" | "roles" | "industries", value: string) => {
    setFilters((prev) => {
      const list = prev[category];
      if (list.includes(value)) {
        return { ...prev, [category]: list.filter((item) => item !== value) };
      } else {
        return { ...prev, [category]: [...list, value] };
      }
    });
  };

  const handleExperienceChange = (value: string) => {
    setFilters((prev) => ({ ...prev, experience: value }));
  };

  const clearFilters = () => {
    setFilters({
      country: "All",
      jobTypes: [],
      experience: "All",
      roles: [],
      industries: [],
    });
  };

  // --- Filtering Logic ---
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      // Country
      if (filters.country !== "All" && job.country !== filters.country) return false;
      // Job Type
      if (filters.jobTypes.length > 0 && !filters.jobTypes.includes(job.type)) return false;
      // Experience
      if (filters.experience !== "All" && job.experience !== filters.experience) return false;
      // Role
      if (filters.roles.length > 0 && !filters.roles.includes(job.role)) return false;
      // Industry
      if (filters.industries.length > 0 && !filters.industries.includes(job.industry)) return false;

      return true;
    });
  }, [filters]);

  // --- UI Components ---

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">{title}</h3>
      {children}
    </div>
  );

  const FilterContent = () => (
    <div className="space-y-1">
      {/* Location Filter */}
      <FilterSection title="Location">
        <Select value={filters.country} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-full bg-background border-border/50">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Countries</SelectItem>
            {COUNTRIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      {/* Job Type Filter */}
      <FilterSection title="Job Type">
        <div className="space-y-3">
          {JOB_TYPES.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.jobTypes.includes(type)}
                onCheckedChange={() => handleCheckboxChange("jobTypes", type)}
              />
              <Label htmlFor={`type-${type}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Experience Level Filter */}
      <FilterSection title="Experience Level">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="exp-all"
              name="experience"
              value="All"
              checked={filters.experience === "All"}
              onChange={() => handleExperienceChange("All")}
              className="text-primary focus:ring-primary border-gray-300"
            />
            <Label htmlFor="exp-all" className="cursor-pointer">All Levels</Label>
          </div>
          {EXPERIENCE_LEVELS.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`exp-${level}`}
                name="experience"
                value={level}
                checked={filters.experience === level}
                onChange={() => handleExperienceChange(level)}
                className="text-primary focus:ring-primary border-gray-300"
              />
              <Label htmlFor={`exp-${level}`} className="text-sm font-medium leading-none cursor-pointer">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Job Role Filter */}
      <FilterSection title="Job Role">
        <div className="space-y-3">
          {JOB_ROLES.map((role) => (
            <div key={role} className="flex items-center space-x-2">
              <Checkbox
                id={`role-${role}`}
                checked={filters.roles.includes(role)}
                onCheckedChange={() => handleCheckboxChange("roles", role)}
              />
              <Label htmlFor={`role-${role}`} className="text-sm font-medium leading-none cursor-pointer">
                {role}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Industry Filter */}
      <FilterSection title="Industry">
        <div className="space-y-3">
          {INDUSTRIES.map((ind) => (
            <div key={ind} className="flex items-center space-x-2">
              <Checkbox
                id={`ind-${ind}`}
                checked={filters.industries.includes(ind)}
                onCheckedChange={() => handleCheckboxChange("industries", ind)}
              />
              <Label htmlFor={`ind-${ind}`} className="text-sm font-medium leading-none cursor-pointer">
                {ind}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Actions */}
      <div className="pt-4 space-y-3">
        <Button className="w-full btn-gold rounded-lg" onClick={() => setIsMobileFilterOpen(false)}>Apply Filters</Button>
        <Button variant="outline" className="w-full hover:bg-destructive/10 hover:text-destructive border-border/50" onClick={clearFilters}>Clear All</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />

      {/* Page Header */}
      <div className="pt-32 pb-8 bg-background-secondary border-b border-border/40">
        <div className="container px-6">
          <h1 className="font-display text-4xl font-semibold mb-2">Theion Recruits</h1>
          <p className="text-muted-foreground text-lg mb-6">Explore overseas and domestic job opportunities across multiple industries.</p>

          {/* Optional Tabs
          <div className="flex gap-1 p-1 bg-card border border-border/50 rounded-lg inline-flex">
            <button className="px-6 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md shadow-sm">Overseas Jobs</button>
            <button className="px-6 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Domestic Jobs</button>
          </div> */}
        </div>
      </div>

      <div className="container px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <Button onClick={() => setIsMobileFilterOpen(true)} className="w-full flex justify-between items-center btn-outline-gold">
              <span className="flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</span>
              <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">{filteredJobs.length} results</span>
            </Button>
          </div>

          {/* Left Sidebar (Desktop) */}
          <aside className="hidden lg:block w-[300px] shrink-0">
            <div className="sticky top-32 p-6 bg-card border border-border/40 rounded-xl shadow-sm h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
              <FilterContent />
            </div>
          </aside>

          {/* Mobile Sidebar (Drawer) */}
          <AnimatePresence>
            {isMobileFilterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                  onClick={() => setIsMobileFilterOpen(false)}
                />
                <motion.div
                  initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 right-0 w-[300px] bg-background border-l border-border z-50 shadow-2xl overflow-y-auto p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold font-display">Filters</h2>
                    <button onClick={() => setIsMobileFilterOpen(false)}><X className="w-6 h-6 text-muted-foreground" /></button>
                  </div>
                  <FilterContent />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Right Content - Job Listings */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{filteredJobs.length} Jobs Found</h2>
              {/* Optional Sort (Visual only) */}
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px] bg-card border-border/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="salary">Salary: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-5">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={job.id}
                    className="bg-card border border-border/40 hover:border-primary/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary/70" /> {job.city}, {job.country}</span>
                              <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-primary/70" /> {job.industry}</span>
                              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary/70" /> {job.type}</span>
                            </div>
                          </div>
                          {/* Country Flag (Visual enhancement) */}
                          <div className="hidden md:block">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                              {job.experience}
                            </span>
                          </div>
                        </div>

                        <p className="mt-4 text-muted-foreground/90 text-sm leading-relaxed max-w-2xl">
                          {job.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-md bg-secondary text-xs font-medium text-secondary-foreground">{job.role}</span>
                      </div>
                      <Link to="/contact-us" className="w-full sm:w-auto">
                        <Button className="w-full sm:w-auto btn-gold rounded-lg font-medium px-6">
                          Know More <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-card rounded-xl border border-border/40 border-dashed">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No jobs match your selected filters.</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search criteria or clear all filters.</p>
                  <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Partners Section */}
      <section className="py-20 bg-background-secondary border-t border-border/40">
        <div className="container px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-xs tracking-[0.3em] uppercase font-medium">Collaborations</span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mt-3">Our Partners</h2>
            <p className="text-muted-foreground mt-2 text-sm">Validating Excellence Through Strategic Alliances</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-8 gap-y-12 items-center justify-items-center">
            {[
              { name: "Microsoft", img: microsoftImg },
              { name: "AWS", img: awsImg },
              { name: "SAP", img: sapImg },
              { name: "Oracle", img: oracleImg },
              { name: "Salesforce", img: salesforceImg },
              { name: "Adobe", img: adobeImg },
              { name: "2COMS", img: twoComsImg },
              { name: "Virgin Atlantic", img: virginImg },
            ].map((partner) => (
              <div key={partner.name} className="flex flex-col items-center gap-3 group">
                <div className="w-16 h-16 rounded-full bg-white p-3 shadow-sm border border-border/50 group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-300 flex items-center justify-center">
                  <img
                    src={partner.img}
                    alt={partner.name}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors text-center">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TheionRecruits;
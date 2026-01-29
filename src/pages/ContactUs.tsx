import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Linkedin, Twitter, Send, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Kurnool, India",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+919912245345",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Info@theionconsulting.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "09:00 am – 05:00 pm",
  },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/theionconsulting/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/search/results/all/?keywords=theion%20consulting&origin=GLOBAL_SEARCH_HEADER&sid=NF", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/Theionconsultin", label: "Twitter" },
  { icon: Mail, href: "mailto:info@theionconsulting.com", label: "Email" },
];

import BookingModal from "@/components/BookingModal";
import { Video } from "lucide-react"; // Import Video icon

const ContactUs = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    countryCode: "+91",
    role: "student" as "student" | "professional" | "client",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryCodes = [
    { code: "+1", label: "US/CA" },
    { code: "+44", label: "UK" },
    { code: "+91", label: "IN" },
    { code: "+61", label: "AU" },
    { code: "+81", label: "JP" },
    { code: "+971", label: "UAE" },
    { code: "+33", label: "FR" },
    { code: "+49", label: "DE" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
      phone: `${formData.countryCode} ${formData.phone}`.trim(),
      message: formData.message.trim(),
      source: "contact_page"
    };

    console.log("CONTACT PAYLOAD:", payload);

    try {
      const response = await fetch(
        "https://theion.app.n8n.cloud/webhook-test/contact-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      let result: any = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (response.ok && result?.success) {
        toast.success(result.message);
        setFormData({
          name: "",
          email: "",
          message: "",
          phone: "",
          countryCode: "+91",
          role: "student"
        });
      } else {
        toast.error("Message submitted, but response unavailable.");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Unable to reach server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[120px]" />
        <div className="container relative px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              Contact Us
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground mt-4 mb-6">
              Connect with us <span className="text-gradient-gold">Now!</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-background-secondary relative">
        <div className="container px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
                Theion Consulting
              </h2>

              <div className="space-y-6 mb-10">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-card/60 border border-border/50 flex items-center justify-center flex-shrink-0 shadow-sm backdrop-blur-sm">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          {item.label}
                        </span>
                        <p className="text-foreground font-medium">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons: WhatsApp & Booking */}
              <div className="flex flex-col gap-4 mb-10">
                <a
                  href="https://wa.me/919912245345"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="w-full sm:w-auto btn-gold rounded-full px-6 py-5 group shadow-lg hover:shadow-primary/20 transition-all">
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Message us on WhatsApp
                  </Button>
                </a>

                <Button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full sm:w-auto bg-card hover:bg-card/80 border border-primary/20 text-foreground rounded-full px-6 py-5 group shadow-lg transition-all"
                >
                  <Video className="mr-2 w-5 h-5 text-primary" />
                  Book a Video Session
                </Button>
              </div>


            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotateY: -10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="perspective-[1000px]"
            >
              <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

                <h2 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Send us a Message
                </h2>

                {/* Social Icons */}
                <div className="flex justify-center gap-5 mb-8">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target={social.label === "Email" ? "_self" : "_blank"}
                        rel={social.label === "Email" ? "" : "noopener noreferrer"}
                        aria-label={social.label}
                        className="w-14 h-14 rounded-full bg-black/40 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.15)] backdrop-blur-md"
                        whileHover={{ y: -4, scale: 1.1 }}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    );
                  })}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-11 bg-black/20 border-white/10 text-foreground focus:border-primary/50 focus:ring-primary/20 backdrop-blur-md transition-all"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        I am a
                      </label>
                      <Select
                        value={formData.role}
                        onValueChange={(value: any) => setFormData({ ...formData, role: value })}
                      >
                        <SelectTrigger className="h-11 bg-black/20 border-white/10 text-foreground focus:ring-primary/20 backdrop-blur-md">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-white/10 text-foreground">
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="client">Client</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-11 bg-black/20 border-white/10 text-foreground focus:border-primary/50 focus:ring-primary/20 backdrop-blur-md"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  {/* Phone Input with Country Code */}
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <Select
                        value={formData.countryCode}
                        onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                      >
                        <SelectTrigger className="w-[100px] h-11 bg-black/20 border-white/10 text-foreground focus:ring-primary/20 backdrop-blur-md">
                          <SelectValue placeholder="+91" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-white/10 text-foreground h-[200px]">
                          {countryCodes.map((c) => (
                            <SelectItem key={c.code} value={c.code}>
                              <span className="flex items-center justify-between w-full min-w-[60px]">
                                <span>{c.code}</span>
                                <span className="text-muted-foreground text-xs ml-2">{c.label}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-11 bg-black/20 border-white/10 text-foreground focus:border-primary/50 focus:ring-primary/20 backdrop-blur-md flex-1"
                        placeholder="99999 99999"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[120px] bg-black/20 border-white/10 text-foreground focus:border-primary/50 focus:ring-primary/20 resize-none backdrop-blur-md"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <div className="flex gap-4 pt-2">
                    <Button
                      type="submit"
                      className="btn-gold flex-1 py-6 rounded-xl font-semibold shadow-lg shadow-primary/10 relative overflow-hidden"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-[10px] text-center text-white/30 pt-2">
                    Secure 128-bit SSL Encrypted Connection
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default ContactUs;
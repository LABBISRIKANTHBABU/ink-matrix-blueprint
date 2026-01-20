import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const durations = [
  {
    id: "30min",
    title: "30-Minute Call",
    description: "Quick consultation for focused discussions",
    calendlyUrl: "https://calendly.com/theionconsulting/30min", // Replace with actual Calendly link
    icon: Clock
  },
  {
    id: "1hour",
    title: "1-Hour Call",
    description: "In-depth session for comprehensive consultations",
    calendlyUrl: "https://calendly.com/theionconsulting/60min", // Replace with actual Calendly link
    icon: Video
  }
];

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  const handleBooking = () => {
    const selected = durations.find(d => d.id === selectedDuration);
    if (selected) {
      window.open(selected.calendlyUrl, "_blank");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-card border border-primary/20 rounded-2xl p-6 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-display font-bold mb-2">Book a Video Session</h2>
            <p className="text-muted-foreground text-sm mb-6">Select your preferred session duration</p>

            <div className="space-y-4 mb-6">
              {durations.map((duration) => {
                const Icon = duration.icon;
                return (
                  <button
                    key={duration.id}
                    onClick={() => setSelectedDuration(duration.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-4 ${
                      selectedDuration === duration.id
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedDuration === duration.id ? "bg-primary/20" : "bg-card"
                    }`}>
                      <Icon className={`w-5 h-5 ${selectedDuration === duration.id ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{duration.title}</h3>
                      <p className="text-sm text-muted-foreground">{duration.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <Button
              onClick={handleBooking}
              disabled={!selectedDuration}
              className="w-full btn-gold py-6 rounded-xl font-semibold"
            >
              Continue to Calendly
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;

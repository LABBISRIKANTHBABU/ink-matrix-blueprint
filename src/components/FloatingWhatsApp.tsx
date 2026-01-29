import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
    return (
        <motion.a
            href="https://wa.me/919912245345"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-background border border-primary/30 shadow-[0_0_20px_rgba(255,215,0,0.2)] text-primary hover:bg-primary hover:text-background transition-colors duration-300"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            aria-label="Message on WhatsApp"
        >
            <MessageCircle className="w-7 h-7" />
        </motion.a>
    );
};

export default FloatingWhatsApp;

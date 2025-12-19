import { Truck, Shield, Headphones, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const badges = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over ₹500',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: '100% protected transactions',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Expert B2B assistance',
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Premium products only',
  },
];

const TrustBadges = () => {
  return (
    <section className="py-8 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="p-3 bg-accent/10 rounded-lg">
                <badge.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">
                  {badge.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

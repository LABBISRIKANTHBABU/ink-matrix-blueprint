import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { businessNeeds } from '@/lib/data';
import { motion } from 'framer-motion';

const BusinessNeeds = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Business Needs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Curated solutions designed for your specific business requirements
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessNeeds.map((need, index) => (
            <motion.div
              key={need.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={`/solutions/${need.id}`}>
                <div className="group relative h-64 rounded-xl overflow-hidden">
                  <img
                    src={need.image}
                    alt={need.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-primary-foreground mb-1">
                      {need.title}
                    </h3>
                    <p className="text-primary-foreground/80 text-sm mb-3">
                      {need.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessNeeds;

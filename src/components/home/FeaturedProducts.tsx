import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/data';
import { motion } from 'framer-motion';

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  category?: string;
  badge?: 'bestseller' | 'new' | 'sale';
  limit?: number;
}

const FeaturedProducts = ({
  title,
  subtitle,
  category,
  badge,
  limit = 4,
}: FeaturedProductsProps) => {
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (badge) {
    filteredProducts = filteredProducts.filter((p) => p.badge === badge);
  }

  const displayProducts = filteredProducts.slice(0, limit);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <Link to={category ? `/category/${category}` : '/products'}>
            <Button variant="outline" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, categories } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to quote!`);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || categoryId;
  };

  const getBadgeLabel = (badge: string) => {
    switch (badge) {
      case 'bestseller':
        return 'Best Seller';
      case 'new':
        return 'New Arrival';
      case 'sale':
        return 'On Sale';
      default:
        return badge;
    }
  };

  const bulkDiscount = product.bulkPricing.length > 0
    ? Math.round(((product.price - product.bulkPricing[0].price) / product.price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="h-full"
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="group bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted rounded-md mb-4 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Badge */}
            {product.badge && (
              <span className="absolute top-2.5 left-2.5 bg-primary text-primary-foreground px-2 py-1 text-[10px] font-bold uppercase rounded tracking-wide">
                {getBadgeLabel(product.badge)}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1">
            {/* Category */}
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1.5">
              {getCategoryName(product.category)}
            </p>

            {/* Title */}
            <h3 className="font-bold text-foreground text-base leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < Math.floor(product.rating)
                        ? 'text-amber fill-amber'
                        : 'text-muted-foreground/30'
                      }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews} Reviews)
              </span>
            </div>

            {/* Price Section */}
            <div className="mt-auto">
              <div className="flex items-baseline gap-1 mb-1">
                {product.price > 0 ? (
                  <>
                    <span className="text-xl font-extrabold text-foreground">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">/ per unit</span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-primary">
                    Request Quote
                  </span>
                )}
              </div>

              {/* Bulk Info */}
              {product.bulkPricing.length > 0 && bulkDiscount > 0 && (
                <p className="text-xs text-success font-semibold mb-4">
                  Save {bulkDiscount}% on orders over {product.bulkPricing[0].minQty} units
                </p>
              )}

              {/* Add to Quote Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-amber hover:bg-amber-dark text-amber-foreground font-medium rounded-full border border-amber-dark/20"
              >
                Add to Quote
              </Button>

              {/* Customize Link */}
              {product.customizable && (
                <p className="text-center mt-2.5 text-xs text-info hover:text-primary hover:underline transition-colors cursor-pointer">
                  Customize with your Logo →
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

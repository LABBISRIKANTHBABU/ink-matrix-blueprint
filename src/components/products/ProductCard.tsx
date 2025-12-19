import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/data';
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
    toast.success(`${product.name} added to cart!`);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'bestseller':
        return 'default';
      case 'new':
        return 'secondary';
      case 'sale':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.badge && (
                <Badge variant={getBadgeVariant(product.badge)} className="uppercase text-xs font-semibold">
                  {product.badge}
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="destructive" className="text-xs font-semibold">
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Quick Add */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="icon"
                onClick={handleAddToCart}
                className="bg-accent hover:bg-amber-dark text-accent-foreground shadow-lg"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>

            {/* Customizable badge */}
            {product.customizable && (
              <div className="absolute bottom-3 left-3">
                <Badge variant="outline" className="bg-card/90 text-xs">
                  Customizable
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'text-amber fill-amber'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="mt-auto">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-foreground">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Bulk pricing hint */}
              {product.bulkPricing.length > 0 && (
                <p className="text-xs text-success mt-1">
                  Bulk: From ₹{product.bulkPricing[product.bulkPricing.length - 1].price}
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

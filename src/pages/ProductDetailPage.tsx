import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Upload } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products, categories } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import FeaturedProducts from '@/components/home/FeaturedProducts';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [customization, setCustomization] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find((p) => p.id === productId);
  const category = product ? categories.find((c) => c.id === product.category) : null;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate current price based on quantity
  const applicableBulkPrice = product.bulkPricing
    .filter((bp) => quantity >= bp.minQty)
    .sort((a, b) => b.minQty - a.minQty)[0];
  const currentPrice = applicableBulkPrice ? applicableBulkPrice.price : product.price;
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, customization);
    toast.success(`${product.name} added to cart!`, {
      description: `Quantity: ${quantity}${selectedColor ? `, Color: ${selectedColor}` : ''}`,
    });
  };

  const images = [product.image, product.image, product.image]; // Mock multiple images

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="bg-muted/50 border-b border-border py-3">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link to="/products" className="text-muted-foreground hover:text-foreground">
                Products
              </Link>
              {category && (
                <>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <Link
                    to={`/category/${category.id}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                </>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium truncate">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-muted border border-border">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <Badge
                      variant={product.badge === 'bestseller' ? 'default' : 'destructive'}
                      className="absolute top-4 left-4 uppercase"
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-primary'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-amber fill-amber'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {/* Price */}
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-foreground">
                    ₹{currentPrice.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {applicableBulkPrice && (
                    <Badge variant="secondary" className="text-success">
                      Bulk Price Applied
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Total: <span className="font-semibold text-foreground">₹{totalPrice.toLocaleString()}</span>
                </p>
              </div>

              {/* Bulk Pricing Table */}
              {product.bulkPricing.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Bulk Pricing</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-muted rounded-lg p-3 text-center border border-border">
                      <p className="text-xs text-muted-foreground">1+ units</p>
                      <p className="font-bold text-foreground">₹{product.price}</p>
                    </div>
                    {product.bulkPricing.map((tier) => (
                      <div
                        key={tier.minQty}
                        className={`rounded-lg p-3 text-center border transition-colors ${
                          quantity >= tier.minQty
                            ? 'bg-accent/10 border-accent'
                            : 'bg-muted border-border'
                        }`}
                      >
                        <p className="text-xs text-muted-foreground">{tier.minQty}+ units</p>
                        <p className="font-bold text-foreground">₹{tier.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Color</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'ring-2 ring-primary ring-offset-2'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select ${color}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-muted transition-colors"
                    >
                      -
                    </button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center border-0 focus-visible:ring-0"
                      min={1}
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Customization */}
              {product.customizable && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Customization</h3>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Add custom text, logo placement instructions, or special requests..."
                      value={customization}
                      onChange={(e) => setCustomization(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <Button variant="outline" size="sm" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Logo/Artwork
                    </Button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  size="lg"
                  className="flex-1 bg-accent hover:bg-amber-dark text-accent-foreground font-semibold"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RotateCcw className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">Easy Returns</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 gap-8">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3"
                >
                  Reviews ({product.reviews})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-6">
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>{product.description}</p>
                  <p className="mt-4">
                    Perfect for corporate gifting, employee appreciation, client presentations, 
                    and promotional events. Our premium products are designed to leave a lasting 
                    impression and reflect your brand's commitment to quality.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{category?.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Customizable</span>
                    <span className="font-medium">{product.customizable ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Available Colors</span>
                    <span className="font-medium">{product.colors?.length || 1}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Min. Bulk Order</span>
                    <span className="font-medium">{product.bulkPricing[0]?.minQty || 'N/A'} units</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <p className="text-muted-foreground">
                  Customer reviews coming soon. Be the first to review this product!
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        <FeaturedProducts
          title="You May Also Like"
          subtitle="Similar products you might be interested in"
          category={product.category}
          limit={4}
        />
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;

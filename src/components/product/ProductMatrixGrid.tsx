import { useState } from 'react';
import { Star, Upload, Play, Package, ShoppingCart, Plus, Check, Download, ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Product, Category, products } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface ProductMatrixGridProps {
  product: Product;
  category: Category | null;
}

const ProductMatrixGrid = ({ product, category }: ProductMatrixGridProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(50);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Product images - main + additional
  const images = [
    product.image,
    product.additionalImages?.[0] || product.image,
    product.additionalImages?.[1] || product.image,
    product.additionalImages?.[2] || product.image,
    product.additionalImages?.[3] || product.image,
  ];

  // Get recommended products (same category, excluding current)
  const recommendedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  // Calculate current price based on quantity
  const applicableBulkPrice = product.bulkPricing
    .filter((bp) => quantity >= bp.minQty)
    .sort((a, b) => b.minQty - a.minQty)[0];
  const currentPrice = applicableBulkPrice ? applicableBulkPrice.price : product.price;
  const totalPrice = currentPrice * quantity;
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleAddToQuote = () => {
    addToCart(product, quantity, selectedColor, uploadedFile ? `Custom Design: ${uploadedFile.name}` : '');
    toast.success('Added to Quote!', {
      description: `${quantity} × ${product.name} added to your quote request.`,
    });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    toast.success('Added to Cart!', {
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success('Design uploaded!', {
        description: `${file.name} has been attached to your order.`,
      });
      setUploadDialogOpen(false);
    }
  };

  // Sample reviews data
  const reviews = [
    { id: 1, user: 'Rajesh K.', rating: 5, date: '2 weeks ago', comment: 'Excellent quality! Perfect for our corporate event.', helpful: 24 },
    { id: 2, user: 'Priya S.', rating: 4, date: '1 month ago', comment: 'Good product, fast delivery. Logo printing was crisp.', helpful: 18 },
    { id: 3, user: 'Amit P.', rating: 5, date: '1 month ago', comment: 'Ordered 200 units for our startup. Great bulk pricing!', helpful: 31 },
  ];

  return (
    <div className="w-full">
      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid grid-cols-9 gap-2 auto-rows-fr" style={{ gridTemplateRows: 'repeat(13, minmax(50px, 1fr))' }}>
        
        {/* div6 - Main Product Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 row-span-5 col-start-1 row-start-1 bg-card rounded-xl border border-border overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-transparent" />
          {product.badge && (
            <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground uppercase text-xs font-bold">
              {product.badge}
            </Badge>
          )}
          <Badge variant="outline" className="absolute bottom-4 right-4 z-10 bg-background/80 backdrop-blur-sm">
            360° VIEW
          </Badge>
          <img 
            src={images[selectedImage]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* div33 - Product Image Thumbnail 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => setSelectedImage(0)}
          className={`col-start-5 row-start-1 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
            selectedImage === 0 ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-muted-foreground'
          }`}
        >
          <img src={images[0]} alt="View 1" className="w-full h-full object-cover" />
        </motion.div>

        {/* div19 - Product Image Thumbnail 2 */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => setSelectedImage(1)}
          className={`col-start-5 row-start-2 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
            selectedImage === 1 ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-muted-foreground'
          }`}
        >
          <img src={images[1]} alt="View 2" className="w-full h-full object-cover" />
        </motion.div>

        {/* div18 - Product Image Thumbnail 3 */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => setSelectedImage(2)}
          className={`col-start-5 row-start-3 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
            selectedImage === 2 ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-muted-foreground'
          }`}
        >
          <img src={images[2]} alt="View 3" className="w-full h-full object-cover" />
        </motion.div>

        {/* div34 - Product Image Thumbnail 4 */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          onClick={() => setSelectedImage(3)}
          className={`col-start-5 row-start-4 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
            selectedImage === 3 ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-muted-foreground'
          }`}
        >
          <img src={images[3]} alt="View 4" className="w-full h-full object-cover" />
        </motion.div>

        {/* div35 - Product Image Thumbnail 5 (Video) */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => setSelectedImage(4)}
          className={`col-start-5 row-start-5 rounded-lg overflow-hidden cursor-pointer border-2 transition-all relative ${
            selectedImage === 4 ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-muted-foreground'
          }`}
        >
          <img src={images[4]} alt="Video" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Play className="h-6 w-6 text-white fill-white" />
          </div>
        </motion.div>

        {/* div7 - Header Block (Title, ID, Reviews) */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-4 row-span-2 col-start-6 row-start-1 bg-card rounded-xl p-4 border border-border flex flex-col justify-center"
        >
          <p className="text-xs text-muted-foreground mb-1">SKU: {product.sku || `IM-${product.id.toUpperCase()}`}</p>
          <h1 className="text-lg font-bold text-foreground leading-tight mb-2">{product.name}</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-amber fill-amber' : 'text-muted-foreground/30'}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.rating})</span>
            <span className="text-xs text-info hover:underline cursor-pointer">{product.reviews} Reviews</span>
          </div>
        </motion.div>

        {/* div11 - Pricing & Discount */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-4 col-start-6 row-start-3 bg-card rounded-xl p-4 border border-border"
        >
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">₹{currentPrice.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                <Badge className="bg-green-600 text-white text-xs">{discount}% OFF</Badge>
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">/ per unit (Inclusive of GST)</p>
          <p className="text-xs text-green-600 font-medium mt-1">Save more with bulk orders!</p>
        </motion.div>

        {/* div12 - Colors, Quantity, Buy/Cart */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-4 row-span-2 col-start-6 row-start-4 bg-card rounded-xl p-4 border border-border flex flex-col justify-between"
        >
          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-2">Select Color:</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
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
          <div className="flex items-center gap-3 mb-3">
            <p className="text-xs text-muted-foreground">Qty:</p>
            <div className="flex items-center border border-border rounded-full bg-muted">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 10))}
                className="px-3 py-1 text-foreground hover:bg-background rounded-l-full transition-colors"
              >
                −
              </button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-0 bg-transparent focus-visible:ring-0"
                min={1}
              />
              <button
                onClick={() => setQuantity(quantity + 10)}
                className="px-3 py-1 text-foreground hover:bg-background rounded-r-full transition-colors"
              >
                +
              </button>
            </div>
            <span className="text-sm font-semibold text-foreground">
              Total: ₹{totalPrice.toLocaleString()}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={handleAddToQuote}
              className="flex-1 bg-amber hover:bg-amber-dark text-foreground font-bold rounded-full text-sm"
            >
              ADD TO QUOTE
            </Button>
            <Button 
              onClick={handleAddToCart}
              variant="outline"
              className="flex-1 rounded-full text-sm gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </motion.div>

        {/* div24 - Product Description with Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-9 row-span-3 col-start-1 row-start-6 bg-card rounded-xl border border-border overflow-hidden"
        >
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <TabsList className="w-full justify-start rounded-none bg-muted/50 border-b border-border p-0 h-auto">
              <TabsTrigger value="overview" className="rounded-none data-[state=active]:bg-card data-[state=active]:border-b-2 data-[state=active]:border-primary px-6 py-3 text-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="specs" className="rounded-none data-[state=active]:bg-card data-[state=active]:border-b-2 data-[state=active]:border-primary px-6 py-3 text-sm">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="templates" className="rounded-none data-[state=active]:bg-card data-[state=active]:border-b-2 data-[state=active]:border-primary px-6 py-3 text-sm">
                Templates
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="flex-1 p-6 text-sm text-muted-foreground overflow-auto m-0">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Product Description</h3>
                  <p className="leading-relaxed">{product.description}</p>
                  {product.keyComponents && (
                    <div className="mt-4">
                      <h4 className="font-medium text-foreground mb-1">Key Components</h4>
                      <p className="text-sm">{product.keyComponents}</p>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Design Features</h3>
                  <p className="leading-relaxed">{product.designFeatures || 'Premium quality with custom branding options. Perfect for corporate gifting and promotional events.'}</p>
                  <div className="mt-4">
                    <h4 className="font-medium text-foreground mb-1">Bulk Pricing</h4>
                    <div className="space-y-1">
                      {product.bulkPricing.map((bp, i) => (
                        <p key={i} className="text-sm">
                          {bp.minQty}+ units: <span className="text-primary font-medium">₹{bp.price}/unit</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="specs" className="flex-1 p-6 overflow-auto m-0">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground text-sm">SKU</span>
                    <span className="font-medium text-foreground text-sm">{product.sku || `IM-${product.id.toUpperCase()}`}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground text-sm">Category</span>
                    <span className="font-medium text-foreground text-sm">{category?.name || product.category}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground text-sm">Dimensions</span>
                    <span className="font-medium text-foreground text-sm">{product.specifications || '25cm × 20cm'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground text-sm">Material</span>
                    <span className="font-medium text-foreground text-sm">{product.materials || 'Premium Quality'}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground text-sm">Customizable</span>
                    <span className="font-medium text-foreground text-sm">{product.customizable ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground text-sm">Stock</span>
                    <span className="font-medium text-green-600 text-sm">{product.stock || 500}+ Available</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="templates" className="flex-1 p-6 overflow-auto m-0">
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <Package className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground text-center max-w-md">
                  Download our design templates for accurate logo placement and sizing guidelines.
                </p>
                <Button variant="outline" size="lg" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Logo Template (PDF)
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* div36 - Reviews Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="col-span-4 row-span-5 col-start-1 row-start-9 bg-card rounded-xl border border-border overflow-hidden flex flex-col"
        >
          <div className="p-4 border-b border-border bg-muted/30">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Customer Reviews ({product.reviews})
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-amber fill-amber' : 'text-muted-foreground/30'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating} out of 5</span>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {review.user.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{review.user}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < review.rating ? 'text-amber fill-amber' : 'text-muted-foreground/30'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-2">
                  <ThumbsUp className="h-3 w-3" />
                  Helpful ({review.helpful})
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <Button variant="outline" size="sm" className="w-full">
              View All Reviews
            </Button>
          </div>
        </motion.div>

        {/* div39 - Upload Your Design */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="col-span-5 col-start-5 row-start-9 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl flex items-center justify-center px-4 border border-primary/20 cursor-pointer hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Upload className="h-5 w-5 text-primary" />
                <div>
                  <span className="text-sm font-bold text-primary">Upload Your Design</span>
                  {uploadedFile && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" /> {uploadedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Your Custom Design</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Upload your logo, artwork, or design file. We accept PNG, JPG, PDF, AI, and EPS formats.
              </p>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <label className="cursor-pointer">
                  <span className="text-primary font-medium hover:underline">Click to upload</span>
                  <span className="text-muted-foreground"> or drag and drop</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".png,.jpg,.jpeg,.pdf,.ai,.eps"
                    onChange={handleFileUpload}
                  />
                </label>
                <p className="text-xs text-muted-foreground mt-2">Max file size: 10MB</p>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download Design Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Placeholders for div40 & div41 - Additional options or info can go here */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="col-span-3 col-start-5 row-start-10 bg-card rounded-xl p-3 border border-border flex items-center justify-center"
        >
          <div className="text-center">
            <p className="text-xs font-medium text-foreground">Free Shipping</p>
            <p className="text-[10px] text-muted-foreground">On orders above ₹5,000</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="col-span-2 col-start-8 row-start-10 bg-card rounded-xl p-3 border border-border flex items-center justify-center"
        >
          <div className="text-center">
            <p className="text-xs font-medium text-foreground">Bulk Discounts</p>
            <p className="text-[10px] text-muted-foreground">Up to 25% off</p>
          </div>
        </motion.div>

        {/* div29-32, div37 - Recommended Products */}
        {recommendedProducts.slice(0, 5).map((recProduct, index) => (
          <motion.div 
            key={recProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.05 }}
            className="row-span-3 row-start-11 bg-card rounded-xl border border-border overflow-hidden cursor-pointer transition-all hover:border-primary hover:shadow-md group"
            style={{ gridColumnStart: 5 + index }}
          >
            <div className="relative w-full h-2/3 overflow-hidden">
              <img 
                src={recProduct.image} 
                alt={recProduct.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {recProduct.badge && (
                <Badge className="absolute top-1 left-1 text-[8px] px-1 py-0">{recProduct.badge}</Badge>
              )}
            </div>
            <div className="p-2">
              <p className="text-[10px] font-medium text-foreground truncate">{recProduct.name}</p>
              <p className="text-xs font-bold text-primary">₹{recProduct.price}</p>
              <Button size="sm" variant="ghost" className="h-5 text-[10px] w-full mt-1 gap-1">
                <Plus className="h-3 w-3" /> Add
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden space-y-4">
        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative aspect-square rounded-xl overflow-hidden bg-card border border-border"
        >
          {product.badge && (
            <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground uppercase text-xs font-bold">
              {product.badge}
            </Badge>
          )}
          <img 
            src={images[selectedImage]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Thumbnail Gallery */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all relative ${
                selectedImage === index ? 'border-primary' : 'border-border'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
              {index === 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white fill-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Title & Info */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-xs text-muted-foreground mb-1">SKU: {product.sku || `IM-${product.id.toUpperCase()}`}</p>
          <h1 className="text-xl font-bold text-foreground mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-amber fill-amber' : 'text-muted-foreground/30'}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold text-primary">₹{currentPrice.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                <Badge className="bg-green-600 text-white text-xs">{discount}% OFF</Badge>
              </>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Select Color:</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                        : 'border-border'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center border border-border rounded-full bg-muted">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 10))}
                className="px-4 py-2 text-foreground"
              >
                −
              </button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-0 bg-transparent focus-visible:ring-0"
              />
              <button
                onClick={() => setQuantity(quantity + 10)}
                className="px-4 py-2 text-foreground"
              >
                +
              </button>
            </div>
            <span className="text-sm font-semibold">Total: ₹{totalPrice.toLocaleString()}</span>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleAddToQuote}
              className="flex-1 bg-amber hover:bg-amber-dark text-foreground font-bold rounded-full"
            >
              ADD TO QUOTE
            </Button>
            <Button 
              onClick={handleAddToCart}
              variant="outline"
              className="flex-1 rounded-full gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Cart
            </Button>
          </div>
        </div>

        {/* Upload Design Button (Mobile) */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full gap-2 border-dashed border-2 border-primary/50 hover:border-primary py-6"
            >
              <Upload className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Upload Your Design</span>
              {uploadedFile && (
                <Badge variant="secondary" className="ml-2 gap-1">
                  <Check className="h-3 w-3" /> Uploaded
                </Badge>
              )}
            </Button>
          </DialogTrigger>
        </Dialog>

        {/* Description Tabs */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Tabs defaultValue="overview">
            <TabsList className="w-full justify-start rounded-none bg-muted/50 border-b border-border p-0 h-auto">
              <TabsTrigger value="overview" className="rounded-none data-[state=active]:bg-card px-4 py-3 text-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="specs" className="rounded-none data-[state=active]:bg-card px-4 py-3 text-sm">
                Specs
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4 text-sm text-muted-foreground m-0">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="specs" className="p-4 m-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Material</span>
                  <span className="font-medium text-foreground">{product.materials || 'Premium Quality'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Customizable</span>
                  <span className="font-medium text-foreground">{product.customizable ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Reviews Section (Mobile) */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold text-foreground">Reviews ({product.reviews})</h3>
          </div>
          <div className="p-4 space-y-4">
            {reviews.slice(0, 2).map((review) => (
              <div key={review.id} className="border-b border-border pb-4 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < review.rating ? 'text-amber fill-amber' : 'text-muted-foreground/30'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.user}</span>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Products (Mobile) */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold text-foreground">Recommended Products</h3>
          </div>
          <div className="flex gap-3 p-4 overflow-x-auto">
            {recommendedProducts.map((recProduct) => (
              <div key={recProduct.id} className="w-32 flex-shrink-0">
                <div className="aspect-square rounded-lg overflow-hidden mb-2">
                  <img src={recProduct.image} alt={recProduct.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-medium truncate">{recProduct.name}</p>
                <p className="text-sm font-bold text-primary">₹{recProduct.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMatrixGrid;

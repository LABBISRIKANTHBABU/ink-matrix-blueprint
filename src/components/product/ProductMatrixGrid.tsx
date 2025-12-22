import { useState } from 'react';
import { Star, Upload, Play, Package, Palette, Leaf, Zap, Diamond, Plus, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Product, Category } from '@/lib/data';
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

  // Mock additional images
  const images = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  // Calculate current price based on quantity
  const applicableBulkPrice = product.bulkPricing
    .filter((bp) => quantity >= bp.minQty)
    .sort((a, b) => b.minQty - a.minQty)[0];
  const currentPrice = applicableBulkPrice ? applicableBulkPrice.price : product.price;
  const totalPrice = currentPrice * quantity;

  const handleAddToQuote = () => {
    addToCart(product, quantity, selectedColor, uploadedFile ? `Custom Design: ${uploadedFile.name}` : '');
    toast.success('Added to Quote!', {
      description: `${quantity} × ${product.name} added to your quote request.`,
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

  const getMaterialIcon = () => {
    if (product.category === 'drinkware') return <Diamond className="h-4 w-4" />;
    if (product.category === 'tech-gadgets') return <Zap className="h-4 w-4" />;
    return <Package className="h-4 w-4" />;
  };

  const getMaterialText = () => {
    if (product.materials) return product.materials;
    if (product.category === 'drinkware') return 'SS 304';
    if (product.category === 'tech-gadgets') return '10k mAh';
    if (product.category === 'office-essentials') return 'PU Leather';
    return 'Premium';
  };

  const getEcoText = () => {
    if (product.category === 'tech-gadgets') return 'Fast Charge';
    return 'Eco-Friendly';
  };

  return (
    <div className="w-full">
      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid grid-cols-9 gap-2 auto-rows-fr" style={{ gridTemplateRows: 'repeat(13, minmax(40px, 1fr))' }}>
        {/* div6 - Main Product Hero */}
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

        {/* div33 - Brand Logo (Matrix Spine Row 1) */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="col-start-5 row-start-1 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20"
        >
          <span className="text-primary font-bold text-xs">[ink]</span>
        </motion.div>

        {/* div19 - Material (Matrix Spine Row 2) */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="col-start-5 row-start-2 bg-muted rounded-lg flex flex-col items-center justify-center p-1 border border-border"
        >
          {getMaterialIcon()}
          <span className="text-[10px] text-muted-foreground mt-0.5 text-center leading-tight">{getMaterialText()}</span>
        </motion.div>

        {/* div18 - Eco/Tech (Matrix Spine Row 3) */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-start-5 row-start-3 bg-green-50 dark:bg-green-950/30 rounded-lg flex flex-col items-center justify-center p-1 border border-green-200 dark:border-green-800"
        >
          <Leaf className="h-4 w-4 text-green-600" />
          <span className="text-[10px] text-green-700 dark:text-green-400 mt-0.5 text-center leading-tight">{getEcoText()}</span>
        </motion.div>

        {/* div34 - Customization (Matrix Spine Row 4) */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="col-start-5 row-start-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg flex flex-col items-center justify-center p-1 border border-purple-200 dark:border-purple-800"
        >
          <Palette className="h-4 w-4 text-purple-600" />
          <span className="text-[10px] text-purple-700 dark:text-purple-400 mt-0.5 text-center leading-tight">UV Print</span>
        </motion.div>

        {/* div35 - Stock (Matrix Spine Row 5) */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="col-start-5 row-start-5 bg-blue-50 dark:bg-blue-950/30 rounded-lg flex flex-col items-center justify-center p-1 border border-blue-200 dark:border-blue-800"
        >
          <Package className="h-4 w-4 text-blue-600" />
          <span className="text-[10px] text-blue-700 dark:text-blue-400 mt-0.5 text-center leading-tight">{product.stock || 500}+</span>
        </motion.div>

        {/* div7 - Header Block (Title & Reviews) */}
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
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
            <span className="text-xs text-info hover:underline cursor-pointer">Read Reviews</span>
          </div>
        </motion.div>

        {/* div11 - Pricing & Color Swatches */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-4 col-start-6 row-start-3 bg-card rounded-xl p-4 border border-border"
        >
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-primary">₹{currentPrice.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
            <span className="text-xs text-muted-foreground">/ per unit</span>
          </div>
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedColor === color
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color}`}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* div12 - The Buy Box */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-4 row-span-2 col-start-6 row-start-4 bg-card rounded-xl p-4 border border-border flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-3">
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
          <Button 
            onClick={handleAddToQuote}
            className="w-full bg-accent hover:bg-amber-dark text-accent-foreground font-bold rounded-full text-sm"
          >
            ADD TO QUOTE
          </Button>
          <button className="text-xs text-info hover:underline mt-2 text-center">
            Request Sample Piece
          </button>
        </motion.div>

        {/* div24 - Promo Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-9 row-span-3 col-start-1 row-start-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl flex items-center justify-center px-6 border border-slate-700 overflow-hidden relative"
        >
          <div className="absolute left-6 text-4xl">🚀</div>
          <div className="text-center">
            <p className="text-white font-bold text-sm md:text-base">
              STARTUP SPECIAL: FLAT 15% OFF ON ORDERS ABOVE 100 UNITS
            </p>
            <p className="text-amber text-xs mt-1">USE CODE: MATRIX15</p>
          </div>
          <div className="absolute right-6 text-4xl animate-pulse">💰</div>
        </motion.div>

        {/* div36 - Description Panel with Tabs */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="col-span-4 row-span-5 col-start-1 row-start-9 bg-card rounded-xl border border-border overflow-hidden"
        >
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <TabsList className="w-full justify-start rounded-none bg-muted/50 border-b border-border p-0 h-auto">
              <TabsTrigger value="overview" className="rounded-none data-[state=active]:bg-card px-4 py-2 text-xs">
                Overview
              </TabsTrigger>
              <TabsTrigger value="specs" className="rounded-none data-[state=active]:bg-card px-4 py-2 text-xs">
                Specs
              </TabsTrigger>
              <TabsTrigger value="templates" className="rounded-none data-[state=active]:bg-card px-4 py-2 text-xs">
                Templates
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="flex-1 p-4 text-sm text-muted-foreground overflow-auto m-0">
              <p className="leading-relaxed">{product.description}</p>
              <p className="mt-3 leading-relaxed">
                Elevate your employee onboarding with this premium product. Perfect for corporate gifting, 
                client presentations, and promotional events.
              </p>
            </TabsContent>
            <TabsContent value="specs" className="flex-1 p-4 overflow-auto m-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-muted-foreground">Dimension</span>
                  <span className="font-medium text-foreground">{product.specifications || '25cm × 20cm'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium text-foreground">450g</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-muted-foreground">Material</span>
                  <span className="font-medium text-foreground">{getMaterialText()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-muted-foreground">Warranty</span>
                  <span className="font-medium text-foreground">1 Year</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="templates" className="flex-1 p-4 overflow-auto m-0">
              <Button variant="outline" size="sm" className="gap-2 w-full">
                <Download className="h-4 w-4" />
                Download Logo Template (PDF)
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Use our template for accurate logo placement and sizing.
              </p>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* div39 - Cross-sell Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="col-span-5 col-start-5 row-start-9 bg-muted rounded-xl flex items-center px-4 border border-border"
        >
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Frequently Bought Together</span>
        </motion.div>

        {/* div40 - Upsell Item 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="col-span-3 col-start-5 row-start-10 bg-card rounded-xl p-3 border border-border flex items-center gap-3"
        >
          <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=100&q=80" alt="Pen" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">Parker Vector Pen</p>
            <Button size="sm" variant="outline" className="h-6 text-xs mt-1 gap-1">
              <Plus className="h-3 w-3" /> Add ₹150
            </Button>
          </div>
        </motion.div>

        {/* div41 - Upsell Item 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="col-span-2 col-start-8 row-start-10 bg-card rounded-xl p-3 border border-border flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&q=80" alt="Bag" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-medium text-foreground truncate">Gift Bag</p>
            <Button size="sm" variant="outline" className="h-5 text-[10px] mt-0.5 px-2">
              +₹50
            </Button>
          </div>
        </motion.div>

        {/* Gallery Thumbnails - div29 to div32 & div37 */}
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.05 }}
            className={`row-span-3 row-start-11 bg-card rounded-xl border overflow-hidden cursor-pointer transition-all hover:border-primary ${
              selectedImage === index ? 'border-primary ring-2 ring-primary/20' : 'border-border'
            }`}
            style={{ gridColumnStart: 5 + index }}
            onClick={() => setSelectedImage(index)}
          >
            <div className="relative w-full h-full">
              <img 
                src={images[index]} 
                alt={`View ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Play className="h-6 w-6 text-white" />
                </div>
              )}
              {selectedImage === index && (
                <div className="absolute top-1 right-1 bg-primary rounded-full p-0.5">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
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
              className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index ? 'border-primary' : 'border-border'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
              {index === 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Matrix Spine - Horizontal on Mobile */}
        <div className="grid grid-cols-5 gap-2">
          <div className="bg-primary/10 rounded-lg p-2 flex flex-col items-center justify-center border border-primary/20">
            <span className="text-primary font-bold text-xs">[ink]</span>
          </div>
          <div className="bg-muted rounded-lg p-2 flex flex-col items-center justify-center border border-border">
            {getMaterialIcon()}
            <span className="text-[9px] text-muted-foreground mt-0.5">{getMaterialText()}</span>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-2 flex flex-col items-center justify-center border border-green-200 dark:border-green-800">
            <Leaf className="h-4 w-4 text-green-600" />
            <span className="text-[9px] text-green-700 dark:text-green-400 mt-0.5">Eco</span>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-2 flex flex-col items-center justify-center border border-purple-200 dark:border-purple-800">
            <Palette className="h-4 w-4 text-purple-600" />
            <span className="text-[9px] text-purple-700 dark:text-purple-400 mt-0.5">Custom</span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-2 flex flex-col items-center justify-center border border-blue-200 dark:border-blue-800">
            <Package className="h-4 w-4 text-blue-600" />
            <span className="text-[9px] text-blue-700 dark:text-blue-400 mt-0.5">{product.stock || 500}+</span>
          </div>
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
              <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
            <span className="text-xs text-muted-foreground">/ unit</span>
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-2 mb-4">
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

          <Button 
            onClick={handleAddToQuote}
            className="w-full bg-accent hover:bg-amber-dark text-accent-foreground font-bold rounded-full"
          >
            ADD TO QUOTE
          </Button>
        </div>

        {/* Promo Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl p-4 text-center">
          <p className="text-white font-bold text-sm">
            🚀 FLAT 15% OFF ON 100+ UNITS
          </p>
          <p className="text-amber text-xs mt-1">CODE: MATRIX15</p>
        </div>

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
                  <span className="font-medium text-foreground">{getMaterialText()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Customizable</span>
                  <span className="font-medium text-foreground">{product.customizable ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Upload Design Dialog - Works for both layouts */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogTrigger asChild>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6"
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full gap-3 border-dashed border-2 border-primary/50 hover:border-primary hover:bg-primary/5 rounded-xl py-6"
            >
              <Upload className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Upload Your Design</span>
              {uploadedFile && (
                <Badge variant="secondary" className="ml-2 gap-1">
                  <Check className="h-3 w-3" /> {uploadedFile.name}
                </Badge>
              )}
            </Button>
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
    </div>
  );
};

export default ProductMatrixGrid;

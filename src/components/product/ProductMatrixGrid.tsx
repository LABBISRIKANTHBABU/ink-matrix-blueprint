import { useState } from 'react';
import { Star, ShoppingCart, Check, Upload, Download, Package, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product, Category, products } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import './ProductPage.css'; // Import Vanilla CSS

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

  // Use product images or fallback
  const images = [
    product.image,
    ...(product.additionalImages || [])
  ].slice(0, 5); // Limit to 5 for layout consistency

  // Fill remaining slots with main image if fewer than 5 (optional, but keeps layout stable)
  while (images.length < 5) images.push(product.image);

  // Recommended products logic
  const recommendedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  // Pricing Logic
  const applicableBulkPrice = product.bulkPricing
    .filter((bp) => quantity >= bp.minQty)
    .sort((a, b) => b.minQty - a.minQty)[0];
  const currentPrice = applicableBulkPrice ? applicableBulkPrice.price : product.price;
  const totalPrice = currentPrice * quantity;
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleAddToQuote = () => {
    addToCart(product, quantity, selectedColor, uploadedFile ? `Custom Design: ${uploadedFile.name}` : '');
    toast.success('Added to Quote!', { description: `${quantity} × ${product.name} added.` });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    toast.success('Added to Cart!', { description: `${quantity} × ${product.name} added.` });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success('Design uploaded!', { description: `${file.name} attached.` });
      setUploadDialogOpen(false);
    }
  };

  return (
    <div className="product-container">
      {/* LEFT COLUMN: IMAGE GALLERY */}
      <div className="product-gallery">
        {/* Thumbnails */}
        <div className="gallery-thumbnails">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`thumbnail-btn ${selectedImage === idx ? 'active' : ''}`}
              onMouseEnter={() => setSelectedImage(idx)}
              onClick={() => setSelectedImage(idx)}
            >
              <img src={img} alt={`View ${idx + 1}`} />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="gallery-main relative group">
          <img src={images[selectedImage]} alt={product.name} className="transition-transform duration-500 group-hover:scale-110" />
          {/* Optional: Add zoom functionality or badges here */}
          {product.badge && (
            <Badge className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground uppercase text-xs font-bold">
              {product.badge}
            </Badge>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: PRODUCT INFO */}
      <div className="product-info">
        {/* Header */}
        <div className="product-header">
          {/* Breadcrumb could go here if moved from page level */}
          <div className="product-sku">SKU: {product.sku || `IM-${product.id.toUpperCase()}`}</div>
          <h1 className="product-title">{product.name}</h1>

          <div className="product-rating">
            <span className="rating-badge">
              {product.rating} <Star className="h-3 w-3 fill-white" />
            </span>
            <span className="text-muted-foreground">{product.reviews} Ratings & Reviews</span>
          </div>
        </div>

        {/* Price */}
        <div className="product-price">
          <span className="current-price">₹{currentPrice.toLocaleString()}</span>
          {product.originalPrice && (
            <>
              <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
              <span className="discount-badge">{discount}% off</span>
            </>
          )}
        </div>

        {/* Bulk Pricing Grid (Mini) */}
        {product.bulkPricing.length > 0 && (
          <div className="bg-muted/30 p-2 rounded text-sm text-foreground mb-2">
            <strong>Bulk Savings: </strong>
            {product.bulkPricing.map(bp => `${bp.minQty}+ @ ₹${bp.price}`).join(', ')}
          </div>
        )}


        {/* Variants */}
        <div className="product-variants">
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="variant-group">
              <span className="variant-label">Color</span>
              <div className="color-options">
                {product.colors.map(color => (
                  <div
                    key={color}
                    className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="variant-group">
            <span className="variant-label">Quantity & Design</span>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="quantity-control">
                <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 10))}>-</button>
                <Input
                  className="qty-input"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <button className="qty-btn" onClick={() => setQuantity(quantity + 10)}>+</button>
              </div>

              {/* Upload Design Button */}
              <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    {uploadedFile ? 'Change Design' : 'Upload Design'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Upload Custom Design</DialogTitle>
                  </DialogHeader>
                  <div className="grid place-items-center gap-4 py-4">
                    <Upload className="h-12 w-12 text-muted-foreground" />
                    <p className="text-sm text-center text-muted-foreground">Upload your logo or artwork (PNG, PDF, AI)</p>
                    <Input type="file" onChange={handleFileUpload} />
                  </div>
                </DialogContent>
              </Dialog>
              {uploadedFile && <div className="text-sm text-green-600 flex items-center gap-1"><Check className="h-3 w-3" /> {uploadedFile.name} attached</div>}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="product-actions">
          <button className="btn-secondary" onClick={handleAddToCart}>
            <ShoppingCart className="inline-block mr-2 h-5 w-5" />
            Add to Cart
          </button>
          <button className="btn-primary" onClick={handleAddToQuote}>
            Request Quote
          </button>
        </div>

        {/* Description / Tabs */}
        <div className="details-section">
          <Tabs defaultValue="desc">
            <TabsList className="w-full justify-start border-b rounded-none p-0 bg-transparent h-auto">
              <TabsTrigger value="desc" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-6 py-3">Description</TabsTrigger>
              <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-6 py-3">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="desc" className="p-6">
              <div className="description-text">
                <p className="mb-4">{product.description}</p>
                {product.keyComponents && (
                  <div className="mb-4">
                    <strong>Key Features:</strong>
                    <p className="text-muted-foreground">{product.keyComponents}</p>
                  </div>
                )}
                {product.designFeatures && (
                  <div>
                    <strong>Design Notes:</strong>
                    <p className="text-muted-foreground">{product.designFeatures}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="specs" className="p-0">
              <table className="details-table">
                <tbody>
                  <tr>
                    <td className="details-label">Model Name</td>
                    <td className="details-value">{product.name}</td>
                  </tr>
                  <tr>
                    <td className="details-label">Material</td>
                    <td className="details-value">{product.materials || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="details-label">Dimensions</td>
                    <td className="details-value">{product.specifications || 'Standard'}</td>
                  </tr>
                  <tr>
                    <td className="details-label">Customizable</td>
                    <td className="details-value">{product.customizable ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <td className="details-label">Inventory Status</td>
                    <td className="details-value text-green-600 font-medium">{product.inStock ? 'In Stock' : 'Out of Stock'}</td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </div>
  );
};

export default ProductMatrixGrid;

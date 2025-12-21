import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/lib/data';
import { categories } from '@/lib/data';
import { useAdminProducts } from '../hooks/useAdminProducts';
import ProductPreview from './ProductPreview';
import { 
  Package, 
  DollarSign, 
  Layers, 
  Palette, 
  Image as ImageIcon,
  FileText,
  Sparkles,
  Info,
  Plus,
  Trash2
} from 'lucide-react';

const formSchema = z.object({
  sku: z.string().optional(),
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  keyComponents: z.string().optional(),
  materials: z.string().optional(),
  specifications: z.string().optional(),
  designFeatures: z.string().optional(),
  price: z.number().positive('Price must be greater than 0'),
  originalPrice: z.number().optional(),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().min(1, 'Subcategory is required'),
  stock: z.number().int().nonnegative('Stock must be 0 or greater'),
  customizable: z.boolean(),
  colors: z.string().optional(),
  image: z.string().url('Please enter a valid URL'),
  additionalImages: z.string().optional(),
  badge: z.enum(['bestseller', 'new', 'sale', '']).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData?: Product | null;
}

interface BulkPriceRow {
  minQty: number;
  price: number;
}

const ProductForm = ({ initialData }: ProductFormProps) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { addProduct, updateProduct } = useAdminProducts();
  const { toast } = useToast();
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [bulkPricing, setBulkPricing] = useState<BulkPriceRow[]>([
    { minQty: 50, price: 0 },
    { minQty: 100, price: 0 },
    { minQty: 500, price: 0 },
  ]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sku: '',
      name: '',
      description: '',
      keyComponents: '',
      materials: '',
      specifications: '',
      designFeatures: '',
      price: 0,
      originalPrice: undefined,
      category: '',
      subcategory: '',
      stock: 0,
      customizable: false,
      colors: '',
      image: '',
      additionalImages: '',
      badge: undefined,
    },
  });

  const watchedValues = form.watch();

  // Set initial values if editing
  useEffect(() => {
    if (initialData) {
      form.reset({
        sku: initialData.sku || '',
        name: initialData.name,
        description: initialData.description,
        keyComponents: initialData.keyComponents || '',
        materials: initialData.materials || '',
        specifications: initialData.specifications || '',
        designFeatures: initialData.designFeatures || '',
        price: initialData.price,
        originalPrice: initialData.originalPrice,
        category: initialData.category,
        subcategory: initialData.subcategory,
        stock: initialData.stock || 0,
        customizable: initialData.customizable,
        colors: initialData.colors?.join(', ') || '',
        image: initialData.image,
        additionalImages: initialData.additionalImages?.join(', ') || '',
        badge: initialData.badge || '',
      });

      if (initialData.bulkPricing && initialData.bulkPricing.length > 0) {
        setBulkPricing(initialData.bulkPricing);
      }

      const category = categories.find(c => c.id === initialData.category);
      if (category) {
        setSubcategories(category.subcategories);
      }
    }
  }, [initialData, form]);

  const handleCategoryChange = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setSubcategories(category.subcategories);
      form.setValue('subcategory', '');
    }
  };

  const addBulkPriceRow = () => {
    setBulkPricing([...bulkPricing, { minQty: 0, price: 0 }]);
  };

  const removeBulkPriceRow = (index: number) => {
    setBulkPricing(bulkPricing.filter((_, i) => i !== index));
  };

  const updateBulkPriceRow = (index: number, field: 'minQty' | 'price', value: number) => {
    const updated = [...bulkPricing];
    updated[index][field] = value;
    setBulkPricing(updated);
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);

      const productData: Omit<Product, 'id'> = {
        sku: data.sku || undefined,
        name: data.name,
        description: data.description,
        keyComponents: data.keyComponents || undefined,
        materials: data.materials || undefined,
        specifications: data.specifications || undefined,
        designFeatures: data.designFeatures || undefined,
        price: data.price,
        originalPrice: data.originalPrice,
        image: data.image,
        additionalImages: data.additionalImages 
          ? data.additionalImages.split(',').map(url => url.trim()).filter(Boolean)
          : undefined,
        category: data.category,
        subcategory: data.subcategory,
        bulkPricing: bulkPricing.filter(bp => bp.minQty > 0 && bp.price > 0),
        customizable: data.customizable,
        colors: data.colors ? data.colors.split(',').map(color => color.trim()) : [],
        inStock: data.stock > 0,
        stock: data.stock,
        rating: initialData?.rating || 0,
        reviews: initialData?.reviews || 0,
        badge: data.badge === '' ? undefined : data.badge as Product['badge'],
      };

      if (initialData) {
        await updateProduct(initialData.id, productData);
        toast({
          title: 'Product Updated',
          description: 'Product has been updated successfully.',
        });
      } else {
        await addProduct(productData);
        toast({
          title: 'Product Added',
          description: 'New product has been added successfully.',
        });
      }

      navigate('/admin/products');
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save product.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
    <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-200">
      <Icon className="w-5 h-5 text-blue-600" />
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="xl:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <SectionHeader icon={Package} title="Basic Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        SKU / Product Code
                        <span className="text-gray-400 text-xs">(Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., INK-DRK-001" {...field} />
                      </FormControl>
                      <FormDescription>Unique identifier for inventory</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleCategoryChange(value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white z-50">
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subcategory *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={subcategories.length === 0}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white z-50">
                          {subcategories.map((subcategory) => (
                            <SelectItem key={subcategory} value={subcategory}>
                              {subcategory}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="badge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Badge</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ''}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select badge (optional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="">None</SelectItem>
                          <SelectItem value="bestseller">Bestseller</SelectItem>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="sale">Sale</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <SectionHeader icon={FileText} title="Product Description" />
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter detailed product description..."
                          className="min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Main description visible on product page</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keyComponents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Description / Components</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List key components or features..."
                          className="min-h-[80px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Bullet points or key highlights</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="materials"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Material / Color Options</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Stainless Steel, BPA-free plastic..."
                            className="min-h-[80px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specifications / Size / Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Dimensions: 20cm x 8cm, Weight: 350g..."
                            className="min-h-[80px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="designFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Design Features / Unique Selling Points</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What makes this product special? USPs, design innovations..."
                          className="min-h-[80px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <SectionHeader icon={DollarSign} title="Pricing & Inventory" />
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="originalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Original Price (₹)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="For discounts"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                          />
                        </FormControl>
                        <FormDescription>Show strikethrough price</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Bulk Pricing Table */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-900">Bulk Pricing Tiers</label>
                    <Button type="button" variant="outline" size="sm" onClick={addBulkPriceRow}>
                      <Plus className="w-4 h-4 mr-1" /> Add Tier
                    </Button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-500 uppercase">
                      <span>Min Quantity</span>
                      <span>Price per Unit (₹)</span>
                      <span></span>
                    </div>
                    {bulkPricing.map((row, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 items-center">
                        <Input
                          type="number"
                          value={row.minQty}
                          onChange={(e) => updateBulkPriceRow(index, 'minQty', parseInt(e.target.value) || 0)}
                          placeholder="50"
                          className="bg-white"
                        />
                        <Input
                          type="number"
                          value={row.price}
                          onChange={(e) => updateBulkPriceRow(index, 'price', parseFloat(e.target.value) || 0)}
                          placeholder="0"
                          className="bg-white"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBulkPriceRow(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 w-fit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Customization Options */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <SectionHeader icon={Palette} title="Customization Options" />
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="customizable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-blue-50 p-4 rounded-lg">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-blue-900">
                          Enable Customization
                        </FormLabel>
                        <FormDescription className="text-blue-700">
                          Allow customers to add logo or personalization
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="colors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Colors</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., #1e3a5f, #2d2d2d, #ffffff" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter hex color codes separated by commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Color Preview */}
                {watchedValues.colors && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-500">Preview:</span>
                    {watchedValues.colors.split(',').map((color, i) => (
                      <span
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm"
                        style={{ backgroundColor: color.trim() }}
                        title={color.trim()}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <SectionHeader icon={ImageIcon} title="Product Images" />
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Image URL *</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchedValues.image && (
                  <div className="w-32 h-32 rounded-lg border overflow-hidden bg-gray-50">
                    <img
                      src={watchedValues.image}
                      alt="Preview"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="additionalImages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Image URLs</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter additional image URLs, separated by commas..."
                          className="min-h-[60px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Comma-separated URLs for gallery images
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/products')}
                disabled={loading}
                className="px-8"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="px-8 bg-blue-600 hover:bg-blue-700">
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Saving...
                  </>
                ) : (
                  initialData ? 'Update Product' : 'Add Product'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Live Preview Section */}
      <div className="xl:col-span-1">
        <div className="sticky top-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-200">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              See how your product will appear on the website
            </p>
            <div className="flex justify-center">
              <ProductPreview
                name={watchedValues.name}
                description={watchedValues.description}
                price={watchedValues.price}
                originalPrice={watchedValues.originalPrice}
                image={watchedValues.image}
                category={categories.find(c => c.id === watchedValues.category)?.name || watchedValues.category}
                badge={watchedValues.badge}
                customizable={watchedValues.customizable}
                colors={watchedValues.colors?.split(',').map(c => c.trim()).filter(Boolean)}
              />
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-700">
                  This preview updates in real-time as you fill out the form. The actual product page may have slight styling differences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;

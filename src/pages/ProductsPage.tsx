import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { products, categories } from '@/lib/data';
import { motion } from 'framer-motion';

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryId ? [categoryId] : []
  );
  const [priceRange, setPriceRange] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const category = categoryId ? categories.find((c) => c.id === categoryId) : null;

  let filteredProducts = [...products];

  // Filter by category
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      selectedCategories.includes(p.category)
    );
  }

  // Filter by price
  if (priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(Number);
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= min && (max ? p.price <= max : true)
    );
  }

  // Sort
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      filteredProducts.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
      break;
    default:
      filteredProducts.sort((a, b) => (b.badge === 'bestseller' ? 1 : 0) - (a.badge === 'bestseller' ? 1 : 0));
  }

  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        {/* Page Header */}
        <div className="bg-gradient-hero text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {category ? category.name : 'All Products'}
              </h1>
              <p className="text-primary-foreground/80">
                {filteredProducts.length} products available
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`lg:w-64 flex-shrink-0 ${
                showFilters ? 'block' : 'hidden lg:block'
              }`}
            >
              <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedCategories.includes(cat.id)}
                          onCheckedChange={() => toggleCategory(cat.id)}
                        />
                        <span className="text-muted-foreground hover:text-foreground transition-colors">
                          {cat.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    Price Range
                  </h4>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="All prices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All prices</SelectItem>
                      <SelectItem value="0-500">Under ₹500</SelectItem>
                      <SelectItem value="500-1000">₹500 - ₹1,000</SelectItem>
                      <SelectItem value="1000-2000">₹1,000 - ₹2,000</SelectItem>
                      <SelectItem value="2000-">Above ₹2,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <div className="flex items-center gap-4 ml-auto">
                  {/* View Mode */}
                  <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">
                    No products found matching your filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategories([]);
                      setPriceRange('all');
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;

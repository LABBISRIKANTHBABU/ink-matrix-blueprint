import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    availability: true,
  });

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

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const FilterSection = ({
    title,
    sectionKey,
    children,
  }: {
    title: string;
    sectionKey: keyof typeof expandedSections;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-border pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left font-semibold text-foreground text-sm mb-3 hover:text-primary transition-colors"
      >
        {title}
        {expandedSections[sectionKey] ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {expandedSections[sectionKey] && children}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-hero text-primary-foreground py-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                {category ? category.name : 'All Products'}
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                {filteredProducts.length} products available for bulk ordering
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside
              className={`lg:w-60 flex-shrink-0 ${
                showFilters ? 'block' : 'hidden lg:block'
              }`}
            >
              <div className="bg-card rounded-lg border border-border p-5 sticky top-24 shadow-sm">
                <h3 className="font-bold text-foreground text-base mb-4 flex items-center gap-2 pb-3 border-b border-border">
                  <Filter className="h-4 w-4" /> Filters
                </h3>

                {/* Categories */}
                <FilterSection title="Category" sectionKey="categories">
                  <div className="space-y-2.5">
                    {categories.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2.5 text-sm cursor-pointer group"
                      >
                        <Checkbox
                          checked={selectedCategories.includes(cat.id)}
                          onCheckedChange={() => toggleCategory(cat.id)}
                          className="rounded-sm"
                        />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {cat.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Price Range */}
                <FilterSection title="Price Range" sectionKey="price">
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Prices' },
                      { value: '0-500', label: 'Under ₹500' },
                      { value: '500-1000', label: '₹500 - ₹1,000' },
                      { value: '1000-2000', label: '₹1,000 - ₹2,000' },
                      { value: '2000-', label: 'Above ₹2,000' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2.5 text-sm cursor-pointer group"
                      >
                        <Checkbox
                          checked={priceRange === option.value}
                          onCheckedChange={() => setPriceRange(option.value)}
                          className="rounded-full"
                        />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Availability */}
                <FilterSection title="Availability" sectionKey="availability">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
                      <Checkbox defaultChecked className="rounded-sm" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        In Stock
                      </span>
                    </label>
                    <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
                      <Checkbox className="rounded-sm" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        Customizable
                      </span>
                    </label>
                  </div>
                </FilterSection>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange('all');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5 bg-card rounded-lg border border-border p-3 shadow-sm">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <p className="text-sm text-muted-foreground hidden sm:block">
                  Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> results
                </p>

                <div className="flex items-center gap-3 ml-auto">
                  {/* View Mode */}
                  <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 h-9 text-sm">
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
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                      : 'space-y-4'
                  }
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card rounded-lg border border-border">
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

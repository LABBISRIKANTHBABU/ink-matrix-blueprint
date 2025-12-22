import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Heart, Share2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/lib/data';
import { motion } from 'framer-motion';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ProductMatrixGrid from '@/components/product/ProductMatrixGrid';

const ProductDetailPage = () => {
  const { productId } = useParams();

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        {/* Breadcrumb */}
        <div className="bg-background border-b border-border py-3">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                Products
              </Link>
              {category && (
                <>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <Link
                    to={`/category/${category.id}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                </>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-background border-b border-border py-2">
          <div className="container mx-auto px-4 flex justify-end gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>

        {/* Main Product Grid */}
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ProductMatrixGrid product={product} category={category} />
          </motion.div>
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

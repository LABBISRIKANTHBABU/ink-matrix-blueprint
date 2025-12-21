import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAdminProducts } from '../hooks/useAdminProducts';
import ProductForm from '../components/ProductForm';
import { Product } from '@/lib/data';
import { ChevronRight, Home, Loader2 } from 'lucide-react';

const EditProduct = () => {
  const { productId } = useParams();
  const { products } = useAdminProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId && products.length > 0) {
      const foundProduct = products.find(p => p.id === productId);
      setProduct(foundProduct || null);
      setLoading(false);
    } else if (products.length > 0) {
      setLoading(false);
    }
  }, [productId, products]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500">
          <Link to="/admin" className="flex items-center hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/admin/products" className="hover:text-blue-600 transition-colors">
            Products
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">Edit Product</span>
        </nav>

        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Product Not Found</h2>
          <p className="text-red-600 mb-4">
            The product with ID "{productId}" could not be found.
          </p>
          <Link
            to="/admin/products"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm text-gray-500">
        <Link to="/admin" className="flex items-center hover:text-blue-600 transition-colors">
          <Home className="w-4 h-4 mr-1" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/admin" className="hover:text-blue-600 transition-colors">
          Admin
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/admin/products" className="hover:text-blue-600 transition-colors">
          Products
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900 font-medium">Edit Product</span>
      </nav>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold">Edit Product</h1>
        <p className="mt-2 text-amber-100 max-w-2xl">
          Update the details of "{product.name}"
        </p>
      </div>

      {/* Product Form */}
      <ProductForm initialData={product} />
    </div>
  );
};

export default EditProduct;

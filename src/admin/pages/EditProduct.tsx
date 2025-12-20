import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAdminProducts } from '../hooks/useAdminProducts';
import ProductForm from '../components/ProductForm';
import { Product } from '@/lib/data';

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
    return <div>Loading...</div>;
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <p className="text-gray-600">Product not found</p>
        </div>
        <div className="bg-white p-6 rounded-md border">
          <p>Product with ID "{productId}" was not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <p className="text-gray-600">Update your product details</p>
      </div>
      <ProductForm initialData={product} />
    </div>
  );
};

export default EditProduct;
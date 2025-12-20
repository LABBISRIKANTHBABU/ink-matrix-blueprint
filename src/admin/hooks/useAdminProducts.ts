import { useState, useEffect } from 'react';
import { Product } from '@/lib/data';

interface UseAdminProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useAdminProducts = (): UseAdminProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load products from localStorage or use mock data
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('admin-products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        // Import mock data
        import('@/lib/data').then((module) => {
          setProducts(module.products);
        });
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (!loading && products.length > 0) {
      localStorage.setItem('admin-products', JSON.stringify(products));
    }
  }, [products, loading]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`, // Simple ID generation
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
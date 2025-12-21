import { Link } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { ChevronRight, Home } from 'lucide-react';

const AddProduct = () => {
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
        <span className="text-gray-900 font-medium">Add New Product</span>
      </nav>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold">Add New Product</h1>
        <p className="mt-2 text-blue-100 max-w-2xl">
          Fill out the form below to add a new product to your store. All fields marked with * are required.
        </p>
      </div>

      {/* Product Form */}
      <ProductForm />
    </div>
  );
};

export default AddProduct;

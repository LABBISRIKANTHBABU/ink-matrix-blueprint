import ProductForm from '../components/ProductForm';

const AddProduct = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <p className="text-gray-600">Create a new product for your store</p>
      </div>
      <ProductForm />
    </div>
  );
};

export default AddProduct;
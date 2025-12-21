import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProductForm from '../components/ProductForm';

const AddProduct = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form below to add a new product to your store
        </p>
      </div>
      
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>
            Enter the product details including name, price, category, and other attributes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
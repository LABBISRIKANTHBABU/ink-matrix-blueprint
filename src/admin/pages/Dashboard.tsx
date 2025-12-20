import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { useAdminProducts } from '../hooks/useAdminProducts';

const Dashboard = () => {
  const { products } = useAdminProducts();

  // Calculate statistics
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.inStock).length;
  const outOfStockProducts = totalProducts - inStockProducts;
  
  // Calculate total inventory value (using price * stock)
  const totalInventoryValue = products.reduce((sum, product) => {
    const stock = product.bulkPricing[0]?.minQty || 0;
    return sum + (product.price * stock);
  }, 0);

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      description: 'All products in inventory',
    },
    {
      title: 'In Stock',
      value: inStockProducts,
      icon: ShoppingCart,
      description: 'Products currently available',
    },
    {
      title: 'Out of Stock',
      value: outOfStockProducts,
      icon: Users,
      description: 'Products needing restocking',
    },
    {
      title: 'Inventory Value',
      value: `₹${totalInventoryValue.toLocaleString()}`,
      icon: DollarSign,
      description: 'Total value of inventory',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Ink Matrix admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ₹{product.price} • {product.category}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {product.inStock ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from(new Set(products.map(p => p.category))).map((category, index) => {
                const categoryProducts = products.filter(p => p.category === category);
                const inStockCount = categoryProducts.filter(p => p.inStock).length;
                
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="font-medium">{category}</div>
                    <div className="text-sm text-muted-foreground">
                      {inStockCount}/{categoryProducts.length} in stock
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
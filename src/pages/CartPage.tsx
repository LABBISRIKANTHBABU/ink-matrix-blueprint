import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getItemPrice, clearCart } = useCart();

  const handleRemove = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.info(`${productName} removed from cart`);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products yet.
              </p>
              <Link to="/products">
                <Button className="bg-accent hover:bg-amber-dark text-accent-foreground">
                  Start Shopping
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {items.map((item) => {
                    const unitPrice = getItemPrice(item);
                    return (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-card rounded-lg border border-border p-4"
                      >
                        <div className="flex gap-4">
                          {/* Image */}
                          <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </Link>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <Link to={`/product/${item.product.id}`}>
                              <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                                {item.product.name}
                              </h3>
                            </Link>
                            {item.selectedColor && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Color: <span className="capitalize">{item.selectedColor}</span>
                              </p>
                            )}
                            {item.customization && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Custom: {item.customization}
                              </p>
                            )}

                            {/* Price per unit */}
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-semibold text-foreground">
                                ₹{unitPrice.toLocaleString()}
                              </span>
                              {unitPrice < item.product.price && (
                                <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded">
                                  Bulk Price
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity & Actions */}
                          <div className="flex flex-col items-end gap-3">
                            <button
                              onClick={() => handleRemove(item.product.id, item.product.name)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>

                            <div className="flex items-center border border-border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-2 hover:bg-muted transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-10 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-2 hover:bg-muted transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <p className="font-bold text-foreground">
                              ₹{(unitPrice * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Clear Cart */}
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({items.length} items)</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-xs text-success">
                        ✓ You qualify for free shipping!
                      </p>
                    )}
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between text-lg font-bold text-foreground">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Including all taxes
                      </p>
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Coupon Code
                    </label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter code" />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    className="w-full bg-accent hover:bg-amber-dark text-accent-foreground font-semibold gap-2"
                    size="lg"
                    onClick={() => toast.info('Checkout coming soon!')}
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  {/* Continue Shopping */}
                  <Link to="/products" className="block mt-4">
                    <Button variant="ghost" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <span>🔒 Secure Checkout</span>
                      <span>•</span>
                      <span>📦 Fast Shipping</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;

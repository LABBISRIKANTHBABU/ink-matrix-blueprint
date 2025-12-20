import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { categories } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
  const { getTotalItems } = useCart();
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const totalItems = getTotalItems();

  const handleSignOut = async () => {
    setLoggingOut(true);
    await signOut();
    setLoggingOut(false);
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top notification bar */}
      <div className="bg-gradient-hero text-primary-foreground py-2 text-center text-sm font-medium">
        <span>🚚 Free Shipping on Orders Over ₹500! | </span>
        <Link to="/bulk-orders" className="underline hover:no-underline">
          Bulk Discounts for Corporates
        </Link>
      </div>

      {/* Main header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Ink Matrix" className="h-14 w-18" />
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search products, categories, or brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 h-11 bg-secondary border-border focus:border-accent focus:ring-accent"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-accent hover:bg-amber-dark text-accent-foreground"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2">
              {/* User Menu */}
              {loading ? (
                <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </Button>
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span className="hidden lg:inline max-w-[120px] truncate">
                        {user.displayName || user.email?.split('@')[0] || 'Account'}
                      </span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/account" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      disabled={loggingOut}
                      className="text-destructive focus:text-destructive"
                    >
                      {loggingOut ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <LogOut className="h-4 w-4 mr-2" />
                      )}
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/signin">
                  <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="hidden lg:inline">Sign In</span>
                  </Button>
                </Link>
              )}

              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                  <span className="hidden lg:inline ml-2">Cart</span>
                </Button>
              </Link>

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-3">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 h-10 bg-secondary border-border"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-accent hover:bg-amber-dark text-accent-foreground h-8"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mega Menu Navigation - Desktop */}
        <nav className="hidden md:block bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <ul className="flex items-center gap-0">
              <li>
                <Link
                  to="/products"
                  className="flex items-center gap-1 px-4 py-3 text-sm font-medium hover:bg-navy-light transition-colors"
                >
                  <Menu className="h-4 w-4" />
                  All Products
                </Link>
              </li>
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <Link
                    to={`/category/${category.id}`}
                    className="flex items-center gap-1 px-4 py-3 text-sm font-medium hover:bg-navy-light transition-colors"
                  >
                    {category.name}
                    <ChevronDown className="h-3 w-3" />
                  </Link>
                  
                  <AnimatePresence>
                    {activeCategory === category.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 w-64 bg-card text-card-foreground shadow-lg rounded-b-lg border border-border overflow-hidden z-50"
                      >
                        <div className="p-4">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-24 object-cover rounded-lg mb-3"
                          />
                          <ul className="space-y-2">
                            {category.subcategories.map((sub) => (
                              <li key={sub}>
                                <Link
                                  to={`/category/${category.id}/${sub.toLowerCase()}`}
                                  className="block text-sm text-muted-foreground hover:text-foreground hover:pl-2 transition-all"
                                >
                                  {sub}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
              <li>
                <Link
                  to="/bulk-orders"
                  className="flex items-center gap-1 px-4 py-3 text-sm font-medium bg-accent text-accent-foreground hover:bg-amber-dark transition-colors"
                >
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/products"
                    className="block py-2 text-foreground font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Products
                  </Link>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/category/${category.id}`}
                      className="block py-2 text-foreground font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-2 border-t border-border">
                  <Link
                    to="/bulk-orders"
                    className="block py-2 text-accent font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Bulk Orders
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SolutionPage from "./pages/SolutionPage";
import NotFound from "./pages/NotFound";

// Admin Components
import { AdminAuthProvider } from "./admin/AdminAuthContext";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import ProductManagement from "./admin/pages/ProductManagement";
import AddProduct from "./admin/pages/AddProduct";
import EditProduct from "./admin/pages/EditProduct";
import AdminLogin from "./admin/pages/Login";
import ProtectedRoute from "./admin/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/category/:categoryId" element={<ProductsPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/solutions/:solutionId" element={<SolutionPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={
                <AdminAuthProvider>
                  <AdminLogin />
                </AdminAuthProvider>
              } />
              <Route path="/admin" element={
                <AdminAuthProvider>
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                </AdminAuthProvider>
              }>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="edit-product/:productId" element={<EditProduct />} />
              </Route>
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
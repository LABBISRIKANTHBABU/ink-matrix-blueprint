import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../AdminAuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, getToken } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const token = getToken();
    
    // If no token, redirect to login
    if (!token) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, getToken, navigate]);

  // If authenticated, render children
  // Otherwise, render nothing (will redirect)
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
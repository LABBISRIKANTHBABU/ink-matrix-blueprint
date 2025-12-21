import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../AdminAuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, getToken } = useAdminAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check authentication status
    const token = getToken();
    
    // If no token, redirect to login
    if (!token) {
      navigate('/admin/login');
    }
    setIsChecking(false);
  }, [getToken, navigate]);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // If authenticated (token exists), render children
  const token = getToken();
  return token ? <>{children}</> : null;
};

export default ProtectedRoute;
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  getToken: () => string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('admin-token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('admin-token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('admin-token');
    setIsAuthenticated(false);
  };

  const getToken = () => {
    return localStorage.getItem('admin-token');
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import AdminLayout from './components/AdminLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated === false && location.pathname.startsWith('/admin')) {
      navigate('/');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If authenticated and on landing page, redirect to admin
  if (isAuthenticated && location.pathname === '/') {
    navigate('/admin/elders');
    return null;
  }

  // If authenticated, wrap in AdminLayout for /admin routes
  if (isAuthenticated && location.pathname.startsWith('/admin')) {
    return <AdminLayout />;
  }

  return <Outlet />;
}

export default App;
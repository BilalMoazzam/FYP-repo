import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthService from "../components/services/AuthService";

// This component protects routes that require authentication
const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const isLoggedIn = await AuthService.isLoggedIn(); // Awaiting the promise here
        if (isMounted) {
          setIsAuthenticated(isLoggedIn);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        if (isMounted) {
          setIsAuthenticated(false); // Or handle the error appropriately
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return <div className="loading-auth">Checking authentication...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected route
  return children;
};

export default AuthGuard;

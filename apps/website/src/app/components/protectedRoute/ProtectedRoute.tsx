// src/components/protectedRoute/ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) {
    // Not authenticated – redirect to login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Authenticated but not authorised – redirect to unauthorised page
    return <Navigate to="/unauthorised" replace />;
  }

  // User is authenticated and authorised – render children
  return children;
};

export default ProtectedRoute;

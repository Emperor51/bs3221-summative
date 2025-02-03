// src/components/protectedRoute/ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import roleHierarchy from '../../constants/roleHierarchy';

interface ProtectedRouteProps {
  minRole: 'user' | 'auditor' | 'admin';
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ minRole, children }) => {
  const { user } = useAuth();

  if (!user) {
    // User is not authenticated.
    return <Navigate to="/login" replace />;
  }
  console.log ("====================")
  console.log ("user-role " + user.role + roleHierarchy[user.role])
  console.log ("minrole " + minRole + roleHierarchy[minRole])
  console.log ("evaluate " + (roleHierarchy[user.role] < roleHierarchy[minRole]))
  console.log ("====================")

  // Check if the user's role level is lower than the required minimal level.
  if (roleHierarchy[user.role] < roleHierarchy[minRole]) {
    return <Navigate to="/unauthorised" replace />;
  }

  // All good – render the child component.
  return children;
};

export default ProtectedRoute;

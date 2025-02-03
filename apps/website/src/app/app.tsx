import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LayoutWithMenu from './layouts/LayoutWithMenu';
import Login from './screens/login/Login';
import Unauthorised from './screens/unauthorised/Unauthorised';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import protectedRoutes from './config/protectedRoutes';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorised" element={<Unauthorised />} />

        {protectedRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={
              <ProtectedRoute allowedRoles={route.allowedRoles}>
                <LayoutWithMenu>{route.element}</LayoutWithMenu>
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </AuthProvider>
  );
}

export default App;

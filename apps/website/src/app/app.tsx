import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LayoutWithMenu from './layouts/LayoutWithMenu';
import Login from './screens/login/Login';
import Unauthorised from './screens/unauthorised/Unauthorised';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import NotFound from './screens/notfound/NotFound';
import protectedRoutes from './config/protectedRoutes';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorised" element={<Unauthorised />} />

        {/* Load Protected Routes */}
        {protectedRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={
              <ProtectedRoute minRole={route.minRole}>
                <LayoutWithMenu>{route.element}</LayoutWithMenu>
              </ProtectedRoute>
            }
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

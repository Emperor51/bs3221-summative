import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../axiosInstance';

interface User {
  id: number;
  email: string;
  role: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  hasPermission: (permission: string) => boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  refreshAccessToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token && refreshToken) {
      refreshAccessToken().then((valid) => {
        if (!valid) {
          signOut();
        }
        else {
          storeUserDetails()
        }
      })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await axios.post('http://localhost:3169/api/auth/login', { email, password });

    const { accessToken, refreshToken } = response.data;

    // Store tokens securely
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    storeUserDetails()

    setAccessToken(accessToken);

    navigate('/');
  };

  const signOut = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await axios.post('http://localhost:3169/api/auth/logout', { refreshToken });
      }
    } catch (error) {
      console.error('Error logging out', error);
    }

    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    setUser(null);
    setAccessToken(null);
    navigate('/login');
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
      const { data } = await axios.post('http://localhost:3169/api/auth/refresh', { refreshToken });

      // ✅ Store new access & refresh tokens
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      API.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      return true;
    } catch {
      return false;
    }
  };

  const storeUserDetails = useCallback(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));

    const user = {
      id: decodedToken.sub,
      email: decodedToken.email,
      role: decodedToken.role,
      permissions: decodedToken.permissions,
    };

    // Store tokens securely
    localStorage.setItem('user', JSON.stringify(user));

    setUser(user);
  }, []);

  const hasPermission = (permission: string) => {
    return user?.permissions.includes(permission) || false;
  };

  const value = { user, accessToken, signIn, signOut, hasPermission, refreshAccessToken };

  return <AuthContext.Provider value={value}>
    {!loading && children} {/* Prevent rendering UI until auth check is done */}
  </AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

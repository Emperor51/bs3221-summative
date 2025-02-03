// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (user: User, callback?: VoidFunction) => void;
  signOut: (callback?: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
    return null;
  });

  // Optionally, you could also use an effect to keep localStorage in sync
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const signIn = (newUser: User, callback?: VoidFunction) => {
    setUser(newUser);
    if (callback) {
      callback();
    } else {
      navigate('/');
    }
  };

  const signOut = (callback?: VoidFunction) => {
    setUser(null);
    if (callback) {
      callback();
    } else {
      navigate('/login');
    }
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

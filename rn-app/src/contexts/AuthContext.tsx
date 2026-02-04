import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, User } from '../services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: {
    username: string;
    password: string;
    fullName: string;
    role: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        await api.initialize();
        const currentUser = await api.getCurrentUser();
        const token = api.getToken();
        if (currentUser && token) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    const result = await api.login(username, password);
    setUser(result.user);
  };

  const register = async (data: {
    username: string;
    password: string;
    fullName: string;
    role: string;
    phone?: string;
  }) => {
    const result = await api.register(data);
    setUser(result.user);
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

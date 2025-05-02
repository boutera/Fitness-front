import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';
import { authService } from '../services/authService';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    error: null,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        setState(prev => ({
          ...prev,
          isAuthenticated: true,
          user,
          error: null,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        error: 'Failed to check authentication status',
      }));
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const user = await authService.login(credentials);
      setState({
        isAuthenticated: true,
        user,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const user = await authService.register(credentials);
      setState({
        isAuthenticated: true,
        user,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setState({
        isAuthenticated: false,
        user: null,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Logout failed',
      }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
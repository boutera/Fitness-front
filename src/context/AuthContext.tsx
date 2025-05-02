import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi, getCurrentUser, logoutApi } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (data: { 
    username: string; 
    email: string; 
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      console.log('Retrieved user data from storage:', userData);
      if (userData) {
        const user = JSON.parse(userData);
        console.log('Parsed user data:', user);
        // Verify the token is still valid by making a request to the backend
        const currentUser = await getCurrentUser(user.token);
        console.log('Current user from API:', currentUser);
        
        if (currentUser) {
          setState({
            isAuthenticated: true,
            user: { ...currentUser, token: user.token },
            error: null,
            isLoading: false,
          });
        } else {
          // Token is invalid, clear stored data
          await AsyncStorage.removeItem('user');
          setState({
            isAuthenticated: false,
            user: null,
            error: null,
            isLoading: false,
          });
        }
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await loginApi(credentials);
      console.log('Login response:', response);
      const user = {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        token: response.token,
      };
      console.log('Storing user data:', user);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setState({
        isAuthenticated: true,
        user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Login error:', error);
      setState({
        isAuthenticated: false,
        user: null,
        error: 'Login failed. Please check your credentials.',
        isLoading: false,
      });
      throw error;
    }
  };

  const register = async (data: { 
    username: string; 
    email: string; 
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const response = await registerApi(data);
      console.log('Register response:', response);
      const user = {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        token: response.token,
      };
      console.log('Storing user data:', user);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setState({
        isAuthenticated: true,
        user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Registration error:', error);
      setState({
        isAuthenticated: false,
        user: null,
        error: 'Registration failed. Please try again.',
        isLoading: false,
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (state.user?.token) {
        await logoutApi(state.user.token);
      }
      await AsyncStorage.removeItem('user');
      setState({
        isAuthenticated: false,
        user: null,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if the API call fails, we still want to clear the local state
      await AsyncStorage.removeItem('user');
      setState({
        isAuthenticated: false,
        user: null,
        error: null,
        isLoading: false,
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
    }}>
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
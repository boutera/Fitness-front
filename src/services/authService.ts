import axios from 'axios';
import { LoginCredentials, RegisterCredentials, User } from '../types/auth';

const API_URL = 'http://192.168.11.119:8080/api';

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw new Error('Login failed');
    }
  },

  async register(credentials: RegisterCredentials): Promise<User> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
      throw new Error('Registration failed');
    }
  },

  async logout(): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Logout failed');
      }
      throw new Error('Logout failed');
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      return response.data;
    } catch (error) {
      return null;
    }
  }
}; 
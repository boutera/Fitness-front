import { API_URL } from '../config';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthResponse extends User {
  token?: string;
}

export const login = async (credentials: { username: string; password: string }): Promise<AuthResponse> => {
  console.log('Login request:', credentials);
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Login error response:', error);
    throw new Error(error || 'Login failed');
  }

  const data = await response.json();
  const token = response.headers.get('Authorization')?.replace('Bearer ', '') || '';
  console.log('Login success response:', { ...data, token });
  return { ...data, token };
};

export const register = async (data: { 
  username: string; 
  email: string; 
  password: string;
  firstName: string;
  lastName: string;
}): Promise<AuthResponse> => {
  console.log('Register request:', data);
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Register error response:', error);
    throw new Error(error || 'Registration failed');
  }

  const responseData = await response.json();
  const token = response.headers.get('Authorization')?.replace('Bearer ', '') || '';
  console.log('Register success response:', { ...responseData, token });
  return { ...responseData, token };
};

export const logoutApi = async (token: string): Promise<void> => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Logout failed');
  }
};

export const getCurrentUser = async (token: string): Promise<User | null> => {
  console.log('Getting current user with token:', token);
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Get current user error:', response.status);
      return null;
    }

    const userData = await response.json();
    console.log('Current user response:', userData);
    return userData;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}; 
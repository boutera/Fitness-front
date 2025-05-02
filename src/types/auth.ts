export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  email: string;
} 
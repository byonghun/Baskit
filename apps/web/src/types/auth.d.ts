export interface AuthUser {
  id: string;
  email: string;
  roles: string[];
  isGuest: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

import { createContext, useState, useEffect } from "react";
import { AuthState } from "../types/auth";
import { AuthApi } from "../api/auth.api";

export const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
} | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  // Load user on mount
  useEffect(() => {
    AuthApi.getMe()
      .then((user) => setState((s) => ({ ...s, user, isLoading: false })))
      .catch(() => setState((s) => ({ ...s, isLoading: false })));
  }, []);

  // Auth methods
  const login = async (email: string, password: string) => {
    try {
      setState((s) => ({ ...s, isLoading: true, error: null }));
      const user = await AuthApi.login({ email, password });
      setState((s) => ({ ...s, user, isLoading: false }));
    } catch (err) {
      setState((s) => ({
        ...s,
        error: err instanceof Error ? err.message : "Login failed",
        isLoading: false,
      }));
      throw err;
    }
  };

  const logout = async () => {
    try {
      setState((s) => ({ ...s, isLoading: true, error: null }));
      await AuthApi.logout();
      setState({ user: null, isLoading: false, error: null });
    } catch (err) {
      setState((s) => ({
        ...s,
        error: err instanceof Error ? err.message : "Logout failed",
        isLoading: false,
      }));
      throw err;
    }
  };

  return <AuthContext.Provider value={{ state, login, logout }}>{children}</AuthContext.Provider>;
};

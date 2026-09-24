"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };

    case "LOGOUT":
      return {
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string; isAdmin?: boolean }>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<{ success: boolean; error?: string; isAdmin?: boolean }>;
  logout: () => void;
  /** Returns the stored token — useful for authenticated API calls outside the context */
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // ── Session hydration on mount ───────────────────────────────────────────
  useEffect(() => {
    let cancelled = false; // prevent state updates if component unmounts mid-request

    const checkAuth = async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;

      if (!token) {
        dispatch({ type: "SET_LOADING", payload: false });
        return;
      }

      try {
        // Verify the token is still valid
        const verifyRes = await fetch(`${API_BASE_URL}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!verifyRes.ok) throw new Error("Token invalid");

        // Hydrate the full user profile
        const profileRes = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!profileRes.ok) throw new Error("Profile fetch failed");

        const { user } = await profileRes.json();

        if (!cancelled) {
          dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
        }
      } catch {
        if (!cancelled) {
          localStorage.removeItem("auth_token");
          dispatch({ type: "LOGIN_FAILURE" });
        }
      }
    };

    checkAuth();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Login ────────────────────────────────────────────────────────────────
  const login = useCallback(
    async (
      email: string,
      password: string,
    ): Promise<{ success: boolean; error?: string; isAdmin?: boolean }> => {
      dispatch({ type: "LOGIN_START" });

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("auth_token", data.token);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: data.user, token: data.token },
          });
          return { success: true, isAdmin: data.user?.isAdmin || false };
        } else {
          dispatch({ type: "LOGIN_FAILURE" });
          return { success: false, error: data.error || "Login failed" };
        }
      } catch {
        dispatch({ type: "LOGIN_FAILURE" });
        return { success: false, error: "Network error. Please try again." };
      }
    },
    [],
  );

  // ── Register ─────────────────────────────────────────────────────────────
  const register = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
    ): Promise<{ success: boolean; error?: string; isAdmin?: boolean }> => {
      dispatch({ type: "LOGIN_START" });

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, firstName, lastName }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("auth_token", data.token);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: data.user, token: data.token },
          });
          return { success: true, isAdmin: data.user?.isAdmin || false };
        } else {
          dispatch({ type: "LOGIN_FAILURE" });
          return { success: false, error: data.error || "Registration failed" };
        }
      } catch {
        dispatch({ type: "LOGIN_FAILURE" });
        return { success: false, error: "Network error. Please try again." };
      }
    },
    [],
  );

  // ── Logout ───────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    // Clear any other persisted auth state here if added in future
    dispatch({ type: "LOGOUT" });
  }, []);

  // ── Utility: get raw token for external API calls ─────────────────────
  const getToken = useCallback((): string | null => {
    return (
      state.token ??
      (typeof window !== "undefined"
        ? localStorage.getItem("auth_token")
        : null)
    );
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, login, register, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

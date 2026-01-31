"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
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
      return {
        ...state,
        isLoading: true,
      };

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
        ...state,
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
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
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

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            // Get full user profile
            const profileResponse = await fetch(
              `${API_BASE_URL}/api/auth/profile`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            if (profileResponse.ok) {
              const profileData = await profileResponse.json();
              dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                  user: profileData.user,
                  token,
                },
              });
            } else {
              localStorage.removeItem("auth_token");
              dispatch({ type: "LOGIN_FAILURE" });
            }
          } else {
            localStorage.removeItem("auth_token");
            dispatch({ type: "LOGIN_FAILURE" });
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("auth_token");
          dispatch({ type: "LOGIN_FAILURE" });
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("auth_token", data.token);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: data.user,
            token: data.token,
          },
        });
        return { success: true };
      } else {
        dispatch({ type: "LOGIN_FAILURE" });
        return { success: false, error: data.error || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch({ type: "LOGIN_FAILURE" });
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("auth_token", data.token);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: data.user,
            token: data.token,
          },
        });
        return { success: true };
      } else {
        dispatch({ type: "LOGIN_FAILURE" });
        return { success: false, error: data.error || "Registration failed" };
      }
    } catch (error) {
      console.error("Registration error:", error);
      dispatch({ type: "LOGIN_FAILURE" });
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        register,
        logout,
      }}
    >
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

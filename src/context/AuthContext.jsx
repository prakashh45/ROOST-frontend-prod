import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { authApi } from "../api/services";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem("roost_user");

    try {
      return cached ? JSON.parse(cached) : null;
    } catch {
      localStorage.removeItem("roost_user");
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Save user in localStorage
  // -----------------------------
  const persist = (u) => {
    const normalized = {
      ...u,
      role: String(u.role || "GUEST").toUpperCase(),
    };

    localStorage.setItem(
      "roost_user",
      JSON.stringify(normalized)
    );

    setUser(normalized);

    return normalized;
  };

  // -----------------------------
  // Check existing JWT
  // -----------------------------
  useEffect(() => {
    const token = localStorage.getItem("roost_token");

    if (!token) {
      setLoading(false);
      return;
    }

    authApi
      .me()
      .then((response) => {
        console.log("AUTH ME RESPONSE:", response);

        // Backend:
        // {
        //   success: true,
        //   data: {
        //     user: {...}
        //   }
        // }

        const userData =
          response?.data?.user ||
          response?.user ||
          response?.data;

        if (!userData) {
          throw new Error("Invalid /me response");
        }

        persist(userData);
      })
      .catch((err) => {
        console.error("AUTH ME ERROR:", err);

        localStorage.removeItem("roost_token");
        localStorage.removeItem("roost_user");

        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // -----------------------------
  // Login / Register
  // -----------------------------
  const login = async (values, register = false) => {
    try {
      const response = register
        ? await authApi.register(values)
        : await authApi.login(values);

      console.log("AUTH RESPONSE:", response);

      /*
        Expected backend response:

        {
          success: true,
          message: "...",
          data: {
            user: {
              id: "17",
              name: "ROOST Demo Owner 2",
              email: "owner2@roost.com",
              role: "OWNER"
            },
            token: "JWT..."
          }
        }
      */

      const authData = response?.data;

      if (!authData?.token) {
        console.error("Token missing:", response);

        throw new Error(
          "Authentication successful but token was not returned"
        );
      }

      const loggedUser = authData.user;

      if (!loggedUser) {
        throw new Error(
          "Authentication successful but user was not returned"
        );
      }

      // Save REAL JWT
      localStorage.setItem(
        "roost_token",
        authData.token
      );

      // Save user
      return persist(loggedUser);
    } catch (err) {
      console.error("AUTH LOGIN ERROR:", err);
      throw err;
    }
  };

  // -----------------------------
  // Logout
  // -----------------------------
  const logout = () => {
    localStorage.removeItem("roost_token");
    localStorage.removeItem("roost_user");

    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import type { User } from "../types/user";
import type { LoginPayload, RegisterPayload } from "../types/auth.ts";
import * as authService from "../services/authService.ts";
import apiClient from "../api/apiClient.ts";

const APP_MODE = import.meta.env.VITE_APP_MODE;

const MOCK_USER: User = {
  id: "mock-user-123",
  username: "mock_admin",
  roles: ["ROLE_ADMIN", "ROLE_USER", "ROLE_SELLER"],
};

type AuthContextType = {
  user: User | null;
  login: (payload: LoginPayload) => Promise<void>;
  isAuthenticated: boolean;
  logout: () => void;
  register: (payload: RegisterPayload) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    if (APP_MODE === "mock") {
      console.warn(
        'Running in MOCK mode. Tự động đăng nhập với user "mock_admin".'
      );
      return MOCK_USER;
    }
    return authService.getStoredUser();
  });

  const login = async (payload: LoginPayload) => {
    if (APP_MODE === "mock") {
      console.log("MOCK API: login()", payload);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser({ ...MOCK_USER, username: payload.username });
      return;
    }

    try {
      const authData = await authService.login(payload);
      if (authData) {
        setUser(authData.user);
      }
    } catch (error) {
      console.log("Loi login", error);
      throw error;
    }
  };

  const register = async (payload: RegisterPayload) => {
    if (APP_MODE === "mock") {
      console.log("MOCK API: register()", payload);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser({ ...MOCK_USER, username: payload.username });
      return;
    }
    try {
      const authData = await authService.register(payload);
      if (authData) {
        setUser(authData.user);
      }
    } catch (error) {
      console.log("Loi register" + error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    if (APP_MODE === "mock") {
      console.log("MOCK API: logout() (chỉ local)");
      return;
    }

    try {
      const response = await apiClient.post("/auth-service/public/logout");
      if (response.data.success) {
        console.log("Logged out successfully (API)");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API logout:", error);
    }
  };

  const isAuthenticated = !!user;

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      isAuthenticated,
    }),
    [user]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

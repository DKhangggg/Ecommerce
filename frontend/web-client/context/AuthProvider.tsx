"use client";

import { LoginResponse, RegisterRequest } from "@/types/AuthResponse/auth";
import { User } from "@/types/User";
import {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
const LOGIN_URL = `${API_URL}/auth/login`;
const REFRESH_URL = `${API_URL}/auth/refresh`;
const LOGOUT_URL = `${API_URL}/auth/logout`;
const REGISTER_URL = `${API_URL}/auth/register`;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (register: RegisterRequest) => Promise<void>;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  mock = false,
}: {
  children: ReactNode;
  mock?: boolean;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const accessTokenRef = useRef<string | null>(null);

  const refreshAccessToken = async (): Promise<boolean> => {
    if (mock) {
      console.log("MOCK: Refreshing token...");
      await new Promise((res) => setTimeout(res, 300));
      const mockUser: User = user || {
        id: "mock-id-refreshed",
        username: "mock-user",
        roles: ["USER"],
      };
      const newMockToken = "mock-access-token-" + Date.now();

      setUser(mockUser);
      accessTokenRef.current = newMockToken;
      localStorage.setItem("refreshToken", "mock-refresh-token-" + Date.now());
      console.log("MOCK: Token refreshed");
      return true;
    }

    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (!storedRefreshToken) {
      return false; // Không có token để refresh
    }

    try {
      const response = await fetch(REFRESH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      });

      if (!response.ok) {
        throw new Error("Refresh token thất bại");
      }

      const data: LoginResponse = await response.json();

      setUser(data.userInfo);
      accessTokenRef.current = data.acessToken;
      localStorage.setItem("refreshToken", data.refreshToken);
      return true;
    } catch (error) {
      console.error("Lỗi khi refresh token:", error);
      setUser(null);
      accessTokenRef.current = null;
      localStorage.removeItem("refreshToken");
      return false;
    }
  };

  useEffect(() => {
    async function checkUserSession() {
      if (mock) {
        console.log("MOCK: Bỏ qua kiểm tra session khi tải trang.");
        setLoading(false);
        return;
      }

      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (storedRefreshToken) {
        await refreshAccessToken();
      }
      setLoading(false);
    }

    checkUserSession();
  }, [mock]);

  const login = async (username: string, password: string) => {
    setLoading(true);

    if (mock) {
      console.log("MOCK: Logging in...");
      await new Promise((res) => setTimeout(res, 500));
      const mockUser: User = {
        id: "mock-id-123",
        username: username,
        roles: ["USER", "ADMIN"],
      };
      const mockData: LoginResponse = {
        acessToken: "mock-access-token-12345",
        refreshToken: "mock-refresh-token-67890",
        userInfo: mockUser,
      };

      setUser(mockData.userInfo);
      accessTokenRef.current = mockData.acessToken;
      localStorage.setItem("refreshToken", mockData.refreshToken);
      setLoading(false);
      console.log("MOCK: Logged in as", mockUser.username);
      return;
    }

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Đăng nhập thất bại");
      }

      const data: LoginResponse = await response.json();

      setUser(data.userInfo);
      accessTokenRef.current = data.acessToken;
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (error) {
      console.error(error);
      setUser(null);
      accessTokenRef.current = null;
      localStorage.removeItem("refreshToken");
    } finally {
      setLoading(false);
    }
  };
  const register = async (request: RegisterRequest) => {
    setLoading(true);

    if (mock) {
      console.log("MOCK: Registering user...", request);
      await new Promise((res) => setTimeout(res, 500));
      const mockUser: User = {
        id: "mock-new-user-id",
        username: request.username,
        roles: ["USER"],
      };
      const mockData: LoginResponse = {
        acessToken: "mock-access-token-new-user",
        refreshToken: "mock-refresh-token-new-user",
        userInfo: mockUser,
      };
      setUser(mockData.userInfo);
      accessTokenRef.current = mockData.acessToken;
      localStorage.setItem("refreshToken", mockData.refreshToken);
      setLoading(false);
      console.log("MOCK: Registered and logged in as", mockUser.username);
      return;
    }

    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request), // <-- Gửi toàn bộ object request
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Đăng ký thất bại");
      }

      // Giả định BE trả về LoginResponse (tự động login)
      const data: LoginResponse = await response.json();

      setUser(data.userInfo);
      accessTokenRef.current = data.acessToken;
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (error) {
      setUser(null);
      accessTokenRef.current = null;
      localStorage.removeItem("refreshToken");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    if (!mock) {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (storedRefreshToken) {
        try {
          fetch(LOGOUT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: storedRefreshToken }),
          });
        } catch (error) {
          console.error("Lỗi khi gọi API logout:", error);
        }
      }
    }

    setUser(null);
    accessTokenRef.current = null;
    localStorage.removeItem("refreshToken");
    console.log(mock ? "MOCK: Logged out" : "Logged out");
  };

  const fetchWithAuth = async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const headers = new Headers(options.headers);
    if (accessTokenRef.current) {
      headers.append("Authorization", `Bearer ${accessTokenRef.current}`);
    }

    let response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      console.warn("Access token hết hạn. Đang refresh...");

      const refreshSuccess = await refreshAccessToken();

      if (refreshSuccess) {
        console.log("Refresh thành công. Thử lại request...");
        const newHeaders = new Headers(options.headers);
        newHeaders.append("Authorization", `Bearer ${accessTokenRef.current}`);

        response = await fetch(url, { ...options, headers: newHeaders });
      } else {
        console.error("Refresh thất bại. User sẽ bị logout.");
      }
    }

    return response;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    fetchWithAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth phải được dùng bên trong một AuthProvider");
  }
  return context;
};

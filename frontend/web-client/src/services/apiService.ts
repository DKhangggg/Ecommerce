import { mockUser } from "../mocks/user";
import type { User } from "../types/user";

export const apiService = {
  login: async (username: string, password: string): Promise<User> => {
    console.log("API: Đang login...", { username, password });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (username === "admin" && password === "1") {
      return mockUser;
    } else {
      throw new Error("Username hoặc password không đúng");
    }
  },

  logout: async (): Promise<void> => {
    console.log("API: Đang logout...");
    await new Promise((resolve) => setTimeout(resolve, 500));
    return;
  },

  getUserProfile: async (): Promise<User> => {
    console.log("API: Đang lấy user profile...");
    await new Promise((resolve) => setTimeout(resolve, 800));

    const token = localStorage.getItem("user");

    if (!token) {
      throw new Error("Chưa đăng nhập (401 Unauthorized)");
    }

    return mockUser;
  },
};

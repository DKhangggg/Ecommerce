import { User } from "../User";

export interface LoginResponse {
  acessToken: string; // Dùng "acessToken" đúng như bạn cung cấp
  refreshToken: string;
  userInfo: User;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string; // Gửi dạng string "YYYY-MM-DD"
}

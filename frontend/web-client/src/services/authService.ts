import type {AuthResponse, LoginPayload, RegisterPayload} from "../types/auth.ts";
import apiClient from "../api/apiClient.ts";
import type {apiResponse} from "../types/ApiResponse.ts";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_INFO_KEY = "user";

export const login = async (payload: LoginPayload): Promise<AuthResponse | undefined> => {
    try {
        const response = await apiClient.post<apiResponse<AuthResponse>>('public/auth/login', payload);
        const apiResponse = response.data;

        if (apiResponse.error || !apiResponse.success) {
            throw new Error(apiResponse.message || 'Lỗi không xác định từ server');
        }

        const data = apiResponse.data;
        if (data.accessToken) {
            localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
        }
        if (data.refreshToken) {
            localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
        }
        if (data.user) {
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(data.user));
        }
        return data;
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        throw error;
    }
}
export const register = async (payload: RegisterPayload): Promise<AuthResponse | undefined> => {
    try {
        const response = await apiClient.post<apiResponse<AuthResponse>>('public/auth/register', payload);
        const apiResponse = response.data;

        if (apiResponse.error || !apiResponse.success) {
            throw new Error(apiResponse.message || 'Lỗi không xác định từ server');
        }

        const data = apiResponse.data;
        if (data.accessToken) {
            localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
        }
        if (data.refreshToken) {
            localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
        }
        if (data.user) {
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(data.user));
        }
        return data;
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        throw error;
    }
}

export const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_INFO_KEY);
}
export const getStoredUser = () => {
    const userJson = localStorage.getItem(USER_INFO_KEY);
    if (!userJson) return null;
    try {
        return JSON.parse(userJson);
    } catch (e) {
        return null;
    }
}
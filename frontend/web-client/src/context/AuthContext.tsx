import {createContext, type ReactNode, useContext, useMemo, useState,} from "react";
import type {User} from "../types/user";
import type {LoginPayload, RegisterPayload} from "../types/auth.ts";
import * as authService from "../services/authService.ts"
import apiClient from "../api/apiClient.ts";

type AuthContextType = {
    user: User | null;
    login: (payload: LoginPayload) => void;
    isAuthenticated: boolean;
    logout: () => void;
    register: (payload: RegisterPayload) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(() => {
        return authService.getStoredUser();
    });
    const login = async (payload: LoginPayload) => {
        try {
            const authData = await authService.login(payload);
            if (authData) {
                setUser(authData.user);
            }
        } catch (error) {
            console.log("Loi")
            throw error
        }
    };
    const register = async (payload: RegisterPayload) => {
        try {
            const authData = await authService.register(payload);
            if (authData) {
                setUser(authData.user);
            }
        } catch (error) {
            console.log("Loi" + error)
            throw error
        }
    }
    const logout = async () => {

        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        const response = await apiClient.post("/auth-service/public/logout")
        if (response.data.success) {
            console.log("Logged out successfully");
        }
    };
    const isAuthenticated = !!user;
    const contextValue = useMemo(
        () => ({
            user,
            login,
            logout, register,
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

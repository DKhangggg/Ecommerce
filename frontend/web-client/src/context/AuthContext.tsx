import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types/user";
import type {LoginPayload} from "../types/auth.ts";
import * as authService from "../services/authService.ts"
type AuthContextType = {
  user: User | null;
  login: (payload: LoginPayload) => void;
  isAuthenticated: boolean;
  logout:()=>void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(() => {
        return authService.getStoredUser();
    });
  const login = async (payload:LoginPayload)=>{
      try{
    const authData = await authService.login(payload);
    if(authData){
        setUser(authData.user);
    }
      } catch(error){
          console.log("Loi")
          throw error
      }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  const isAuthenticated = !!user;
  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
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

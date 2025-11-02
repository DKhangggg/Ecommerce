import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {isAuthenticated, user} = useAuth();
    const location = useLocation();
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
    const isSellerRoute = location.pathname.startsWith("/seller");
    const isSeller = user.roles?.includes("ROLE_SELLER") ?? false;

    if (isSellerRoute && !isSeller) {
        return <Navigate to="/profile" replace/>;
    }
    return <>{children}</>;
};

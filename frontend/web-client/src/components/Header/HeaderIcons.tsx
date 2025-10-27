import { ShoppingCart, Heart, User, LogOut, LogIn } from "lucide-react"; // 1. Thêm LogIn
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContext.tsx";

export default function HeaderIcons() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex justify-evenly items-center header-icons">
            <Link
                to="/wishlist"
                className="relative flex items-center gap-1 opacity-90 hover:opacity-100"
            >
                <Heart />
                Yêu Thích
            </Link>

            {isAuthenticated ? (
                <>
                    <Link
                        to="/profile"
                        className="flex items-center gap-1 opacity-90 hover:opacity-100"
                    >
                        <User />
                        Tài khoản
                    </Link>

                    <Link
                        to="/profile/cart"
                        className="relative flex items-center gap-1 opacity-90 hover:opacity-100"
                    >
                        <ShoppingCart />
                        Giỏ hàng
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 opacity-90 hover:opacity-100"
                    >
                        <LogOut />
                        Đăng xuất
                    </button>
                </>
            ) : (
                <>
                    <Link
                        to="/login"
                        className="flex items-center gap-1 opacity-90 hover:opacity-100"
                    >
                        <LogIn />
                        Đăng nhập
                    </Link>
                </>
            )}
        </div>
    );
}
import {Gem, Heart, LogIn, LogOut, ShoppingCart, Store, User} from "lucide-react"; // 1. Thêm LogIn
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.tsx";

export default function HeaderIcons() {
    const {isAuthenticated, logout, user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const isSeller = user?.roles.includes("ROLE_SELLER") ?? false;
    const isSellerArea = location.pathname.startsWith("/seller");
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
                <Heart/>
                Yêu Thích
            </Link>
            {isAuthenticated ? (
                <>
                    <Link
                        to="/profile"
                        className="flex items-center gap-1 opacity-90 hover:opacity-100"
                    >
                        <User/>
                        Tài khoản
                    </Link>
                    <Link
                        to="/profile/cart"
                        className="relative flex items-center gap-1 opacity-90 hover:opacity-100"
                    >
                        <ShoppingCart/>
                        Giỏ hàng
                    </Link>
                    {isSeller && (
                        isSellerArea ? (

                            <Link
                                to="/"
                                className="relative flex items-center gap-1 opacity-90 hover:opacity-100"
                            >
                                <Store/>
                                Trang Mua
                            </Link>
                        ) : (
                            <Link
                                to="/seller"
                                className="relative flex items-center gap-1 opacity-90 hover:opacity-100"
                            >
                                <Gem/>
                                Kênh Người Bán
                            </Link>
                        )
                    )}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 opacity-90 hover:opacity-100"
                    >
                        <LogOut/>
                        Đăng xuất
                    </button>
                </>
            ) : (
                <>
                    <Link
                        to="/login"
                        className="flex items-center gap-1 opacity-90 hover:opacity-100"
                    >
                        <LogIn/>
                        Đăng nhập
                    </Link>
                    <Link
                        to="/Register"
                        className="flex items-center gap-1 opacity-90 hover:opacity-100"
                    >
                        <LogIn/>
                        Đăng Ký
                    </Link>
                </>
            )}
        </div>
    );
}
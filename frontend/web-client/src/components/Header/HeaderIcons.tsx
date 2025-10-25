import { ShoppingCart, Heart, User } from "lucide-react";
import { use } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderIcons() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-evenly items-center header-icons">
      <Link
        to="/wishlist"
        className="relative flex items-center gap-1 opacity-90 hover:opacity-100"
      >
        <Heart />
        Yêu Thích
      </Link>

      <Link
        to="/profile"
        className="flex items-center gap-1 opacity-90 hover:opacity-100"
      >
        <User />
        Tài khoản
      </Link>

      <Link
        to="/cart"
        className="relative flex items-center gap-1 opacity-90 hover:opacity-100"
      >
        <ShoppingCart />
        Giỏ hàng
      </Link>
    </div>
  );
}

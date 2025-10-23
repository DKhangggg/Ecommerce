import { ShoppingCart, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeaderIcons() {
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
        to="/account"
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

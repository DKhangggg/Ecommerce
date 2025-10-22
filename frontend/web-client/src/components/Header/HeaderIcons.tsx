import { ShoppingCart, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeaderIcons() {
  return (
    <div className="flex justify-evenly items-center">
      <Link
        to="/wishlist"
        className="relative hover:text-pink-600 flex items-center gap-1"
      >
        <Heart />
        Yêu Thích
      </Link>

      <Link
        to="/account"
        className="hover:text-blue-600 flex items-center gap-1"
      >
        <User />
        Tài khoản
      </Link>

      <Link
        to="/cart"
        className="relative hover:text-green-600 flex items-center gap-1"
      >
        <ShoppingCart />
        Giỏ hàng
      </Link>
    </div>
  );
}

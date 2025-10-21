import { Link } from "react-router-dom";

export default function NavMenu() {
  return (
    <nav className="flex justify-around">
      <Link to="/categories/orchids" className="hover:text-green-600">
        San pham
      </Link>
      <Link to="/categories/accessories" className="hover:text-green-600">
        phu kien
      </Link>
      <Link to="/deals" className="hover:text-green-600">
        Thoi trang
      </Link>
      <Link to="/blogs" className="hover:text-green-600">
        Danh Muc
      </Link>
      <Link to="/about" className="hover:text-green-600"></Link>
    </nav>
  );
}

import { Link } from "react-router-dom";

export default function NavMenu() {
  return (
    <nav className="flex justify-around gap-6">
      <Link to="/categories/orchids" className="opacity-90 hover:opacity-100">
        San pham
      </Link>
      <Link
        to="/categories/accessories"
        className="opacity-90 hover:opacity-100"
      >
        phu kien
      </Link>
      <Link to="/deals" className="opacity-90 hover:opacity-100">
        Thoi trang
      </Link>
      <Link to="/blogs" className="opacity-90 hover:opacity-100">
        Danh Muc
      </Link>
      <Link to="/about" className="opacity-90 hover:opacity-100"></Link>
    </nav>
  );
}

import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";
import "./OrdersPage.css";

export default function OrdersPage() {
  const location = useLocation();

  const orderTabs = [
    { label: "Tất cả", path: "/profile/orders/all" },
    { label: "Chờ xác nhận", path: "/profile/orders/pending" },
    { label: "Vận chuyển", path: "/profile/orders/shipping" },
    { label: "Chờ giao hàng", path: "/profile/orders/delivering" },
    { label: "Hoàn thành", path: "/profile/orders/completed" },
    { label: "Đã hủy", path: "/profile/orders/cancelled" },
    { label: "Trả hàng/Hoàn tiền", path: "/profile/orders/refunds" },
  ];

  const isBaseRoute = location.pathname === "/profile/orders";

  return (
    <div className="orders-page">
      <div className="orders-header">
        <div className="orders-header__top">
          <h1 className="orders-header__title">Đơn Mua</h1>
          <div className="orders-search">
            <Search className="orders-search__icon" />
            <input
              type="text"
              placeholder="Tìm đơn hàng..."
              className="orders-search__input"
            />
          </div>
        </div>
      </div>

      <div className="orders-tabs">
        <div className="orders-tabs__wrapper">
          <div className="orders-tabs__list">
            {orderTabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                end
                className={({ isActive }) =>
                  `orders-tabs__link ${
                    isActive
                      ? "orders-tabs__link--active"
                      : "orders-tabs__link--inactive"
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div className="orders-content">
        {isBaseRoute ? (
          <div className="orders-empty">
            <div className="orders-empty__icon-wrapper">
              <ShoppingBag className="orders-empty__icon" />
            </div>
            <p className="orders-empty__title">Chưa có đơn hàng nào</p>
            <p className="orders-empty__text">
              Hãy chọn một tab để xem đơn hàng của bạn
            </p>
            <button className="orders-empty__button">Mua sắm ngay</button>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

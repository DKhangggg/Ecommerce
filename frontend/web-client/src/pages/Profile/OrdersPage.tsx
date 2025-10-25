import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";


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
    <div className="w-full h-auto">
      <div className="border-b border-gray-200 -mx-4 md:-mx-6 px-4 md:px-6 mb-6">
        <div className="flex overflow-x-auto scrollbar-hide -mb-px">
          <div className="flex gap-6 md:gap-8 min-w-max">
            {orderTabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                end
                className={({ isActive }) =>
                  `pb-3 px-1 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-600 hover:text-gray-800 hover:text-primary/70"
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full">
        {isBaseRoute ? (
          <div className="flex flex-col items-center justify-center py-12 md:py-16">
            <div className="bg-gray-50 rounded-full p-6 mb-4">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm md:text-base text-center">
              Chưa có đơn hàng nào
            </p>
            <p className="text-gray-400 text-xs md:text-sm text-center mt-2">
              Hãy chọn một tab để xem đơn hàng của bạn
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

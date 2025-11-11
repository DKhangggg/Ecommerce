import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";

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
    <div className="w-full">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b">
          <h1 className="text-2xl md:text-3xl font-semibold">Đơn Mua</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm đơn hàng..."
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[rgba(217,187,176,0.3)] focus:border-[#d9bbb0]"
            />
          </div>
        </div>
      </div>

      <div className="mb-6 border-b -mx-4 px-4">
        <div className="overflow-x-auto">
          <div className="flex gap-4 min-w-max py-3">
            {orderTabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                end
                className={({ isActive }) =>
                  `pb-2 px-3 text-sm font-medium whitespace-nowrap ${
                    isActive
                      ? "border-b-4 border-[#d9bbb0] text-[#ad9c8e]"
                      : "text-gray-600 hover:text-[#ad9c8e]"
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
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow mb-4">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Chưa có đơn hàng nào
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Hãy chọn một tab để xem đơn hàng của bạn
            </p>
            <button className="px-4 py-2 rounded-md bg-gradient-to-br from-[#e8d59e] to-[#d9bbb0] text-[#2b2b2b] font-medium">
              Mua sắm ngay
            </button>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";

// 1. Mock Data (Bạn sẽ thay bằng API call)
const allOrders = [
  {
    id: "#DH-123",
    date: "2025-11-10",
    status: "DELIVERED",
    total: 1500000,
    items: 3,
  },
  {
    id: "#DH-124",
    date: "2025-11-12",
    status: "IN_TRANSIT",
    total: 850000,
    items: 1,
  },
  {
    id: "#DH-125",
    date: "2025-11-14",
    status: "PENDING",
    total: 300000,
    items: 2,
  },
  {
    id: "#DH-126",
    date: "2025-11-14",
    status: "CANCELLED",
    total: 500000,
    items: 1,
  },
];

type OrderStatus = "ALL" | "PENDING" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";

// 2. Component nhỏ cho Trạng thái (Status Badge)
const OrderStatusBadge = ({ status }: { status: string }) => {
  let text, icon, colorClass;
  switch (status) {
    case "PENDING":
      text = "Đang xử lý";
      icon = <Package className="h-4 w-4" />;
      colorClass =
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      break;
    case "IN_TRANSIT":
      text = "Đang giao";
      icon = <Truck className="h-4 w-4" />;
      colorClass =
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      break;
    case "DELIVERED":
      text = "Đã giao";
      icon = <CheckCircle className="h-4 w-4" />;
      colorClass =
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      break;
    case "CANCELLED":
      text = "Đã hủy";
      icon = <XCircle className="h-4 w-4" />;
      colorClass = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      break;
    default:
      text = "N/A";
  }
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${colorClass}`}
    >
      {icon}
      {text}
    </div>
  );
};

// 3. Component chính của trang
export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("ALL");

  const filteredOrders = allOrders.filter(
    (order) => activeTab === "ALL" || order.status === activeTab
  );

  const tabs: { id: OrderStatus; name: string }[] = [
    { id: "ALL", name: "Tất cả" },
    { id: "PENDING", name: "Đang xử lý" },
    { id: "IN_TRANSIT", name: "Đang giao" },
    { id: "DELIVERED", name: "Đã giao" },
    { id: "CANCELLED", name: "Đã hủy" },
  ];

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      {/* (1) Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Đơn hàng của bạn
        </h1>
        <p className="mt-1 text-muted-foreground">
          Xem lịch sử và trạng thái các đơn hàng.
        </p>
      </div>

      {/* (2) Thanh Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`hoverEffect whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium
                ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:border-gray-300 hover:text-foreground"
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* (3) Danh sách Đơn hàng */}
      <div className="flex flex-col gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
            >
              {/* Header của thẻ đơn hàng */}
              <div className="flex flex-col items-start gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary">
                    Mã đơn: {order.id}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ngày đặt: {order.date}
                  </p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              {/* Thân thẻ (tùy chọn, có thể thêm ảnh SP) */}
              <div className="border-t border-border p-4 sm:p-6">
                <p className="text-sm text-muted-foreground">
                  Số lượng sản phẩm: {order.items}
                </p>
                <p className="mt-2 text-xl font-bold text-foreground">
                  Tổng tiền: {order.total.toLocaleString("vi-VN")}đ
                </p>
              </div>

              {/* Footer của thẻ */}
              <div className="border-t border-border bg-accent/50 p-4 sm:p-6">
                <Link
                  href={`/account/orders/${order.id}`} // Link tới trang chi tiết
                  className="hoverEffect text-sm font-medium text-primary hover:underline"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            Không tìm thấy đơn hàng nào.
          </p>
        )}
      </div>
    </div>
  );
}

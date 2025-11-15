"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Percent, ShoppingBag, AlertCircle } from "lucide-react";

// 1. Mock Data (Bạn sẽ thay bằng API)
const mockNotifications = [
  {
    id: 1,
    type: "PROMOTION",
    isRead: false,
    title: "Siêu Sale 11.11! Giảm giá 50% toàn bộ cửa hàng",
    desc: "Đừng bỏ lỡ cơ hội mua sắm lớn nhất năm. Hàng ngàn ưu đãi...",
    timestamp: "2 giờ trước",
    link: "/shop",
  },
  {
    id: 2,
    type: "ORDER",
    isRead: false,
    title: "Đơn hàng #DH-124 đã được giao",
    desc: "Cảm ơn bạn đã mua sắm! Vui lòng đánh giá sản phẩm.",
    timestamp: "Hôm qua",
    link: "/account/orders/DH-124",
  },
  {
    id: 3,
    type: "SYSTEM",
    isRead: true,
    title: "Cập nhật điều khoản dịch vụ",
    desc: "Chúng tôi đã cập nhật chính sách bảo mật và điều khoản...",
    timestamp: "14/11/2025",
    link: "/terms",
  },
  {
    id: 4,
    type: "ORDER",
    isRead: true,
    title: "Đơn hàng #DH-123 đang trên đường giao",
    desc: "Tài xế của chúng tôi sẽ giao hàng cho bạn trong hôm nay.",
    timestamp: "12/11/2025",
    link: "/account/orders/DH-123",
  },
];

type NotificationTab = "ALL" | "UNREAD" | "PROMOTION" | "ORDER";

// 2. Component nhỏ cho Icon Thông báo
const NotificationIcon = ({ type }: { type: string }) => {
  let icon, colorClass;
  switch (type) {
    case "PROMOTION":
      icon = <Percent className="h-5 w-5" />;
      // Dùng màu primary (theo style trang Dashboard/Settings)
      colorClass = "bg-primary/10 text-primary";
      break;
    case "ORDER":
      icon = <ShoppingBag className="h-5 w-5" />;
      // Dùng màu chart-2 (blue-ish từ global.css)
      colorClass = "bg-[var(--color-chart-2)]/10 text-[var(--color-chart-2)]";
      break;
    default:
      icon = <AlertCircle className="h-5 w-5" />;
      // Dùng màu chart-1 (orange-ish từ global.css)
      colorClass = "bg-[var(--color-chart-1)]/10 text-[var(--color-chart-1)]";
  }
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colorClass}`}
    >
      {icon}
    </div>
  );
};

// 3. Component chính của trang
export default function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState<NotificationTab>("ALL");

  const filteredNotifications = mockNotifications.filter((noti) => {
    if (activeTab === "UNREAD") return !noti.isRead;
    if (activeTab === "PROMOTION") return noti.type === "PROMOTION";
    if (activeTab === "ORDER") return noti.type === "ORDER";
    return true; // Tab "ALL"
  });

  const tabs: { id: NotificationTab; name: string }[] = [
    { id: "ALL", name: "Tất cả" },
    { id: "UNREAD", name: "Chưa đọc" },
    { id: "PROMOTION", name: "Khuyến mãi" },
    { id: "ORDER", name: "Đơn hàng" },
  ];

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      {/* (1) Header */}
      <div className="flex items-center gap-3">
        <Bell className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Thông báo
        </h1>
      </div>

      {/* (2) Thanh Tabs (Giống trang Orders) */}
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

      {/* (3) Danh sách Thông báo */}
      <div className="flex flex-col gap-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className={`hoverEffect relative flex gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md
                ${item.isRead ? "opacity-70" : ""}
              `}
            >
              {/* Icon */}
              <NotificationIcon type={item.type} />

              {/* Nội dung */}
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {item.desc}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {item.timestamp}
                </p>
              </div>

              {/* Dấu "Chưa đọc" */}
              {!item.isRead && (
                <div className="h-3 w-3 shrink-0 rounded-full bg-primary mt-1" />
              )}
            </Link>
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            Bạn không có thông báo nào.
          </p>
        )}
      </div>
    </div>
  );
}

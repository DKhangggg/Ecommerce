import { SidebarItem } from "@/components/Sidebar/SideBar";
import {
  BarChart3,
  BellRing,
  ClipboardList,
  Heart,
  LayoutDashboard,
  Package,
  Paperclip,
  Settings,
  ShoppingBag,
  Store,
  TicketCheck,
} from "lucide-react";

export const ACCOUNT_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 1,
    name: "Tổng quan",
    to: "/account", // URL gốc của account
    icon: LayoutDashboard,
  },
  {
    id: 2,
    name: "Đơn hàng",
    to: "/account/orders",
    icon: ShoppingBag,
  },
  {
    id: 3,
    name: "Yêu thích",
    to: "/account/favorites",
    icon: Heart,
  },
  {
    id: 4,
    name: "Voucher",
    to: "/account/vouchers",
    icon: TicketCheck,
  },

  {
    id: 5,
    name: "Thông Báo",
    to: "/account/announcements",
    icon: BellRing,
  },
  {
    id: 6,
    name: "Cài đặt",
    to: "/account/settings",
    icon: Settings,
  },
];
export const SELLER_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: "s1",
    name: "Tổng quan",
    to: "/seller/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "s2",
    name: "Quản lý Đơn hàng",
    to: "/seller/orders",
    icon: ClipboardList,
  },
  {
    id: "s3",
    name: "Quản lý Sản phẩm",
    to: "/seller/products",
    icon: Package,
  },
  {
    id: "s4",
    name: "Phân tích & Báo cáo",
    to: "/seller/analytics",
    icon: BarChart3,
  },
  {
    id: "s5",
    name: "Cài đặt Cửa hàng",
    to: "/seller/settings",
    icon: Store,
  },
];

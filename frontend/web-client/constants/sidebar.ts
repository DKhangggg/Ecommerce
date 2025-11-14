import { SidebarItem } from "@/components/Sidebar/SideBar";
import {
  Heart,
  LayoutDashboard,
  Paperclip,
  Settings,
  ShoppingBag,
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
    name: "Cài đặt",
    to: "/account/settings",
    icon: Settings,
  },
];

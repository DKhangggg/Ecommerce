import { SidebarItem } from "@/components/Sidebar/SideBar";
import {
  BadgeDollarSign,
  BarChart3,
  BellRing,
  Bike,
  Book,
  ClipboardList,
  Footprints,
  Gem,
  Heart,
  HeartPulse,
  Home,
  LayoutDashboard,
  MessageCircle,
  Package,
  Settings,
  Shirt,
  ShoppingBag,
  Smartphone,
  Store,
  TicketCheck,
  ToyBrick,
} from "lucide-react";

export const ACCOUNT_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 1,
    name: "Tổng quan",
    to: "/account",
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
    to: "/seller",
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
    name: "Tin nhắn Khách hàng",
    to: "/seller/messages",
    icon: MessageCircle,
  },
  {
    id: "s6",
    name: "Marketing",
    to: "/seller/marketing",
    icon: BadgeDollarSign,
  },
  {
    id: "s7",
    name: "Cài đặt Cửa hàng",
    to: "/seller/settings",
    icon: Store,
  },
];

export const PRODUCT_CATEGORY_ITEMS: SidebarItem[] = [
  {
    id: "cat-1",
    name: "Quần áo & Thời trang",
    to: "/shop/thoi-trang",
    icon: Shirt,
  },
  {
    id: "cat-2",
    name: "Giày dép",
    to: "/shop/giay-dep",
    icon: Footprints,
  },
  {
    id: "cat-3",
    name: "Thiết bị Điện tử",
    to: "/shop/dien-tu",
    icon: Smartphone,
  },
  {
    id: "cat-4",
    name: "Sách & Văn phòng phẩm",
    to: "/shop/sach",
    icon: Book,
  },
  {
    id: "cat-5",
    name: "Đồ gia dụng & Đời sống",
    to: "/shop/gia-dung",
    icon: Home,
  },
  {
    id: "cat-6",
    name: "Sức khỏe & Sắc đẹp",
    to: "/shop/sac-dep",
    icon: HeartPulse,
  },
  {
    id: "cat-7",
    name: "Thể thao & Dã ngoại",
    to: "/shop/the-thao",
    icon: Bike,
  },
  {
    id: "cat-8",
    name: "Đồ chơi & Mẹ và bé",
    to: "/shop/me-va-be",
    icon: ToyBrick,
  },
  {
    id: "cat-9",
    name: "Trang sức & Phụ kiện",
    to: "/shop/phu-kien",
    icon: Gem,
  },
];

import {
    Boxes,
    Landmark,
    LayoutDashboard,
    type LucideIcon,
    Megaphone,
    MessageCircle,
    Package,
    ShoppingCart,
    Star,
    Store,
} from "lucide-react";

export type SellerNavItem = {
    id: number;
    name: string;
    to: string;
    icon: LucideIcon;
};

export const SELLER_SIDEBAR_ITEMS: SellerNavItem[] = [
    {
        id: 1,
        name: "Bảng điều khiển",
        to: "/seller/dashboard",
        icon: LayoutDashboard,
    },
    {
        id: 2,
        name: "Quản lý Đơn hàng",
        to: "/seller/orders",
        icon: ShoppingCart,
    },
    {
        id: 3,
        name: "Quản lý Sản phẩm",
        to: "/seller/products",
        icon: Package,
    },
    {
        id: 4,
        name: "Quản lý Kho hàng",
        to: "/seller/inventory",
        icon: Boxes,
    },
    {
        id: 5,
        name: "Tài chính",
        to: "/seller/finance",
        icon: Landmark,
    },
    {
        id: 6,
        name: "Marketing",
        to: "/seller/marketing",
        icon: Megaphone,
    },
    {
        id: 7,
        name: "Tin nhắn",
        to: "/seller/mess",
        icon: MessageCircle,
    },
    {
        id: 8,
        name: "Quản lý Đánh giá",
        to: "/seller/stars",
        icon: Star,
    },
    {
        id: 9,
        name: "Thiết lập Shop",
        to: "/seller/setting",
        icon: Store,
    },
];
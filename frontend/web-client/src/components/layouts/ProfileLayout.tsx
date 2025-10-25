import { Outlet } from "react-router-dom";
import { Bell, User, ShoppingBag, Ticket, Coins, Store } from "lucide-react";
import { SideBar } from "../Sidebar/SideBar";
import Header from "../Header/Header";
import "./ProfileLayout.css";

export default function ProfileLayout() {
  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <Header />

      <main className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "1.5rem",
            width: "100%",
          }}
          className="flex-col md:flex-row"
        >
          <aside
            style={{
              width: "256px",
              flexShrink: 0,
              alignSelf: "flex-start",
            }}
            className="w-full md:w-64"
          >
            <div className="sidebar-wrapper">
              <SideBar
                title="Tài khoản"
                useLink
                items={[
                  {
                    id: 1,
                    name: "Thông báo",
                    icon: Bell,
                    to: "/profile/notifications",
                  },
                  {
                    id: 2,
                    name: "Tài khoản của tôi",
                    icon: User,
                    to: "/profile/user",
                  },
                  {
                    id: 3,
                    name: "Đơn mua",
                    icon: ShoppingBag,
                    to: "/profile/orders/all",
                  },
                  {
                    id: 4,
                    name: "Kho Voucher",
                    icon: Ticket,
                    to: "/profile/vouchers",
                  },
                  {
                    id: 5,
                    name: "Giỏ hàng của bạn",
                    icon: Coins,
                    to: "/profile/cart",
                  },
                  {
                    id: 6,
                    name: "Cửa hàng của tôi",
                    icon: Store,
                    to: "/profile/seller",
                  },
                ]}
              />
            </div>
          </aside>

          <div
            style={{
              flex: 1,
              minWidth: 0,
              width: "100%",
            }}
            className="flex-1 min-w-0"
          >
            <div className="profile-content-wrapper">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

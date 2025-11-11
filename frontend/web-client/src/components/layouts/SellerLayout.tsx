import { Outlet } from "react-router-dom";
import { SideBar } from "../Sidebar/SideBar";
import Header from "../Header/Header";
import { SELLER_SIDEBAR_ITEMS } from "../../mocks/SellerNavItem.ts";
import Footer from "../Footer/Footer.tsx";

export default function SellerLayout() {
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
            <div className="sticky top-24 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <SideBar title="Tài khoản" useLink items={SELLER_SIDEBAR_ITEMS} />
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
            <div className="relative min-h-[400px] bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

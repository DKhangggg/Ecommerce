import { MOCK_CATEGORIES } from "../../mocks/category";
import Header from "../Header/Header";
import { SideBar } from "../Sidebar/SideBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  const categories = MOCK_CATEGORIES;
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full overflow-x-hidden">
        <div className="page-container py-4">
          {/* Flex container for sidebar and content - horizontal layout on desktop */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "2rem",
              width: "100%",
            }}
            className="flex-col lg:flex-row"
          >
            {/* Sidebar - Fixed width, sticky on desktop */}
            <aside
              style={{
                width: "260px",
                flexShrink: 0,
                alignSelf: "flex-start",
              }}
              className="w-full lg:w-[260px]"
            >
              <SideBar categories={categories} />
            </aside>

            {/* Main Content - Flexible width, fills remaining space */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                width: "100%",
              }}
              className="flex-1 min-w-0"
            >
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

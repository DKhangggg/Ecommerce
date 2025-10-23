import { MOCK_CATEGORIES } from "../../mocks/category";
import Header from "../Header/Header";
import { SideBar } from "../Sidebar/SideBar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  const categories = MOCK_CATEGORIES;
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full overflow-x-hidden">
        <div className="page-container py-4">
          <div className="grid grid-cols-[220px_1fr] gap-6 items-stretch">
            <aside className="w-[220px] self-start sticky" style={{ top: 0 }}>
              <SideBar categories={categories} />
            </aside>

            <div className="min-w-0">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import Header from "../Header/Header";
import { SideBar } from "../Sidebar/SideBar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full overflow-x-hidden">
        <div className="max-w-[1440px] mx-auto px-4 py-4">
          <div className="grid grid-cols-[220px_1fr] gap-6 items-start">
            <aside className="w-[220px]">
              <SideBar />
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

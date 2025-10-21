import { useEffect, useState } from "react";
import Header from "./Header/Header";
import MainContent from "./Main/MainContent";
import { SideBar } from "./Sidebar/SideBar";
import type { BannerProps } from "./Main/Banner";
import { mockBanners } from "../../mocks/banner";
export default function UserLayout() {
  const [banners, setBanners] = useState<BannerProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMockData = () => {
      setLoading(true);
      setTimeout(() => {
        setBanners(mockBanners);
        setLoading(false);
      }, 1000);
    };

    fetchMockData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <SideBar />
      </div>
    </div>
  );
}

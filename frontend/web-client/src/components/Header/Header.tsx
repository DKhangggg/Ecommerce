import HeaderIcons from "./HeaderIcons";
import NavMenu from "./NavMenu";
import SearchBar from "./SearchBar";
import TopBar from "./TopBar";
import LogoIcon from "./logoIcon";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-br from-[#f5f0eb] to-[#faf7f4] shadow-[0_4px_20px_rgba(0,0,0,0.08)] sticky top-0 z-[100]">
      <div className="bg-gradient-to-br from-[#b97b48] to-[#a06a3e] text-white py-2 text-sm">
        <div className="max-w-[1400px] mx-auto px-12">
          <TopBar />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#f5f0eb] to-[#ffffff] border-b border-[rgba(185,123,72,0.1)]">
        <div className="max-w-[1400px] mx-auto px-12">
          <div className="flex items-center justify-between h-[80px] gap-8">
            <div className="flex-shrink-0 transition-transform hover:scale-105">
              <LogoIcon />
            </div>

            <div className="flex-1 max-w-[600px] mx-auto w-full">
              <SearchBar />
            </div>

            <div className="flex-shrink-0 flex items-center gap-6">
              <HeaderIcons />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[rgba(249,240,227,0.5)] border-t border-[rgba(185,123,72,0.1)] py-3">
        <div className="max-w-[1400px] mx-auto px-12">
          <NavMenu />
        </div>
      </div>
    </header>
  );
}

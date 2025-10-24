import HeaderIcons from "./HeaderIcons";
import NavMenu from "./NavMenu";
import SearchBar from "./SearchBar";
import TopBar from "./TopBar";
import "./Header.css";
import LogoIcon from "./logoIcon";

export default function Header() {
  return (
    <header className="modern-header">
      <div className="modern-header-topbar">
        <div className="modern-header-container">
          <TopBar />
        </div>
      </div>

      <div className="modern-header-main">
        <div className="modern-header-container">
          <div className="modern-header-content">
            <div className="modern-header-logo">
              <LogoIcon />
            </div>

            <div className="modern-header-search">
              <SearchBar />
            </div>

            <div className="modern-header-icons">
              <HeaderIcons />
            </div>
          </div>
        </div>
      </div>

      <div className="modern-header-nav">
        <div className="modern-header-container">
          <NavMenu />
        </div>
      </div>
    </header>
  );
}

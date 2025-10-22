import HeaderIcons from "./HeaderIcons";
import NavMenu from "./NavMenu";
import SearchBar from "./SearchBar";
import TopBar from "./TopBar";
import "./Header.css";
import LogoIcon from "./logoIcon";
export default function Header() {
  return (
    <header className="Container">
      <div className="Topbar">
        <TopBar />
      </div>

      <div className="Middlebar">
        <div>
          <LogoIcon />
        </div>
        <div>
          <SearchBar />
        </div>
        <div>
          <HeaderIcons />
        </div>
      </div>
      <div className="">
        <NavMenu />
      </div>
      <hr className="border-gray-300" />
    </header>
  );
}

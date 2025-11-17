"use client";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import FavoriteButton from "./FavoriteButton";
import CartIcon from "./CartIcon";
import MobileMenu from "./MobileMenu";
import SigninButton from "./SignInButton";
import SwitchUiButton from "./SwitchUiButton";

const Header = () => {
  return (
    <header className="bg-brand-1 py-4 border-b border-brand-4">
      <Container className="flex items-center justify-between text-brand-6">
        {" "}
        {/* Logo */}
        <div
          className="w-auto md:w-1/3 flex 
          items-center gap-2.5 justify-start md:gap-0"
        >
          <MobileMenu />
          <Logo />
        </div>
        {/* NavButton */}
        <HeaderMenu />
        {/* NavIcon */}
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <SwitchUiButton />
          <SigninButton />
        </div>
      </Container>
    </header>
  );
};

export default Header;

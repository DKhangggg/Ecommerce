import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import FavoriteButton from "./FavoriteButton";
import CartIcon from "./CartIcon";
import MobileMenu from "./MobileMenu";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import SigninButton from "./SignInButton";

const Header = async () => {
  const user = await currentUser();
  console.log(user, "user");
  return (
    <header className="bg-brand-2 py-5 border-b border-b-black/50">
      <Container className="flex items-center justify-between text-shadow-zinc-400">
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
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {!user && <SigninButton />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;

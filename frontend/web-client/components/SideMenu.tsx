import React, { FC } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import SignInButton from "./SignInButton";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathName = usePathname();
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full
    bg-black/50 shadow-xl text-white/80 ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } hoverEffect
    `}
    >
      <div
        className="min-w-72 max-w-96 bg-black h-screen p-10 
        border-r border-r-brand-7 flex flex-col gap-6 "
      >
        <div className="flex items-center justify-between gap-5">
          <Logo />
          <Button onClick={onClose} className="hover:text-brand-7 hoverEffect">
            <X />
          </Button>
        </div>

        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData?.map((item) => (
            <Link
              href={item?.href}
              key={item?.title}
              className={`hover:text-brand-7 hoverEffect${
                pathName === item?.href && "text-brand-7"
              }`}
            >
              {item?.title}
            </Link>
          ))}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;

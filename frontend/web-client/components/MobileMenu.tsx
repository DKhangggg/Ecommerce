"use client";
import { AlignLeft, AlignLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";

const MobileMenu = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return (
      <button disabled className="md:hidden">
        <AlignLeft className="hover:text-zinc-950 hoverEffect md:hidden hover:cursor-pointer" />
      </button>
    );
  }

  return (
    <>
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <AlignLeft
          className="
        hover:text-zinc-950 hoverEffect md:hidden hover:cursor-pointer"
        />
      </button>
      <div className="md:hidden">
        <SideMenu
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </>
  );
};

export default MobileMenu;

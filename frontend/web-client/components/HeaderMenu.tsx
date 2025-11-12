"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = () => {
  const pathName = usePathname();
  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-7 text-sm capitalize font-semibold text-brand-5">
      {headerData?.map((item) => (
        <Link
          key={item?.title}
          href={item?.href}
          className={`hover:text-brand-7 hoverEffect relative group ${
            pathName === item?.href && "text-brand-7"
          }`}
        >
          {item?.title}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-brand-7 group-hover:w-1/2 hoverEffect group-hover:left-0 ${
              pathName === item?.href && "w-1/2"
            }`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-brand-7 group-hover:w-1/2 hoverEffect group-hover:right-0 ${
              pathName === item?.href && "w-1/2"
            }`}
          />
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({ cl }: { cl?: string }) => {
  return (
    <Link href={"/"}>
      {" "}
      <h2
        className={cn(
          "text-2xl text-brand-6 font-black tracking-wider uppercase hover:text-brand-7 group font-sans",
          cl
        )}
      >
        Ecom
        <span className="text-brand-7 group-hover:text-brand-6 hoverEffect ">
          merce
        </span>
      </h2>
    </Link>
  );
};

export default Logo;

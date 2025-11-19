import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  return (
    <Link href={"/cart"} className="group relative">
      <ShoppingCart className="h-5 w-5 hover:text-brand-7 hoverEffect" />
      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-brand-7 text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        0
      </span>
    </Link>
  );
};

export default CartIcon;

"use client";
import { SellerAuthGuard } from "@/components/SellerGuard";
import { SideBar } from "@/components/Sidebar/SideBar";
import { SELLER_SIDEBAR_ITEMS } from "@/constants/sidebar";
import React from "react";

const Sellerlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SellerAuthGuard>
      <div className="flex min-h-screen">
        <SideBar items={SELLER_SIDEBAR_ITEMS} />
        <div className="flex-1">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SellerAuthGuard>
  );
};

export default Sellerlayout;

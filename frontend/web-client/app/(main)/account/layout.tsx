"use client";
import { AuthGuard } from "@/components/AuthGuard";
import Container from "@/components/Container";
import { SideBar } from "@/components/Sidebar/SideBar";
import { ACCOUNT_SIDEBAR_ITEMS } from "@/constants/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <Container className="bg-brand-1 flex flex-row gap-5 pt-6">
        <SideBar
          title="Tài khoản"
          useLink={true}
          items={ACCOUNT_SIDEBAR_ITEMS}
          className="w-64"
        />
        <div className="flex-1">{children}</div>
      </Container>
    </AuthGuard>
  );
};

export default Layout;

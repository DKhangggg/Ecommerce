"use client";
import Container from "@/components/Container";
import { SideBar } from "@/components/Sidebar/SideBar";
import { PRODUCT_CATEGORY_ITEMS } from "@/constants/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container className="bg-brand-1 flex flex-row gap-5 pt-6">
      <SideBar
        title="Danh Mục"
        useLink={true}
        items={PRODUCT_CATEGORY_ITEMS}
        className="w-64"
      />
      <div className="flex-1">{children}</div>
    </Container>
  );
};

export default layout;

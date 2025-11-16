"use client";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SellerAuthGuard } from "@/components/SellerGuard";
import { SideBar } from "@/components/Sidebar/SideBar";
import { SELLER_SIDEBAR_ITEMS } from "@/constants/sidebar";
import React from "react";

const Sellerlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SellerAuthGuard>
      <>
        <Header />
        <Container className="bg-brand-1 flex flex-row gap-5 pt-6">
          <main className="flex min-h-screen bg-gray-100 gap 10">
            <SideBar
              title="Quản Lý"
              useLink={true}
              items={SELLER_SIDEBAR_ITEMS}
              className="w-64"
            />
            {children}
          </main>
        </Container>
        <Footer />
      </>
    </SellerAuthGuard>
  );
};

export default Sellerlayout;

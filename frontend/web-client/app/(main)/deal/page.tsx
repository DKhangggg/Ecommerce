"use client";
import React from "react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductList from "@/components/Product/ProductList";

export default function DealPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="bg-linear-to-r from-rose-600 to-orange-500 text-white">
        <Container>
          <div className="py-10 md:py-14 flex flex-col gap-6 md:gap-8">
            <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">
              Hot Deals hôm nay
            </h1>
            <p className="text-white/90 max-w-2xl">
              Săn ưu đãi giá sốc, giảm sâu theo giờ. Đừng bỏ lỡ!
            </p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="bg-white text-gray-900 hover:bg-white/90"
              >
                Mua ngay
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Xem tất cả
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-6 md:py-10 flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Danh mục
              </Button>
              <Button size="sm" variant="outline">
                Giá
              </Button>
              <Button size="sm" variant="outline">
                Thương hiệu
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Mới nhất
              </Button>
              <Button size="sm" variant="outline">
                Bán chạy
              </Button>
              <Button size="sm" variant="outline">
                Giảm giá nhiều
              </Button>
            </div>
          </div>
          <Separator />

          <ProductList title="Ưu đãi nổi bật" />
        </div>
      </Container>
    </div>
  );
}

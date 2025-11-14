"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

// 1. Mock Data
const mockFavoriteItems = [
  {
    id: 1,
    name: "Áo Sơ mi Trắng Cao cấp",
    price: 750000,
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 2,
    name: "Quần Jeans Rách Gối",
    price: 1200000,
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 3,
    name: "Giày Sneaker Da",
    price: 2500000,
    image: "https://via.placeholder.com/300x300",
  },
];

// 2. Component chính
export default function FavoritesPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      {/* (1) Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Danh sách Yêu thích
        </h1>
        <p className="mt-1 text-muted-foreground">
          Các sản phẩm bạn đã lưu để xem sau.
        </p>
      </div>

      {/* (2) Lưới sản phẩm */}
      {mockFavoriteItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockFavoriteItems.map((item) => (
            <div
              key={item.id}
              className="hoverEffect overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-lg"
            >
              {/* Ảnh sản phẩm */}
              <Link href={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-60 w-full object-cover"
                />
              </Link>

              {/* Nội dung thẻ */}
              <div className="p-4">
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-semibold text-foreground truncate">
                    {item.name}
                  </h3>
                </Link>
                <p className="mt-1 text-lg font-bold text-primary">
                  {item.price.toLocaleString("vi-VN")}đ
                </p>

                {/* Các nút hành động */}
                <div className="mt-4 flex gap-3">
                  <button className="hoverEffect flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    <ShoppingCart className="mr-2 inline h-4 w-4" /> Thêm vào
                    giỏ
                  </button>
                  <button
                    className="hoverEffect rounded-md border border-input bg-secondary p-2 text-destructive"
                    title="Bỏ yêu thích"
                  >
                    <Heart className="h-5 w-5" fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          Bạn chưa có sản phẩm yêu thích nào.
        </p>
      )}
    </div>
  );
}

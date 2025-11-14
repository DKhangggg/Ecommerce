"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingCart, Info } from "lucide-react";

// 1. Mock Data (Bạn sẽ thay bằng API)
const mockCartItems = [
  {
    id: 1,
    name: "Áo Sơ mi Trắng Cao cấp",
    size: "M",
    price: 750000,
    quantity: 1,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Quần Jeans Rách Gối",
    size: "32",
    price: 1200000,
    quantity: 2,
    image: "https://via.placeholder.com/100",
  },
];

const subtotal = mockCartItems.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);
const shipping = 30000;
const total = subtotal + shipping;

// 2. Component chính
export default function CartPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* (1) Header */}
      <div className="flex items-center gap-3">
        <ShoppingCart className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Giỏ hàng của bạn
        </h1>
      </div>

      {/* (2) Bố cục 2 cột (Dọc trên mobile, Ngang trên desktop) */}
      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        {/* --- CỘT BÊN TRÁI: DANH SÁCH SẢN PHẨM --- */}
        <div className="flex-1">
          {mockCartItems.length > 0 ? (
            <div className="flex flex-col gap-6">
              {mockCartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-primary">
                      {item.price.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                  <div className="flex flex-col items-start justify-between sm:items-end">
                    {/* Quantity Selector */}
                    <div className="flex items-center rounded-md border border-input">
                      <button className="p-2 text-muted-foreground hover:text-primary">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 border-x border-input text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button className="p-2 text-muted-foreground hover:text-primary">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    {/* Remove Button */}
                    <button className="hoverEffect mt-2 flex items-center gap-1 text-sm text-destructive hover:underline">
                      <Trash2 className="h-4 w-4" /> Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Giỏ hàng của bạn đang trống.
            </p>
          )}
        </div>

        {/* --- CỘT BÊN PHẢI: TÓM TẮT ĐƠN HÀNG --- */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">
              Tóm tắt đơn hàng
            </h2>

            {/* Vouchers (Ví dụ) */}
            <div className="mt-4">
              <label htmlFor="voucher" className="text-sm font-medium">
                Mã giảm giá
              </label>
              <div className="mt-2 flex">
                <input
                  id="voucher"
                  type="text"
                  placeholder="Nhập mã..."
                  className="flex h-10 w-full rounded-l-md border border-input bg-background px-3 py-2 text-sm"
                />
                <button className="hoverEffect rounded-r-md bg-secondary px-4 text-sm font-medium text-secondary-foreground hover:bg-secondary/90">
                  Áp dụng
                </button>
              </div>
            </div>

            {/* Chi tiết giá */}
            <div className="mt-6 space-y-3 border-t border-border pt-4">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Tạm tính</p>
                <p className="font-medium">
                  {subtotal.toLocaleString("vi-VN")}đ
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Phí vận chuyển</p>
                <p className="font-medium">
                  {shipping.toLocaleString("vi-VN")}đ
                </p>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
                <p className="text-foreground">Tổng cộng</p>
                <p className="text-foreground">
                  {total.toLocaleString("vi-VN")}đ
                </p>
              </div>
            </div>

            {/* Nút Checkout */}
            <Link
              href="/checkout"
              className="hoverEffect mt-6 flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Tiến hành thanh toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

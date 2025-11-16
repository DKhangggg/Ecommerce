// app/seller/marketing/page.tsx
import React from "react";
// import { Ticket, Megaphone, PlusCircle } from 'lucide-react';

const MarketingPage = () => {
  return (
    <div className="p-4 md:p-8 bg-background min-h-screen">
      {/* 1. HEADER & Nút hành động */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-foreground">
          Marketing & Khuyến mãi
        </h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all">
          {/* <PlusCircle className="w-5 h-5" /> */}
          Tạo Chiến dịch
        </button>
      </div>

      {/* 2. THỐNG KÊ CHIẾN DỊCH (Stat Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Vouchers */}
        <div className="bg-card p-6 rounded-xl shadow-lg border-l-4 border-chart-1">
          <p className="text-sm font-medium text-muted-foreground flex justify-between">
            Voucher đang chạy
            {/* <Ticket className="w-5 h-5 text-chart-1" /> */}
          </p>
          <h2 className="text-4xl font-bold text-card-foreground mt-1">12</h2>
          <p className="text-xs text-muted-foreground mt-2">3 sắp hết hạn</p>
        </div>

        {/* Card 2: Khuyến mãi */}
        <div className="bg-card p-6 rounded-xl shadow-lg border-l-4 border-chart-2">
          <p className="text-sm font-medium text-muted-foreground flex justify-between">
            Chương trình Giảm giá
            {/* <Megaphone className="w-5 h-5 text-chart-2" /> */}
          </p>
          <h2 className="text-4xl font-bold text-card-foreground mt-1">5</h2>
          <p className="text-xs text-muted-foreground mt-2">
            25 sản phẩm tham gia
          </p>
        </div>

        {/* Card 3: Lượt dùng */}
        <div className="bg-card p-6 rounded-xl shadow-lg border-l-4 border-chart-3">
          <p className="text-sm font-medium text-muted-foreground">
            Lượt sử dụng (7 ngày)
          </p>
          <h2 className="text-4xl font-bold text-card-foreground mt-1">
            1,504
          </h2>
          <p className="text-xs text-green-600 mt-2 font-semibold">+15%</p>
        </div>
      </div>

      {/* 3. BẢNG QUẢN LÝ VOUCHER */}
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Danh sách Voucher
      </h2>
      <div className="bg-card rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Mã Voucher
                </th>
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Loại
                </th>
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Thời gian
                </th>
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Đã dùng
                </th>
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {/* Item 1 */}
              <tr>
                <td className="p-4 text-primary font-semibold">SALE1111</td>
                <td className="p-4 text-foreground">Giảm 15% (tối đa 50k)</td>
                <td className="p-4 text-muted-foreground">11/11 - 13/11</td>
                <td className="p-4 text-foreground">150/200</td>
                <td className="p-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Đang chạy
                  </span>
                </td>
              </tr>
              {/* Item 2 */}
              <tr>
                <td className="p-4 text-primary font-semibold">FREESHIPMAX</td>
                <td className="p-4 text-foreground">Miễn phí Vận chuyển</td>
                <td className="p-4 text-muted-foreground">01/11 - 30/11</td>
                <td className="p-4 text-foreground">1050/Không giới hạn</td>
                <td className="p-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Đang chạy
                  </span>
                </td>
              </tr>
              {/* Item 3 */}
              <tr>
                <td className="p-4 text-muted-foreground font-semibold">
                  BLACKFRIDAY
                </td>
                <td className="p-4 text-muted-foreground">
                  Giảm 50% toàn shop
                </td>
                <td className="p-4 text-muted-foreground">25/11 - 27/11</td>
                <td className="p-4 text-muted-foreground">0/500</td>
                <td className="p-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                    Sắp diễn ra
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketingPage;

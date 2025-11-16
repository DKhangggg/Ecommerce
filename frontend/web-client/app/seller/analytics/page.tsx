// app/seller/analytics/page.tsx
import React from "react";
// import { CalendarDays } from "lucide-react";

const AnalyticsPage = () => {
  return (
    <div className="p-4 md:p-8 bg-background min-h-screen">
      {/* 1. HEADER: Tiêu đề & Bộ lọc ngày */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-foreground">
          Phân tích & Báo cáo
        </h1>
        <button className="flex items-center gap-2 bg-card border border-border text-foreground px-4 py-2 rounded-lg font-semibold hover:bg-muted transition-all">
          {/* <CalendarDays className="w-5 h-5 text-muted-foreground" /> */}
          28 ngày qua
        </button>
      </div>

      {/* 2. HÀNG THẺ THỐNG KÊ (LỚN HƠN DASHBOARD) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stat Card 1 */}
        <div className="bg-card p-6 rounded-xl shadow-lg">
          <p className="text-sm font-medium text-muted-foreground">
            Tổng Doanh thu
          </p>
          <h2 className="text-3xl font-bold text-foreground mt-1">
            1.234.500.000₫
          </h2>
          <p className="text-xs text-green-600 mt-2 font-semibold">+5.2%</p>
        </div>
        {/* Stat Card 2 */}
        <div className="bg-card p-6 rounded-xl shadow-lg">
          <p className="text-sm font-medium text-muted-foreground">
            Tổng Đơn hàng
          </p>
          <h2 className="text-3xl font-bold text-foreground mt-1">5.120</h2>
          <p className="text-xs text-green-600 mt-2 font-semibold">+2.1%</p>
        </div>
        {/* Stat Card 3 */}
        <div className="bg-card p-6 rounded-xl shadow-lg">
          <p className="text-sm font-medium text-muted-foreground">
            Tỷ lệ Chuyển đổi
          </p>
          <h2 className="text-3xl font-bold text-foreground mt-1">3.45%</h2>
          <p className="text-xs text-red-600 mt-2 font-semibold">-0.5%</p>
        </div>
        {/* Stat Card 4 */}
        <div className="bg-card p-6 rounded-xl shadow-lg">
          <p className="text-sm font-medium text-muted-foreground">
            Lượt truy cập
          </p>
          <h2 className="text-3xl font-bold text-foreground mt-1">150.9k</h2>
          <p className="text-xs text-green-600 mt-2 font-semibold">+10.3%</p>
        </div>
      </div>

      {/* 3. KHU VỰC BIỂU ĐỒ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biểu đồ 1: Doanh thu theo thời gian */}
        <div className="bg-card p-6 rounded-xl shadow-lg min-h-[400px]">
          <h2 className="text-xl font-bold text-card-foreground mb-4">
            Doanh thu theo thời gian
          </h2>
          <div className="flex justify-center items-center h-full text-muted-foreground">
            (Placeholder cho Biểu đồ Đường - Line Chart)
          </div>
        </div>

        {/* Biểu đồ 2: Top Sản phẩm */}
        <div className="bg-card p-6 rounded-xl shadow-lg min-h-[400px]">
          <h2 className="text-xl font-bold text-card-foreground mb-4">
            Top 5 Sản phẩm Bán chạy
          </h2>
          <div className="flex justify-center items-center h-full text-muted-foreground">
            (Placeholder cho Biểu đồ Cột - Bar Chart)
          </div>
        </div>

        {/* Biểu đồ 3: Phân loại */}
        <div className="bg-card p-6 rounded-xl shadow-lg min-h-[400px]">
          <h2 className="text-xl font-bold text-card-foreground mb-4">
            Doanh thu theo Danh mục
          </h2>
          <div className="flex justify-center items-center h-full text-muted-foreground">
            (Placeholder cho Biểu đồ Tròn - Pie Chart)
          </div>
        </div>

        {/* Biểu đồ 4: Kênh truy cập */}
        <div className="bg-card p-6 rounded-xl shadow-lg min-h-[400px]">
          <h2 className="text-xl font-bold text-card-foreground mb-4">
            Kênh truy cập
          </h2>
          <div className="flex justify-center items-center h-full text-muted-foreground">
            (Placeholder cho Biểu đồ Tròn - Donut Chart)
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

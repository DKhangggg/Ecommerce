import React from "react";

const Dashboardpage = () => {
  return (
    <div className="p-4 md:p-8 bg-background min-h-screen">
      {/* 1. TIÊU ĐỀ CHÍNH */}
      <h1 className="text-3xl font-extrabold text-foreground mb-6 border-b border-border pb-2">
        Tổng quan Bán hàng 📈
      </h1>

      {/* 2. HÀNG THẺ THỐNG KÊ (STAT CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary">
          <p className="text-sm font-medium text-muted-foreground flex justify-between items-center">
            Doanh thu hôm nay
          </p>
          <h2 className="text-4xl font-bold text-card-foreground mt-1">
            45.500.000₫
          </h2>

          <p className="text-xs text-chart-1 mt-2 font-semibold">
            +12% so với hôm qua
          </p>
        </div>

        {/* Box 2: Đơn hàng */}
        <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-secondary">
          <p className="text-sm font-medium text-muted-foreground flex justify-between items-center">
            Đơn hàng cần xử lý
          </p>
          <h2 className="text-4xl font-bold text-card-foreground mt-1">254</h2>
          <p className="text-xs text-destructive mt-2 font-semibold">
            5 đơn bị hủy tuần này
          </p>
        </div>

        {/* Box 3: Sản phẩm */}
        <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-accent">
          <p className="text-sm font-medium text-muted-foreground flex justify-between items-center">
            Sản phẩm đang bán
          </p>
          <h2 className="text-4xl font-bold text-card-foreground mt-1">
            1.234
          </h2>
          <p className="text-xs text-muted-foreground mt-2 font-semibold">
            Cần cập nhật 15 sản phẩm
          </p>
        </div>
      </div>

      {/* 3. KHU VỰC CHART/TABLE LỚN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Box 4 (Chiếm 2/3): Biểu đồ chính */}
        <div className="lg:col-span-2 bg-card p-6 rounded-xl shadow-md min-h-[350px]">
          <h2 className="text-xl font-bold text-card-foreground mb-4">
            Phân tích Doanh thu 7 ngày
          </h2>
          <p className="text-muted-foreground">
            Khu vực này dùng để đặt biểu đồ (Chart Placeholder)
          </p>
        </div>

        {/* Box 5 (Chiếm 1/3): Hoạt động gần đây */}
        <div className="lg:col-span-1 bg-card p-6 rounded-xl shadow-md min-h-[350px]">
          <h2 className="text-xl font-bold text-card-foreground mb-4">
            Hoạt động gần nhất
          </h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>✅ Đơn hàng #1005 (1h trước)</li>
            <li>📦 Sản phẩm mới được đăng (2h trước)</li>
            <li>💬 Phản hồi đánh giá mới (3h trước)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboardpage;

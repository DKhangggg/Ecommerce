// app/seller/orders/page.tsx
import React from "react";
// import { FileText } from "lucide-react";

const OrdersPage = () => {
  return (
    <div className="p-4 md:p-8 bg-background min-h-screen">
      {/* 1. HEADER */}
      <h1 className="text-3xl font-extrabold text-foreground mb-6">
        Quản lý Đơn hàng
      </h1>

      {/* 2. THANH LỌC & TÌM KIẾM */}
      <div className="bg-card p-4 rounded-xl shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Tìm theo Mã đơn hàng..."
            className="p-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select className="p-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Lọc Trạng thái</option>
            <option>Chờ xử lý</option>
            <option>Đang giao</option>
            <option>Hoàn thành</option>
            <option>Đã hủy</option>
          </select>
          <input
            type="date"
            className="p-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            title="Từ ngày"
          />
          <input
            type="date"
            className="p-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            title="Đến ngày"
          />
        </div>
      </div>

      {/* 3. BẢNG DỮ LIỆU ĐƠN HÀNG */}
      <div className="bg-card rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            {/* Tiêu đề bảng */}
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Mã ĐH
                </th>
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Khách hàng
                </th>
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Ngày đặt
                </th>
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Tổng tiền
                </th>
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Trạng thái
                </th>
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Hành động
                </th>
              </tr>
            </thead>

            {/* Nội dung bảng */}
            <tbody className="divide-y divide-border">
              {/* Vòng lặp item 1 */}
              <tr>
                <td className="p-4 font-mono text-primary font-semibold">
                  #1005
                </td>
                <td className="p-4 text-foreground">Nguyễn Văn A</td>
                <td className="p-4 text-muted-foreground">15/11/2025</td>
                <td className="p-4 text-foreground font-semibold">
                  1.250.000₫
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Hoàn thành
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-muted-foreground hover:text-primary">
                    {/* <FileText className="w-5 h-5" /> */}
                    Xem
                  </button>
                </td>
              </tr>
              {/* Vòng lặp item 2 */}
              <tr>
                <td className="p-4 font-mono text-primary font-semibold">
                  #1004
                </td>
                <td className="p-4 text-foreground">Trần Thị B</td>
                <td className="p-4 text-muted-foreground">14/11/2025</td>
                <td className="p-4 text-foreground font-semibold">850.000₫</td>
                <td className="p-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Chờ xử lý
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-muted-foreground hover:text-primary">
                    {/* <FileText className="w-5 h-5" /> */}
                    Xem
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

// app/seller/products/page.tsx
import React from "react";
// Ví dụ dùng icon
// import { PlusCircle, Search, MoreVertical } from "lucide-react";

const ProductsPage = () => {
  return (
    <div className="p-4 md:p-8 bg-background min-h-screen">
      {/* 1. HEADER: Tiêu đề & Nút Thêm mới */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-foreground">
          Sản phẩm của tôi
        </h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all">
          {/* <PlusCircle className="w-5 h-5" /> */}
          Thêm Sản phẩm
        </button>
      </div>

      {/* 2. THANH LỌC & TÌM KIẾM */}
      <div className="bg-card p-4 rounded-xl shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="p-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select className="p-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Lọc theo Danh mục</option>
            <option>Điện tử</option>
            <option>Gia dụng</option>
          </select>
          <select className="p-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Lọc theo Trạng thái</option>
            <option>Đang bán</option>
            <option>Hết hàng</option>
          </select>
        </div>
      </div>

      {/* 3. BẢNG DỮ LIỆU SẢN PHẨM */}
      <div className="bg-card rounded-xl shadow-lg overflow-hidden">
        {/* Thêm overflow-x-auto để cuộn ngang trên mobile */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            {/* Tiêu đề bảng */}
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Sản phẩm
                </th>
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Giá
                </th>
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Tồn kho
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
                <td className="p-4 flex items-center gap-3">
                  <img
                    src="https://via.placeholder.com/60"
                    alt="Product"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">
                      Điện thoại XYZ
                    </p>
                    <p className="text-sm text-muted-foreground">SKU: 12345</p>
                  </div>
                </td>
                <td className="p-4 text-foreground font-semibold">
                  15.000.000₫
                </td>
                <td className="p-4 text-foreground">150</td>
                <td className="p-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Đang bán
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-muted-foreground hover:text-primary">
                    {/* <MoreVertical className="w-5 h-5" /> */}
                    Chi tiết
                  </button>
                </td>
              </tr>
              {/* Vòng lặp item 2 */}
              <tr>
                <td className="p-4 flex items-center gap-3">
                  <img
                    src="https://via.placeholder.com/60"
                    alt="Product"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Laptop ABC</p>
                    <p className="text-sm text-muted-foreground">SKU: 67890</p>
                  </div>
                </td>
                <td className="p-4 text-foreground font-semibold">
                  25.000.000₫
                </td>
                <td className="p-4 text-foreground">0</td>
                <td className="p-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    Hết hàng
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-muted-foreground hover:text-primary">
                    {/* <MoreVertical className="w-5 h-5" /> */}
                    Chi tiết
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

export default ProductsPage;

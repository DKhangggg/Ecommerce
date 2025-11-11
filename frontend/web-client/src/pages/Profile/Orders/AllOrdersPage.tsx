import { Package } from "lucide-react";

export default function AllOrdersPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 rounded-full p-4 flex items-center justify-center mb-4 bg-gradient-to-br from-[#f7e6ca] to-[#e8d59e]">
        <Package className="w-8 h-8 text-[#ad9c8e]" />
      </div>
      <p className="text-sm text-gray-600 mb-2">Chưa có đơn hàng nào</p>
      <p className="text-sm text-gray-400 mb-4">Bắt đầu mua sắm ngay!</p>
      <button className="px-4 py-2 rounded-md bg-gradient-to-br from-[#e8d59e] to-[#d9bbb0] text-[#2b2b2b] font-medium">
        Khám phá sản phẩm
      </button>
    </div>
  );
}

import { CheckCircle } from "lucide-react";

export default function CompletedOrdersPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 rounded-full p-4 flex items-center justify-center mb-4 bg-gradient-to-br from-[#f0fdf4] to-[#bbf7d0]">
        <CheckCircle className="w-8 h-8 text-[#22c55e]" />
      </div>
      <p className="text-sm text-gray-600 mb-2">Không có đơn hàng hoàn thành</p>
      <p className="text-sm text-gray-400">
        Các đơn hàng đã giao thành công sẽ hiển thị ở đây
      </p>
    </div>
  );
}

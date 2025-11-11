import { Clock } from "lucide-react";

export default function PendingOrdersPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 rounded-full p-4 flex items-center justify-center mb-4 bg-gradient-to-br from-[#fff7ed] to-[#fed7aa]">
        <Clock className="w-8 h-8 text-[#f97316]" />
      </div>
      <p className="text-sm text-gray-600 mb-2">
        Không có đơn hàng chờ xác nhận
      </p>
      <p className="text-sm text-gray-400">
        Các đơn hàng chưa được xác nhận sẽ hiển thị ở đây
      </p>
    </div>
  );
}

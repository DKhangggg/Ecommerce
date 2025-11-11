import { XCircle } from "lucide-react";

export default function CancelledOrdersPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 rounded-full p-4 flex items-center justify-center mb-4 bg-gradient-to-br from-[#fef2f2] to-[#fecaca]">
        <XCircle className="w-8 h-8 text-[#ef4444]" />
      </div>
      <p className="text-sm text-gray-600 mb-2">Không có đơn hàng bị hủy</p>
      <p className="text-sm text-gray-400">
        Các đơn hàng đã bị hủy sẽ hiển thị ở đây
      </p>
    </div>
  );
}

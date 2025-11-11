import { Truck } from "lucide-react";

export default function DeliveringOrdersPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 rounded-full p-4 flex items-center justify-center mb-4 bg-gradient-to-br from-[#eef2ff] to-[#c7d2fe]">
        <Truck className="w-8 h-8 text-[#6366f1]" />
      </div>
      <p className="text-sm text-gray-600 mb-2">Không có đơn hàng đang giao</p>
      <p className="text-sm text-gray-400">
        Đơn hàng đang trên đường đến bạn sẽ xuất hiện ở đây
      </p>
    </div>
  );
}

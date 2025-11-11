import { Truck } from "lucide-react";

export default function ShippingOrdersPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 rounded-full p-4 flex items-center justify-center mb-4 bg-gradient-to-br from-[#eff6ff] to-[#bfdbfe]">
        <Truck className="w-8 h-8 text-[#3b82f6]" />
      </div>
      <p className="text-sm text-gray-600 mb-2">
        Không có đơn hàng đang vận chuyển
      </p>
      <p className="text-sm text-gray-400">
        Các đơn hàng đã được đóng gói và chờ vận chuyển sẽ hiển thị ở đây
      </p>
    </div>
  );
}

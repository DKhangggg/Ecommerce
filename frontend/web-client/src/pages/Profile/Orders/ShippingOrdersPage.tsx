import { Truck } from "lucide-react";

/**
 * ShippingOrdersPage Component
 *
 * Displays orders currently being shipped
 */
export default function ShippingOrdersPage() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center py-12 md:py-16">
      <div className="bg-blue-50 rounded-full p-6 mb-4">
        <Truck className="w-12 h-12 text-blue-500" />
      </div>
      <p className="text-gray-500 text-sm md:text-base text-center">
        Không có đơn hàng đang vận chuyển
      </p>
      <p className="text-gray-400 text-xs md:text-sm text-center mt-2">
        Các đơn hàng đã được đóng gói và chờ vận chuyển sẽ hiển thị ở đây
      </p>
    </div>
  );
}

import { Clock } from "lucide-react";

/**
 * PendingOrdersPage Component
 *
 * Displays orders waiting for confirmation
 */
export default function PendingOrdersPage() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center py-12 md:py-16">
      <div className="bg-orange-50 rounded-full p-6 mb-4">
        <Clock className="w-12 h-12 text-orange-500" />
      </div>
      <p className="text-gray-500 text-sm md:text-base text-center">
        Không có đơn hàng chờ xác nhận
      </p>
      <p className="text-gray-400 text-xs md:text-sm text-center mt-2">
        Các đơn hàng chưa được xác nhận sẽ hiển thị ở đây
      </p>
    </div>
  );
}

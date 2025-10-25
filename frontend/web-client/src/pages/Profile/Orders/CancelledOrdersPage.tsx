import { XCircle } from "lucide-react";

/**
 * CancelledOrdersPage Component
 *
 * Displays cancelled orders
 */
export default function CancelledOrdersPage() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center py-12 md:py-16">
      <div className="bg-red-50 rounded-full p-6 mb-4">
        <XCircle className="w-12 h-12 text-red-500" />
      </div>
      <p className="text-gray-500 text-sm md:text-base text-center">
        Không có đơn hàng bị hủy
      </p>
      <p className="text-gray-400 text-xs md:text-sm text-center mt-2">
        Các đơn hàng đã bị hủy sẽ hiển thị ở đây
      </p>
    </div>
  );
}

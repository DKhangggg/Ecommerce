import { CheckCircle } from "lucide-react";

/**
 * CompletedOrdersPage Component
 *
 * Displays completed/delivered orders
 */
export default function CompletedOrdersPage() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center py-12 md:py-16">
      <div className="bg-green-50 rounded-full p-6 mb-4">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>
      <p className="text-gray-500 text-sm md:text-base text-center">
        Không có đơn hàng hoàn thành
      </p>
      <p className="text-gray-400 text-xs md:text-sm text-center mt-2">
        Các đơn hàng đã giao thành công sẽ hiển thị ở đây
      </p>
    </div>
  );
}

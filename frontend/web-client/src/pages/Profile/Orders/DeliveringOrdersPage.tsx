import { PackageCheck } from "lucide-react";

/**
 * DeliveringOrdersPage Component
 *
 * Displays orders currently out for delivery
 */
export default function DeliveringOrdersPage() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center py-12 md:py-16">
      <div className="bg-indigo-50 rounded-full p-6 mb-4">
        <PackageCheck className="w-12 h-12 text-indigo-500" />
      </div>
      <p className="text-gray-500 text-sm md:text-base text-center">
        Không có đơn hàng đang giao
      </p>
      <p className="text-gray-400 text-xs md:text-sm text-center mt-2">
        Các đơn hàng đang trên đường giao đến bạn sẽ hiển thị ở đây
      </p>
    </div>
  );
}

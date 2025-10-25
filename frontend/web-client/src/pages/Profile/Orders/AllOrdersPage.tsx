import { Package } from "lucide-react";

/**
 * AllOrdersPage Component
 *
 * Displays all orders regardless of status
 */
export default function AllOrdersPage() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center py-12 md:py-16">
      <div className="bg-gray-50 rounded-full p-6 mb-4">
        <Package className="w-12 h-12 text-gray-400" />
      </div>
      <p className="text-gray-500 text-sm md:text-base text-center">
        Chưa có đơn hàng nào
      </p>
      <p className="text-gray-400 text-xs md:text-sm text-center mt-2">
        Bắt đầu mua sắm ngay!
      </p>
      <button className="mt-6 px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
        Khám phá sản phẩm
      </button>
    </div>
  );
}

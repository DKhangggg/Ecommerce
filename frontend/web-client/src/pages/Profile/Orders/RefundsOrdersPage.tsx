import { RefreshCcw } from "lucide-react";

export default function RefundsOrdersPage() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center py-12 md:py-16">
      <div className="bg-purple-50 rounded-full p-6 mb-4">
        <RefreshCcw className="w-12 h-12 text-purple-500" />
      </div>
      <p className="text-gray-500 text-sm md:text-base text-center">
        Không có yêu cầu trả hàng/hoàn tiền
      </p>
      <p className="text-gray-400 text-xs md:text-sm text-center mt-2">
        Các yêu cầu trả hàng và hoàn tiền sẽ hiển thị ở đây
      </p>
    </div>
  );
}

import { RefreshCcw } from "lucide-react";

export default function RefundsOrdersPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 rounded-full p-4 flex items-center justify-center mb-4 bg-gradient-to-br from-[#faf5ff] to-[#e9d5ff]">
        <RefreshCcw className="w-8 h-8 text-[#a855f7]" />
      </div>
      <p className="text-sm text-gray-600 mb-2">
        Không có yêu cầu trả hàng/hoàn tiền
      </p>
      <p className="text-sm text-gray-400">
        Các yêu cầu trả hàng và hoàn tiền sẽ hiển thị ở đây
      </p>
    </div>
  );
}

import { Ticket, Gift, Percent, Clock } from "lucide-react";

export default function VouchersPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#111827]">
            Kho Voucher
          </h1>
          <button className="px-4 py-2 text-sm font-medium text-[#ad9c8e] border border-[#d9bbb0] rounded-lg bg-white hover:bg-gradient-to-br hover:from-[#e8d59e] hover:to-[#d9bbb0]">
            Tìm voucher
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-[#e8d59e] to-[#d9bbb0] text-[#111827] shadow-sm">
            Tất cả
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600">
            Giảm giá
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600">
            Miễn phí ship
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600">
            Hoàn xu
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg p-5 overflow-hidden relative bg-gradient-to-br from-[#f7e6ca] to-[#e8d59e] border border-[#e8d59e] hover:shadow-lg transition-transform transform hover:-translate-y-1">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center shadow-sm">
                <Percent className="text-[#ad9c8e] w-8 h-8" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg">Giảm 50.000đ</h3>
              <p className="text-sm text-gray-600">Đơn tối thiểu 300.000đ</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <Clock className="w-4 h-4" /> <span>HSD: 31/12/2025</span>
              </div>
            </div>
          </div>
          <div className="mt-4 border-t pt-3">
            <button className="w-full py-2 rounded-md bg-gradient-to-br from-[#d9bbb0] to-[#ad9c8e] text-white font-semibold">
              Sử dụng ngay
            </button>
          </div>
        </div>

        <div className="rounded-lg p-5 overflow-hidden relative bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] border border-[#bfdbfe] hover:shadow-lg transition-transform transform hover:-translate-y-1">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center shadow-sm">
                <Gift className="text-[#3b82f6] w-8 h-8" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg">Miễn phí vận chuyển</h3>
              <p className="text-sm text-gray-600">Không giới hạn đơn hàng</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <Clock className="w-4 h-4" /> <span>HSD: 25/11/2025</span>
              </div>
            </div>
          </div>
          <div className="mt-4 border-t pt-3">
            <button className="w-full py-2 rounded-md bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white font-semibold">
              Sử dụng ngay
            </button>
          </div>
        </div>

        <div className="rounded-lg p-5 overflow-hidden relative bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] border border-[#bbf7d0] hover:shadow-lg transition-transform transform hover:-translate-y-1">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center shadow-sm">
                <Ticket className="text-[#16a34a] w-8 h-8" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg">Giảm 15%</h3>
              <p className="text-sm text-gray-600">Giảm tối đa 100.000đ</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <Clock className="w-4 h-4" /> <span>HSD: 20/12/2025</span>
              </div>
            </div>
          </div>
          <div className="mt-4 border-t pt-3">
            <button className="w-full py-2 rounded-md bg-gradient-to-br from-[#16a34a] to-[#15803d] text-white font-semibold">
              Sử dụng ngay
            </button>
          </div>
        </div>

        <div className="rounded-lg p-5 overflow-hidden relative bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] border border-[#e9d5ff] hover:shadow-lg transition-transform transform hover:-translate-y-1">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center shadow-sm">
                <Gift className="text-[#9333ea] w-8 h-8" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg">Hoàn 50 Xu</h3>
              <p className="text-sm text-gray-600">Đơn tối thiểu 200.000đ</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <Clock className="w-4 h-4" /> <span>HSD: 15/01/2026</span>
              </div>
            </div>
          </div>
          <div className="mt-4 border-t pt-3">
            <button className="w-full py-2 rounded-md bg-gradient-to-br from-[#9333ea] to-[#7e22ce] text-white font-semibold">
              Sử dụng ngay
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg p-6 bg-gradient-to-br from-[#f7e6ca] to-[#e8d59e] border border-[#e8d59e] text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mx-auto mb-4">
          <Ticket className="text-[#d9bbb0] w-8 h-8" />
        </div>
        <p className="text-gray-700 font-medium mb-2">
          Không còn voucher nào khác
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Hãy quay lại sau để nhận thêm ưu đãi
        </p>
        <button className="px-4 py-2 bg-gradient-to-br from-[#d9bbb0] to-[#ad9c8e] text-white rounded-md">
          Khám phá voucher mới
        </button>
      </div>
    </div>
  );
}

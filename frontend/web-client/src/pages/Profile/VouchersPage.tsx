import { Ticket, Gift, Percent, Clock } from "lucide-react";

export default function VouchersPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Kho Voucher
          </h1>
          <button className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
            Tìm voucher
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium whitespace-nowrap">
            Tất cả
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-gray-200 transition-colors">
            Giảm giá
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-gray-200 transition-colors">
            Miễn phí ship
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-gray-200 transition-colors">
            Hoàn xu
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-200">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Percent className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base mb-1">
                Giảm 50.000đ
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Đơn tối thiểu 300.000đ
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>HSD: 31/12/2025</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-orange-200/50">
            <button className="w-full py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              Sử dụng ngay
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-200">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Gift className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base mb-1">
                Miễn phí vận chuyển
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Không giới hạn đơn hàng
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>HSD: 25/11/2025</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200/50">
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Sử dụng ngay
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-200">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Ticket className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base mb-1">
                Giảm 15%
              </h3>
              <p className="text-sm text-gray-600 mb-3">Giảm tối đa 100.000đ</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>HSD: 20/12/2025</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-green-200/50">
            <button className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
              Sử dụng ngay
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-200">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Gift className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base mb-1">
                Hoàn 50 Xu
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Đơn tối thiểu 200.000đ
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>HSD: 15/01/2026</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-purple-200/50">
            <button className="w-full py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
              Sử dụng ngay
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
          <Ticket className="w-8 h-8 text-gray-300" />
        </div>
        <p className="text-gray-500 text-sm mb-1">Không còn voucher nào khác</p>
        <p className="text-gray-400 text-xs mb-5">
          Hãy quay lại sau để nhận thêm ưu đãi
        </p>
        <button className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
          Khám phá voucher mới
        </button>
      </div>
    </div>
  );
}

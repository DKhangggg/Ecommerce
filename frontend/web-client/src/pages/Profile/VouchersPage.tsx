import { Ticket } from "lucide-react";

/**
 * VouchersPage Component
 *
 * Displays user's voucher collection in Shopee style
 * Shows empty state when no vouchers are available
 */
export default function VouchersPage() {
  return (
    <div className="w-full h-auto">
      {/* Page Header */}
      <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-6">
        Kho Voucher
      </h2>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-12 md:py-16">
        <div className="bg-gray-50 rounded-full p-6 mb-4">
          <Ticket className="w-12 h-12 text-gray-400" />
        </div>
        <p className="text-gray-500 text-sm md:text-base text-center">
          Bạn chưa có voucher nào
        </p>
        <p className="text-gray-400 text-xs md:text-sm text-center mt-2">
          Voucher của bạn sẽ được lưu tại đây
        </p>
        <button className="mt-6 px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          Khám phá Voucher
        </button>
      </div>

      {/* TODO: Add voucher grid when data is available */}
      {/* Example voucher structure:
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vouchers.map((voucher) => (
          <div key={voucher.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <Ticket className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm">{voucher.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{voucher.description}</p>
                <p className="text-xs text-gray-400 mt-2">HSD: {voucher.expiry}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      */}
    </div>
  );
}

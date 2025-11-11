import {
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  Star,
  Gift,
  TrendingUp,
} from "lucide-react";

export default function CartPage() {
  const coinBalance = 2450;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <header className="">
        <h1 className="text-2xl font-semibold">Cart</h1>
      </header>

      <section className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Số dư hiện tại</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-bold">
                {coinBalance.toLocaleString()}
              </h2>
              <span className="text-sm text-gray-500">Xu</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
            <Coins className="w-6 h-6 text-yellow-500" />
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 rounded bg-gradient-to-br from-[#e8d59e] to-[#d9bbb0] text-sm font-medium">
            Lịch sử
          </button>
          <button className="px-4 py-2 rounded border border-gray-200 text-sm text-gray-700">
            Quy đổi Xu
          </button>
        </div>
      </section>

      <section className="">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Lịch Sử Giao Dịch</h3>
          <button className="text-sm text-indigo-600">Xem tất cả</button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mr-3">
              <ArrowUpRight className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">Hoàn thành đơn hàng</h4>
              <p className="text-xs text-gray-400">25/10/2025 - 14:30</p>
            </div>
            <div className="text-sm font-semibold text-green-600">+150</div>
          </div>

          <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mr-3">
              <ArrowDownRight className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">Đổi voucher giảm giá</h4>
              <p className="text-xs text-gray-400">24/10/2025 - 10:15</p>
            </div>
            <div className="text-sm font-semibold text-red-500">-200</div>
          </div>

          <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mr-3">
              <ArrowUpRight className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">Viết đánh giá sản phẩm</h4>
              <p className="text-xs text-gray-400">23/10/2025 - 16:45</p>
            </div>
            <div className="text-sm font-semibold text-green-600">+50</div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
          </div>
          <h3 className="text-lg font-medium">Cách Kiếm Xu</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#fff7ed] to-[#fed7aa] flex items-center justify-center mb-3">
              <ShoppingBag className="w-6 h-6 text-orange-500" />
            </div>
            <h4 className="text-sm font-medium">Hoàn thành đơn hàng</h4>
            <p className="text-xs text-gray-500 mt-1">
              Nhận Xu khi mua sắm và hoàn thành đơn hàng thành công
            </p>
            <div className="mt-3 inline-block text-sm font-semibold bg-gray-100 rounded px-2 py-1">
              +50 - 200 Xu
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ecfccb] to-[#bbf7d0] flex items-center justify-center mb-3">
              <Star className="w-6 h-6 text-green-500" />
            </div>
            <h4 className="text-sm font-medium">Viết đánh giá</h4>
            <p className="text-xs text-gray-500 mt-1">
              Nhận Xu khi đánh giá sản phẩm và chia sẻ trải nghiệm
            </p>
            <div className="mt-3 inline-block text-sm font-semibold bg-gray-100 rounded px-2 py-1">
              +20 - 100 Xu
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#faf5ff] to-[#e9d5ff] flex items-center justify-center mb-3">
              <Gift className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="text-sm font-medium">Tham gia sự kiện</h4>
            <p className="text-xs text-gray-500 mt-1">
              Nhận thưởng Xu khi tham gia các chương trình khuyến mãi
            </p>
            <div className="mt-3 inline-block text-sm font-semibold bg-gray-100 rounded px-2 py-1">
              +100 - 500 Xu
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Coins, Gift } from "lucide-react";

/**
 * CoinsPage Component
 *
 * Displays user's Shopee Xu (coins) balance and transaction history
 * Shows empty state when no transactions are available
 */
export default function CoinsPage() {
  // Mock data - replace with actual data from API
  const coinBalance = 0;

  return (
    <div className="w-full h-auto space-y-4">
      {/* Coin Balance Card */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-6 rounded-xl shadow-sm border border-orange-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-white rounded-full p-3">
            <Coins className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-gray-600 text-xs md:text-sm">Số dư Shopee Xu</p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              {coinBalance.toLocaleString()}
            </h2>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-white text-primary border border-primary py-2 px-4 rounded-lg text-xs md:text-sm font-medium hover:bg-primary hover:text-white transition-colors">
            Lịch sử giao dịch
          </button>
          <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-xs md:text-sm font-medium hover:opacity-90 transition-opacity">
            Quy đổi Xu
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-4">
          Lịch Sử Giao Dịch
        </h3>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-12 md:py-16">
          <div className="bg-gray-50 rounded-full p-6 mb-4">
            <Gift className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm md:text-base text-center">
            Chưa có giao dịch nào
          </p>
          <p className="text-gray-400 text-xs md:text-sm text-center mt-2">
            Lịch sử nhận và sử dụng Shopee Xu sẽ được hiển thị tại đây
          </p>
        </div>

        {/* TODO: Add transaction list when data is available */}
        {/* Example transaction structure:
        <div className="space-y-3">
          {transactions.map((txn) => (
            <div key={txn.id} className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`flex-shrink-0 rounded-full p-2 ${
                txn.type === 'earn' ? 'bg-green-50' : 'bg-red-50'
              }`}>
                {txn.type === 'earn' ? (
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 text-sm">{txn.description}</h4>
                <span className="text-gray-400 text-xs">{txn.date}</span>
              </div>
              <div className={`font-semibold text-sm ${
                txn.type === 'earn' ? 'text-green-600' : 'text-red-600'
              }`}>
                {txn.type === 'earn' ? '+' : '-'}{txn.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        */}
      </div>

      {/* How to Earn Coins */}
      <div className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-4">
          Cách Nhận Shopee Xu
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">1</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 text-sm">
                Hoàn thành đơn hàng
              </h4>
              <p className="text-gray-600 text-xs mt-1">
                Nhận Xu khi mua sắm và hoàn thành đơn hàng thành công
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">2</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 text-sm">
                Tham gia sự kiện
              </h4>
              <p className="text-gray-600 text-xs mt-1">
                Nhận thưởng Xu khi tham gia các chương trình khuyến mãi
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">3</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 text-sm">
                Viết đánh giá
              </h4>
              <p className="text-gray-600 text-xs mt-1">
                Nhận Xu khi đánh giá sản phẩm đã mua
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

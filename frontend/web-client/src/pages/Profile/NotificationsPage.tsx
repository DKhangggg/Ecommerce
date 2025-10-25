import { Bell } from "lucide-react";

/**
 * NotificationsPage Component
 *
 * Displays user notifications in Shopee style
 * Shows empty state when no notifications are available
 */
export default function NotificationsPage() {
  return (
    <div className="w-full h-auto">
      {/* Page Header */}
      <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-6">
        Thông Báo
      </h2>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-12 md:py-16">
        <div className="bg-gray-50 rounded-full p-6 mb-4">
          <Bell className="w-12 h-12 text-gray-400" />
        </div>
        <p className="text-gray-500 text-sm md:text-base text-center">
          Hiện chưa có thông báo nào
        </p>
        <p className="text-gray-400 text-xs md:text-sm text-center mt-2">
          Các thông báo về đơn hàng và khuyến mãi sẽ được hiển thị tại đây
        </p>
      </div>

      {/* TODO: Add notification list when data is available */}
      {/* Example notification structure:
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div key={notif.id} className="flex gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <div className="flex-shrink-0">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800 text-sm">{notif.title}</h4>
              <p className="text-gray-600 text-xs mt-1">{notif.message}</p>
              <span className="text-gray-400 text-xs mt-2 block">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
      */}
    </div>
  );
}

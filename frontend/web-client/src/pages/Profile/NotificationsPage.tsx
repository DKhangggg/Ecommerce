import { Bell, X, Clock } from "lucide-react";

type NotificationType =
  | "new_user"
  | "message"
  | "comment"
  | "connect"
  | "promotion"
  | "system";

interface Notification {
  id: string;
  type: NotificationType;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  author: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationItemProps {
  notification: Notification;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "new_user",
    badge: "Joined New User",
    badgeColor: "green",
    title: "New Registration: Finibus Bonorum et Malorum",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    author: "Allen Deu",
    timestamp: "24 Nov 2018 at 9:30 AM",
    isRead: false,
  },
  {
    id: "2",
    type: "message",
    badge: "Message",
    badgeColor: "orange",
    title: "Darren Smith sent new message",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    author: "Darren",
    timestamp: "24 Nov 2018 at 9:30 AM",
    isRead: false,
  },
  {
    id: "3",
    type: "comment",
    badge: "Comment",
    badgeColor: "purple",
    title: "Arin Gansihram Commented on post",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    author: "Arin Gansihram",
    timestamp: "24 Nov 2018 at 9:30 AM",
    isRead: false,
  },
  {
    id: "4",
    type: "connect",
    badge: "Connect",
    badgeColor: "cyan",
    title: "Juliet Den Connect Allen Depk",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    author: "Juliet Den",
    timestamp: "24 Nov 2018 at 9:30 AM",
    isRead: false,
  },
  {
    id: "5",
    type: "connect",
    badge: "Connect",
    badgeColor: "cyan",
    title: "Juliet Den Connect Allen Depk",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    author: "Juliet Den",
    timestamp: "24 Nov 2018 at 9:30 AM",
    isRead: true,
  },
  {
    id: "6",
    type: "message",
    badge: "Message",
    badgeColor: "orange",
    title: "Darren Smith sent new message",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    author: "Juliet Den",
    timestamp: "24 Nov 2018 at 9:30 AM",
    isRead: true,
  },
];

function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <div
      className={`flex gap-4 p-4 border-b last:border-b-0 rounded-md transition-colors ${
        notification.isRead ? "bg-white" : "bg-[rgba(255,251,245,1)]"
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-md ${
              notification.badgeColor === "green"
                ? "bg-gradient-to-br from-[#10b981] to-[#059669] text-white"
                : ""
            } ${
              notification.badgeColor === "orange"
                ? "bg-gradient-to-br from-[#e8d59e] to-[#d9bbb0] text-[#2b2b2b]"
                : ""
            } ${
              notification.badgeColor === "purple"
                ? "bg-gradient-to-br from-[#a855f7] to-[#9333ea] text-white"
                : ""
            } ${
              notification.badgeColor === "cyan"
                ? "bg-gradient-to-br from-[#06b6d4] to-[#0891b2] text-white"
                : ""
            }`}
          >
            {notification.badge}
          </span>
          <span className="text-xs font-medium text-[#ef4444]">
            {notification.author}
          </span>
        </div>

        <div className="mb-2">
          <h3
            className={`text-sm ${
              notification.isRead
                ? "font-medium text-[#374151]"
                : "font-semibold text-[#111827]"
            }`}
          >
            {notification.title}
          </h3>
          <p
            className={`text-sm ${
              notification.isRead ? "text-gray-500" : "text-gray-700"
            }`}
          >
            {notification.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 min-w-[120px]">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{notification.timestamp}</span>
        </div>
        <button className="w-7 h-7 rounded-md bg-gray-100 text-gray-600 hover:bg-rose-100 hover:text-rose-600">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const hasNotifications = notifications.length > 0;

  return (
    <div className="w-full">
      <div className="pb-4 mb-4 border-b">
        <h1 className="text-2xl font-semibold">Danh Sách Thông Báo</h1>
      </div>

      {hasNotifications ? (
        <div className="flex flex-col gap-3">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-md p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold">Không có thông báo</h3>
          <p className="text-sm text-gray-500">
            Các thông báo mới sẽ xuất hiện ở đây
          </p>
        </div>
      )}
    </div>
  );
}

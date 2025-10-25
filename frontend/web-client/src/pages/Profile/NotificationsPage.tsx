import { Bell, X, Clock } from "lucide-react";
import "./NotificationsPage.css";

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
  const itemClass = notification.isRead
    ? "notification-item notification-item--read"
    : "notification-item notification-item--unread";

  return (
    <div className={itemClass}>
      <div className="notification-item__content">
        <div className="notification-item__meta">
          <span
            className={`notification-item__badge notification-item__badge--${notification.badgeColor}`}
          >
            {notification.badge}
          </span>
          <span className="notification-item__author">
            {notification.author}
          </span>
        </div>

        <div className="notification-item__body">
          <h3 className="notification-item__title">{notification.title}</h3>
          <p className="notification-item__description">
            {notification.description}
          </p>
        </div>
      </div>

      <div className="notification-item__actions">
        <div className="notification-item__timestamp">
          <Clock className="notification-item__clock-icon" />
          <span>{notification.timestamp}</span>
        </div>

        <button className="notification-item__delete-btn">
          <X className="notification-item__delete-icon" />
        </button>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const hasNotifications = notifications.length > 0;

  return (
    <div className="notification-page">
      <div className="notification-header">
        <h1 className="notification-header__title">Danh Sách Thông Báo</h1>
      </div>

      {hasNotifications ? (
        <div className="notification-list">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      ) : (
        <div className="notification-empty">
          <div className="notification-empty__icon-wrapper">
            <Bell className="notification-empty__icon" />
          </div>
          <h3 className="notification-empty__title">Không có thông báo</h3>
          <p className="notification-empty__text">
            Các thông báo mới sẽ xuất hiện ở đây
          </p>
        </div>
      )}
    </div>
  );
}

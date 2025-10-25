import { Clock } from "lucide-react";
import "./OrderStatusPage.css";

export default function PendingOrdersPage() {
  return (
    <div className="order-status-page">
      <div className="order-status-page__icon-wrapper order-status-page__icon-wrapper--pending">
        <Clock className="order-status-page__icon order-status-page__icon--pending" />
      </div>
      <p className="order-status-page__title">Không có đơn hàng chờ xác nhận</p>
      <p className="order-status-page__description">
        Các đơn hàng chưa được xác nhận sẽ hiển thị ở đây
      </p>
    </div>
  );
}

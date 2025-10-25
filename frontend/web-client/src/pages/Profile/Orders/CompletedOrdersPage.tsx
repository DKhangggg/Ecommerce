import { CheckCircle } from "lucide-react";
import "./OrderStatusPage.css";

export default function CompletedOrdersPage() {
  return (
    <div className="order-status-page">
      <div className="order-status-page__icon-wrapper order-status-page__icon-wrapper--completed">
        <CheckCircle className="order-status-page__icon order-status-page__icon--completed" />
      </div>
      <p className="order-status-page__title">Không có đơn hàng hoàn thành</p>
      <p className="order-status-page__description">
        Các đơn hàng đã giao thành công sẽ hiển thị ở đây
      </p>
    </div>
  );
}

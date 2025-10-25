import { XCircle } from "lucide-react";
import "./OrderStatusPage.css";

export default function CancelledOrdersPage() {
  return (
    <div className="order-status-page">
      <div className="order-status-page__icon-wrapper order-status-page__icon-wrapper--cancelled">
        <XCircle className="order-status-page__icon order-status-page__icon--cancelled" />
      </div>
      <p className="order-status-page__title">Không có đơn hàng bị hủy</p>
      <p className="order-status-page__description">
        Các đơn hàng đã bị hủy sẽ hiển thị ở đây
      </p>
    </div>
  );
}

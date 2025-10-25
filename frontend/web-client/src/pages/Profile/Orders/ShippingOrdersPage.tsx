import { Truck } from "lucide-react";
import "./OrderStatusPage.css";

export default function ShippingOrdersPage() {
  return (
    <div className="order-status-page">
      <div className="order-status-page__icon-wrapper order-status-page__icon-wrapper--shipping">
        <Truck className="order-status-page__icon order-status-page__icon--shipping" />
      </div>
      <p className="order-status-page__title">
        Không có đơn hàng đang vận chuyển
      </p>
      <p className="order-status-page__description">
        Các đơn hàng đã được đóng gói và chờ vận chuyển sẽ hiển thị ở đây
      </p>
    </div>
  );
}

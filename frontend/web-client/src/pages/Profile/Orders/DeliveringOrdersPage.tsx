import { PackageCheck } from "lucide-react";
import "./OrderStatusPage.css";

export default function DeliveringOrdersPage() {
  return (
    <div className="order-status-page">
      <div className="order-status-page__icon-wrapper order-status-page__icon-wrapper--delivering">
        <PackageCheck className="order-status-page__icon order-status-page__icon--delivering" />
      </div>
      <p className="order-status-page__title">Không có đơn hàng đang giao</p>
      <p className="order-status-page__description">
        Các đơn hàng đang trên đường giao đến bạn sẽ hiển thị ở đây
      </p>
    </div>
  );
}

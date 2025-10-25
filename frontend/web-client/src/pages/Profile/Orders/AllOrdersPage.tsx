import { Package } from "lucide-react";
import "./OrderStatusPage.css";

export default function AllOrdersPage() {
  return (
    <div className="order-status-page">
      <div className="order-status-page__icon-wrapper order-status-page__icon-wrapper--all">
        <Package className="order-status-page__icon order-status-page__icon--all" />
      </div>
      <p className="order-status-page__title">Chưa có đơn hàng nào</p>
      <p className="order-status-page__description">Bắt đầu mua sắm ngay!</p>
      <button className="order-status-page__button">Khám phá sản phẩm</button>
    </div>
  );
}

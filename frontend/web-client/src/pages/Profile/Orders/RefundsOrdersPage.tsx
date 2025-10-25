import { RefreshCcw } from "lucide-react";
import "./OrderStatusPage.css";

export default function RefundsOrdersPage() {
  return (
    <div className="order-status-page">
      <div className="order-status-page__icon-wrapper order-status-page__icon-wrapper--refunds">
        <RefreshCcw className="order-status-page__icon order-status-page__icon--refunds" />
      </div>
      <p className="order-status-page__title">
        Không có yêu cầu trả hàng/hoàn tiền
      </p>
      <p className="order-status-page__description">
        Các yêu cầu trả hàng và hoàn tiền sẽ hiển thị ở đây
      </p>
    </div>
  );
}

import {
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  Star,
  Gift,
  TrendingUp,
} from "lucide-react";
import "./CartPage.css";

export default function CartPage() {
  const coinBalance = 2450;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="cart-header__title">Cart</h1>
      </div>

      <div className="cart-balance">
        <div className="cart-balance__header">
          <div className="cart-balance__info">
            <p className="cart-balance__label">Số dư hiện tại</p>
            <div className="cart-balance__amount-wrapper">
              <h2 className="cart-balance__amount">
                {coinBalance.toLocaleString()}
              </h2>
              <span className="cart-balance__currency">Xu</span>
            </div>
          </div>
          <div className="cart-balance__icon-wrapper">
            <Coins className="cart-balance__icon" />
          </div>
        </div>
        <div className="cart-balance__actions">
          <button className="cart-balance__button cart-balance__button--primary">
            Lịch sử
          </button>
          <button className="cart-balance__button cart-balance__button--secondary">
            Quy đổi Xu
          </button>
        </div>
      </div>

      <div className="cart-transactions">
        <div className="cart-transactions__header">
          <h3 className="cart-transactions__title">Lịch Sử Giao Dịch</h3>
          <button className="cart-transactions__view-all">Xem tất cả</button>
        </div>

        <div className="cart-transactions__list">
          <div className="cart-transaction-item cart-transaction-item--income">
            <div className="cart-transaction-item__icon-wrapper">
              <ArrowUpRight className="cart-transaction-item__icon" />
            </div>
            <div className="cart-transaction-item__content">
              <h4 className="cart-transaction-item__title">
                Hoàn thành đơn hàng
              </h4>
              <p className="cart-transaction-item__date">25/10/2025 - 14:30</p>
            </div>
            <div className="cart-transaction-item__amount">
              <p className="cart-transaction-item__value">+150</p>
            </div>
          </div>

          <div className="cart-transaction-item cart-transaction-item--expense">
            <div className="cart-transaction-item__icon-wrapper">
              <ArrowDownRight className="cart-transaction-item__icon" />
            </div>
            <div className="cart-transaction-item__content">
              <h4 className="cart-transaction-item__title">
                Đổi voucher giảm giá
              </h4>
              <p className="cart-transaction-item__date">24/10/2025 - 10:15</p>
            </div>
            <div className="cart-transaction-item__amount">
              <p className="cart-transaction-item__value">-200</p>
            </div>
          </div>

          <div className="cart-transaction-item cart-transaction-item--income">
            <div className="cart-transaction-item__icon-wrapper">
              <ArrowUpRight className="cart-transaction-item__icon" />
            </div>
            <div className="cart-transaction-item__content">
              <h4 className="cart-transaction-item__title">
                Viết đánh giá sản phẩm
              </h4>
              <p className="cart-transaction-item__date">23/10/2025 - 16:45</p>
            </div>
            <div className="cart-transaction-item__amount">
              <p className="cart-transaction-item__value">+50</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-earning">
        <div className="cart-earning__header">
          <div className="cart-earning__icon-wrapper">
            <TrendingUp className="cart-earning__icon" />
          </div>
          <h3 className="cart-earning__title">Cách Kiếm Xu</h3>
        </div>

        <div className="cart-earning__grid">
          <div className="cart-earning-card">
            <div className="cart-earning-card__icon-wrapper cart-earning-card__icon-wrapper--orange">
              <ShoppingBag className="cart-earning-card__icon cart-earning-card__icon--orange" />
            </div>
            <h4 className="cart-earning-card__title">Hoàn thành đơn hàng</h4>
            <p className="cart-earning-card__description">
              Nhận Xu khi mua sắm và hoàn thành đơn hàng thành công
            </p>
            <div className="cart-earning-card__reward cart-earning-card__reward--orange">
              +50 - 200 Xu
            </div>
          </div>

          <div className="cart-earning-card">
            <div className="cart-earning-card__icon-wrapper cart-earning-card__icon-wrapper--green">
              <Star className="cart-earning-card__icon cart-earning-card__icon--green" />
            </div>
            <h4 className="cart-earning-card__title">Viết đánh giá</h4>
            <p className="cart-earning-card__description">
              Nhận Xu khi đánh giá sản phẩm và chia sẻ trải nghiệm
            </p>
            <div className="cart-earning-card__reward cart-earning-card__reward--green">
              +20 - 100 Xu
            </div>
          </div>

          <div className="cart-earning-card">
            <div className="cart-earning-card__icon-wrapper cart-earning-card__icon-wrapper--purple">
              <Gift className="cart-earning-card__icon cart-earning-card__icon--purple" />
            </div>
            <h4 className="cart-earning-card__title">Tham gia sự kiện</h4>
            <p className="cart-earning-card__description">
              Nhận thưởng Xu khi tham gia các chương trình khuyến mãi
            </p>
            <div className="cart-earning-card__reward cart-earning-card__reward--purple">
              +100 - 500 Xu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

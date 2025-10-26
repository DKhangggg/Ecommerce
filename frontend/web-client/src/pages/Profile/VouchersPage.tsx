import { Ticket, Gift, Percent, Clock } from "lucide-react";
import "./VouchersPage.css";

export default function VouchersPage() {
  return (
    <div className="vouchers-page">
      <div className="vouchers-page__header">
        <div className="vouchers-page__header-content">
          <h1 className="vouchers-page__title">Kho Voucher</h1>
          <button className="vouchers-page__search-button">Tìm voucher</button>
        </div>
      </div>

      <div className="vouchers-page__filters">
        <div className="vouchers-page__filter-list">
          <button className="vouchers-page__filter-button vouchers-page__filter-button--active">
            Tất cả
          </button>
          <button className="vouchers-page__filter-button vouchers-page__filter-button--inactive">
            Giảm giá
          </button>
          <button className="vouchers-page__filter-button vouchers-page__filter-button--inactive">
            Miễn phí ship
          </button>
          <button className="vouchers-page__filter-button vouchers-page__filter-button--inactive">
            Hoàn xu
          </button>
        </div>
      </div>

      <div className="vouchers-page__grid">
        <div className="voucher-card voucher-card--orange">
          <div className="voucher-card__content">
            <div className="voucher-card__icon-wrapper">
              <div className="voucher-card__icon-box">
                <Percent className="voucher-card__icon voucher-card__icon--orange" />
              </div>
            </div>
            <div className="voucher-card__info">
              <h3 className="voucher-card__title">Giảm 50.000đ</h3>
              <p className="voucher-card__description">
                Đơn tối thiểu 300.000đ
              </p>
              <div className="voucher-card__expiry">
                <Clock className="voucher-card__expiry-icon" />
                <span>HSD: 31/12/2025</span>
              </div>
            </div>
          </div>
          <div className="voucher-card__footer">
            <button className="voucher-card__button voucher-card__button--orange">
              Sử dụng ngay
            </button>
          </div>
        </div>

        <div className="voucher-card voucher-card--blue">
          <div className="voucher-card__content">
            <div className="voucher-card__icon-wrapper">
              <div className="voucher-card__icon-box">
                <Gift className="voucher-card__icon voucher-card__icon--blue" />
              </div>
            </div>
            <div className="voucher-card__info">
              <h3 className="voucher-card__title">Miễn phí vận chuyển</h3>
              <p className="voucher-card__description">
                Không giới hạn đơn hàng
              </p>
              <div className="voucher-card__expiry">
                <Clock className="voucher-card__expiry-icon" />
                <span>HSD: 25/11/2025</span>
              </div>
            </div>
          </div>
          <div className="voucher-card__footer">
            <button className="voucher-card__button voucher-card__button--blue">
              Sử dụng ngay
            </button>
          </div>
        </div>

        <div className="voucher-card voucher-card--green">
          <div className="voucher-card__content">
            <div className="voucher-card__icon-wrapper">
              <div className="voucher-card__icon-box">
                <Ticket className="voucher-card__icon voucher-card__icon--green" />
              </div>
            </div>
            <div className="voucher-card__info">
              <h3 className="voucher-card__title">Giảm 15%</h3>
              <p className="voucher-card__description">Giảm tối đa 100.000đ</p>
              <div className="voucher-card__expiry">
                <Clock className="voucher-card__expiry-icon" />
                <span>HSD: 20/12/2025</span>
              </div>
            </div>
          </div>
          <div className="voucher-card__footer">
            <button className="voucher-card__button voucher-card__button--green">
              Sử dụng ngay
            </button>
          </div>
        </div>

        <div className="voucher-card voucher-card--purple">
          <div className="voucher-card__content">
            <div className="voucher-card__icon-wrapper">
              <div className="voucher-card__icon-box">
                <Gift className="voucher-card__icon voucher-card__icon--purple" />
              </div>
            </div>
            <div className="voucher-card__info">
              <h3 className="voucher-card__title">Hoàn 50 Xu</h3>
              <p className="voucher-card__description">
                Đơn tối thiểu 200.000đ
              </p>
              <div className="voucher-card__expiry">
                <Clock className="voucher-card__expiry-icon" />
                <span>HSD: 15/01/2026</span>
              </div>
            </div>
          </div>
          <div className="voucher-card__footer">
            <button className="voucher-card__button voucher-card__button--purple">
              Sử dụng ngay
            </button>
          </div>
        </div>
      </div>

      <div className="vouchers-page__empty">
        <div className="vouchers-page__empty-icon-wrapper">
          <Ticket className="vouchers-page__empty-icon" />
        </div>
        <p className="vouchers-page__empty-title">Không còn voucher nào khác</p>
        <p className="vouchers-page__empty-description">
          Hãy quay lại sau để nhận thêm ưu đãi
        </p>
        <button className="vouchers-page__empty-button">
          Khám phá voucher mới
        </button>
      </div>
    </div>
  );
}

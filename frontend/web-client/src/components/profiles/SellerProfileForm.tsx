import { useState } from "react";
import "./SellerProfileForm.css";

interface SellerProfile {
  storeName: string;
  storeDescription: string;
  paymentMethod: string;
  contactEmail: string;
}

export default function SellerProfileForm() {
  const [profile, setProfile] = useState<SellerProfile>({
    storeName: "",
    storeDescription: "",
    paymentMethod: "bank_transfer",
    contactEmail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Seller profile saved:", profile);
  };

  return (
    <div className="seller-profile-form">
      <h2 className="seller-profile-form__title">Hồ sơ người bán</h2>

      <form onSubmit={handleSubmit} className="seller-profile-form__form">
        <div className="seller-profile-form__field">
          <label htmlFor="storeName" className="seller-profile-form__label">
            Tên cửa hàng
          </label>
          <input
            type="text"
            id="storeName"
            name="storeName"
            value={profile.storeName}
            onChange={handleChange}
            className="seller-profile-form__input"
            placeholder="Nhập tên cửa hàng"
            required
          />
        </div>
        <div className="seller-profile-form__field">
          <label
            htmlFor="storeDescription"
            className="seller-profile-form__label"
          >
            Mô tả cửa hàng
          </label>
          <textarea
            id="storeDescription"
            name="storeDescription"
            value={profile.storeDescription}
            onChange={handleChange}
            rows={4}
            className="seller-profile-form__textarea"
            placeholder="Nhập mô tả về cửa hàng của bạn..."
            required
          />
          <p className="seller-profile-form__hint">
            Giới thiệu về sản phẩm và dịch vụ của cửa hàng
          </p>
        </div>

        <div className="seller-profile-form__field">
          <label htmlFor="paymentMethod" className="seller-profile-form__label">
            Phương thức thanh toán
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={profile.paymentMethod}
            onChange={handleChange}
            className="seller-profile-form__select"
          >
            <option value="bank_transfer">Chuyển khoản ngân hàng</option>
            <option value="e_wallet">Ví điện tử</option>
            <option value="cod">Thanh toán khi nhận hàng (COD)</option>
            <option value="credit_card">Thẻ tín dụng</option>
          </select>
        </div>

        <div className="seller-profile-form__field">
          <label htmlFor="contactEmail" className="seller-profile-form__label">
            Email liên hệ
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={profile.contactEmail}
            onChange={handleChange}
            className="seller-profile-form__input"
            placeholder="Nhập email liên hệ"
            required
          />
          <p className="seller-profile-form__hint">
            Email này sẽ được sử dụng để khách hàng liên hệ
          </p>
        </div>

        <div className="seller-profile-form__info-box">
          <h4 className="seller-profile-form__info-title">
            📋 Lưu ý quan trọng
          </h4>
          <ul className="seller-profile-form__info-list">
            <li>• Thông tin cửa hàng sẽ hiển thị công khai cho khách hàng</li>
            <li>• Vui lòng cung cấp thông tin chính xác và đầy đủ</li>
            <li>• Email liên hệ phải là email hoạt động</li>
          </ul>
        </div>

        <div className="seller-profile-form__submit-wrapper">
          <button type="submit" className="seller-profile-form__submit-button">
            Lưu hồ sơ
          </button>
        </div>
      </form>
    </div>
  );
}

import { useState } from "react";
import "./UserProfileForm.css";

// User profile data interface
interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  gender: "male" | "female" | "other";
}

export default function UserProfileForm() {
  // Internal state for form data
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "",
    email: "user@example.com", // Disabled field, pre-filled
    phone: "",
    address: "",
    gender: "male",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User profile saved:", profile);
    // TODO: Add API call to save profile
  };

  return (
    <div className="user-profile-form">
      {/* Card Title */}
      <h2 className="user-profile-form__title">Thông tin người mua</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="user-profile-form__form">
        {/* Full Name Field */}
        <div className="user-profile-form__field">
          <label htmlFor="fullName" className="user-profile-form__label">
            Họ và tên
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="user-profile-form__input"
            placeholder="Nhập họ và tên"
            required
          />
        </div>

        {/* Email Field (Disabled) */}
        <div className="user-profile-form__field">
          <label htmlFor="email" className="user-profile-form__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            disabled
            className="user-profile-form__input user-profile-form__input--disabled"
          />
          <p className="user-profile-form__hint">Email không thể thay đổi</p>
        </div>

        {/* Phone Number Field */}
        <div className="user-profile-form__field">
          <label htmlFor="phone" className="user-profile-form__label">
            Số điện thoại
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="user-profile-form__input"
            placeholder="Nhập số điện thoại"
            required
          />
        </div>

        {/* Address Field */}
        <div className="user-profile-form__field">
          <label htmlFor="address" className="user-profile-form__label">
            Địa chỉ
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="user-profile-form__input"
            placeholder="Nhập địa chỉ"
            required
          />
        </div>

        {/* Gender Field (Select) */}
        <div className="user-profile-form__field">
          <label htmlFor="gender" className="user-profile-form__label">
            Giới tính
          </label>
          <select
            id="gender"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="user-profile-form__select"
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="user-profile-form__submit-wrapper">
          <button type="submit" className="user-profile-form__submit-button">
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}

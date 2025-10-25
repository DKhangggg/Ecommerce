import { useState } from "react";

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

  const THEME_COLOR = "#B97B48";

  return (
    <div className="w-full h-auto">
      {/* Card Title */}
      <h2
        className="text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-3"
        style={{ color: "#4b3a2b" }}
      >
        Thông tin người mua
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Field */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium mb-2"
            style={{ color: "#4b3a2b" }}
          >
            Họ và tên
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="border rounded-lg p-2.5 w-full transition-all duration-200 text-sm md:text-base"
            style={{
              borderColor: "#d4a574",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = THEME_COLOR;
              e.target.style.boxShadow = "0 0 0 3px rgba(185, 123, 72, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d4a574";
              e.target.style.boxShadow = "none";
            }}
            placeholder="Nhập họ và tên"
            required
          />
        </div>

        {/* Email Field (Disabled) */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2"
            style={{ color: "#4b3a2b" }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            disabled
            className="border rounded-lg p-2.5 w-full bg-gray-100 cursor-not-allowed text-sm md:text-base"
            style={{
              borderColor: "#e5e7eb",
              color: "#9ca3af",
            }}
          />
          <p className="text-xs mt-1" style={{ color: "#7b614a" }}>
            Email không thể thay đổi
          </p>
        </div>

        {/* Phone Number Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium mb-2"
            style={{ color: "#4b3a2b" }}
          >
            Số điện thoại
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="border rounded-lg p-2.5 w-full transition-all duration-200 text-sm md:text-base"
            style={{
              borderColor: "#d4a574",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = THEME_COLOR;
              e.target.style.boxShadow = "0 0 0 3px rgba(185, 123, 72, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d4a574";
              e.target.style.boxShadow = "none";
            }}
            placeholder="Nhập số điện thoại"
            required
          />
        </div>

        {/* Address Field */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium mb-2"
            style={{ color: "#4b3a2b" }}
          >
            Địa chỉ
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="border rounded-lg p-2.5 w-full transition-all duration-200 text-sm md:text-base"
            style={{
              borderColor: "#d4a574",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = THEME_COLOR;
              e.target.style.boxShadow = "0 0 0 3px rgba(185, 123, 72, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d4a574";
              e.target.style.boxShadow = "none";
            }}
            placeholder="Nhập địa chỉ"
            required
          />
        </div>

        {/* Gender Field (Select) */}
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium mb-2"
            style={{ color: "#4b3a2b" }}
          >
            Giới tính
          </label>
          <select
            id="gender"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="border rounded-lg p-2.5 w-full transition-all duration-200 text-sm md:text-base"
            style={{
              borderColor: "#d4a574",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = THEME_COLOR;
              e.target.style.boxShadow = "0 0 0 3px rgba(185, 123, 72, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d4a574";
              e.target.style.boxShadow = "none";
            }}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full font-medium px-4 py-2.5 md:py-3 rounded-lg text-white transition-all duration-200 text-sm md:text-base"
            style={{
              background: "linear-gradient(135deg, #B97B48 0%, #a06a3e 100%)",
              boxShadow: "0 4px 12px rgba(185, 123, 72, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #c99d7d 0%, #b07a52 100%)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(185, 123, 72, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #B97B48 0%, #a06a3e 100%)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(185, 123, 72, 0.3)";
            }}
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}

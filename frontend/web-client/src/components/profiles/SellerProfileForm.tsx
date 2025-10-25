import { useState } from "react";

// Seller profile data interface
interface SellerProfile {
  storeName: string;
  storeDescription: string;
  paymentMethod: string;
  contactEmail: string;
}

export default function SellerProfileForm() {
  // Internal state for form data
  const [profile, setProfile] = useState<SellerProfile>({
    storeName: "",
    storeDescription: "",
    paymentMethod: "bank_transfer",
    contactEmail: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Seller profile saved:", profile);
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
        Hồ sơ người bán
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Store Name Field */}
        <div>
          <label
            htmlFor="storeName"
            className="block text-sm font-medium mb-2"
            style={{ color: "#4b3a2b" }}
          >
            Tên cửa hàng
          </label>
          <input
            type="text"
            id="storeName"
            name="storeName"
            value={profile.storeName}
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
            placeholder="Nhập tên cửa hàng"
            required
          />
        </div>

        {/* Store Description Field (Textarea) */}
        <div>
          <label
            htmlFor="storeDescription"
            className="block text-sm font-medium mb-2"
            style={{ color: "#4b3a2b" }}
          >
            Mô tả cửa hàng
          </label>
          <textarea
            id="storeDescription"
            name="storeDescription"
            value={profile.storeDescription}
            onChange={handleChange}
            rows={4}
            className="border rounded-lg p-2.5 w-full transition-all duration-200 resize-none text-sm md:text-base"
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
            placeholder="Nhập mô tả về cửa hàng của bạn..."
            required
          />
          <p className="text-xs mt-1" style={{ color: "#7b614a" }}>
            Giới thiệu về sản phẩm và dịch vụ của cửa hàng
          </p>
        </div>

        {/* Payment Method Field (Select) */}
        <div>
          <label
            htmlFor="paymentMethod"
            className="block text-sm font-medium mb-2"
            style={{ color: "#4b3a2b" }}
          >
            Phương thức thanh toán
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={profile.paymentMethod}
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
            <option value="bank_transfer">Chuyển khoản ngân hàng</option>
            <option value="e_wallet">Ví điện tử</option>
            <option value="cod">Thanh toán khi nhận hàng (COD)</option>
            <option value="credit_card">Thẻ tín dụng</option>
          </select>
        </div>

        {/* Contact Email Field */}
        <div>
          <label
            htmlFor="contactEmail"
            className="block text-sm font-medium mb-2"
            style={{ color: "#4b3a2b" }}
          >
            Email liên hệ
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={profile.contactEmail}
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
            placeholder="Nhập email liên hệ"
            required
          />
          <p className="text-xs mt-1" style={{ color: "#7b614a" }}>
            Email này sẽ được sử dụng để khách hàng liên hệ
          </p>
        </div>

        {/* Additional Info Box */}
        <div
          className="rounded-lg p-4 mt-4"
          style={{
            background: "rgba(185, 123, 72, 0.05)",
            border: "1px solid rgba(185, 123, 72, 0.2)",
          }}
        >
          <h4
            className="text-sm font-semibold mb-2"
            style={{ color: "#4b3a2b" }}
          >
            📋 Lưu ý quan trọng
          </h4>
          <ul className="text-xs space-y-1" style={{ color: "#7b614a" }}>
            <li>• Thông tin cửa hàng sẽ hiển thị công khai cho khách hàng</li>
            <li>• Vui lòng cung cấp thông tin chính xác và đầy đủ</li>
            <li>• Email liên hệ phải là email hoạt động</li>
          </ul>
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
            Lưu hồ sơ
          </button>
        </div>
      </form>
    </div>
  );
}

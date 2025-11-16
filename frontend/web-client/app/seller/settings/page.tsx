import React from "react";

const SettingsPage = () => {
  const activeTab = "profile";

  return (
    <div className="p-4 md:p-8 bg-background min-h-screen">
      {/* 1. HEADER */}
      <h1 className="text-3xl font-extrabold text-foreground mb-6">
        Cài đặt Cửa hàng
      </h1>

      {/* 2. THANH TABS ĐIỀU HƯỚNG */}
      <div className="border-b border-border mb-8">
        <nav className="flex gap-6 -mb-px">
          {/* Tab 1 (Active) */}
          <button
            className={`py-3 px-1 font-semibold border-b-2 ${
              activeTab === "profile"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Thông tin Cửa hàng
          </button>
          {/* Tab 2 */}
          <button
            className={`py-3 px-1 font-semibold border-b-2 ${
              activeTab === "shipping"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Vận chuyển
          </button>
          {/* Tab 3 */}
          <button
            className={`py-3 px-1 font-semibold border-b-2 ${
              activeTab === "payment"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Thanh toán
          </button>
        </nav>
      </div>

      {/* 3. NỘI DUNG CỦA TAB (Ví dụ: Thông tin Cửa hàng) */}
      <div className="bg-card p-6 md:p-8 rounded-xl shadow-lg max-w-4xl">
        <h2 className="text-2xl font-bold text-card-foreground mb-6">
          Thông tin Cửa hàng
        </h2>

        <form className="space-y-6">
          {/* Trường Tên Shop */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Tên Shop
            </label>
            <input
              type="text"
              defaultValue="Shop Của Tôi"
              className="w-full p-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Trường Mô tả */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Mô tả Shop
            </label>
            <textarea
              rows={4}
              defaultValue="Mô tả ngắn về các sản phẩm của shop..."
              className="w-full p-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Trường Ảnh bìa / Logo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Logo
              </label>
              <div className="w-full h-32 bg-input border-2 border-dashed border-border rounded-lg flex justify-center items-center text-muted-foreground">
                Bấm để Tải lên (1:1)
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Ảnh bìa
              </label>
              <div className="w-full h-32 bg-input border-2 border-dashed border-border rounded-lg flex justify-center items-center text-muted-foreground">
                Bấm để Tải lên (16:9)
              </div>
            </div>
          </div>

          {/* Nút Lưu */}
          <div className="flex justify-end pt-4 border-t border-border">
            <button
              type="submit"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              {/* <Save className="w-5 h-5" /> */}
              Lưu Thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;

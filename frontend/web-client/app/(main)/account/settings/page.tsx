"use client";

import { useState } from "react";
import { Lock, Sun, Moon, Bell, Monitor } from "lucide-react";

// --- Components con cho trang ---

// 1. Component Toggle Switch (dùng cho Thông báo)
const ToggleSwitch = ({
  label,
  description,
  id,
}: {
  label: string;
  description: string;
  id: string;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div>
        <label htmlFor={id} className="font-medium text-foreground">
          {label}
        </label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        className={`hoverEffect relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
          ${isChecked ? "bg-primary" : "bg-input"}
        `}
      >
        <span
          aria-hidden="true"
          className={`hoverEffect pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out
            ${isChecked ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
};

// 2. Component Chọn Chế độ (Theme)
const ThemeSelector = () => {
  const [theme, setTheme] = useState("system"); // 'light', 'dark', 'system'
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <button
        onClick={() => setTheme("light")}
        className={`hoverEffect flex flex-1 items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium
          ${
            theme === "light"
              ? "border-primary bg-accent text-primary"
              : "border-border bg-transparent text-muted-foreground"
          }
        `}
      >
        <Sun className="h-4 w-4" />
        Sáng
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`hoverEffect flex flex-1 items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium
          ${
            theme === "dark"
              ? "border-primary bg-accent text-primary"
              : "border-border bg-transparent text-muted-foreground"
          }
        `}
      >
        <Moon className="h-4 w-4" />
        Tối
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`hoverEffect flex flex-1 items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium
          ${
            theme === "system"
              ? "border-primary bg-accent text-primary"
              : "border-border bg-transparent text-muted-foreground"
          }
        `}
      >
        <Monitor className="h-4 w-4" />
        Hệ thống
      </button>
    </div>
  );
};

// --- Component chính của trang ---

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      {/* (1) Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Cài đặt
        </h1>
        <p className="mt-1 text-muted-foreground">
          Quản lý thông báo, giao diện và bảo mật của bạn.
        </p>
      </div>

      {/* (2) Thẻ Cài Đặt Giao Diện (Chế độ) */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center gap-3 p-4 sm:p-6">
          <Sun className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Giao diện (Chế độ)
          </h2>
        </div>
        <div className="p-4 sm:p-6 border-t border-border">
          <ThemeSelector />
        </div>
      </div>

      {/* (3) Thẻ Cài Đặt Thông Báo */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center gap-3 p-4 sm:p-6">
          <Bell className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Thông báo</h2>
        </div>
        <div className="flex flex-col gap-6 p-4 sm:p-6 border-t border-border">
          <ToggleSwitch
            id="notifications-email"
            label="Thông báo qua Email"
            description="Nhận thông báo về đơn hàng và khuyến mãi."
          />
          <ToggleSwitch
            id="notifications-push"
            label="Thông báo đẩy (Push)"
            description="Nhận thông báo nhanh trên thiết bị của bạn."
          />
          <ToggleSwitch
            id="notifications-sms"
            label="Thông báo qua SMS"
            description="Chỉ nhận các cảnh báo bảo mật quan trọng."
          />
        </div>
      </div>

      {/* (4) Thẻ Bảo Mật */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center gap-3 p-4 sm:p-6">
          <Lock className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Bảo mật</h2>
        </div>
        <div className="p-4 sm:p-6 border-t border-border">
          <button
            // TODO: Mở modal đổi mật khẩu
            className="hoverEffect rounded-md border border-input bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-accent"
          >
            Đổi mật khẩu
          </button>
          <p className="mt-2 text-sm text-muted-foreground">
            Bạn nên cập nhật mật khẩu định kỳ để bảo vệ tài khoản.
          </p>
        </div>
      </div>
    </div>
  );
}

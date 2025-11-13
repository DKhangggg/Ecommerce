"use client";

import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Biểu tượng (Icon) cho nút "Back"
const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      router.push("/"); // Chuyển hướng về trang chủ sau khi login
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  return (
    // 1. DÙNG BIẾN CSS: bg-card, border-border
    <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
      {/* 2. NÚT QUAY LẠI (Back Button) */}
      <Link
        href="/" // Điều hướng về trang chủ
        className="hoverEffect absolute left-4 top-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <BackArrowIcon />
        Trang chủ
      </Link>

      {/* Phần Header của Form */}
      <div className="mb-6 pt-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Đăng nhập</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Chào mừng trở lại! Vui lòng nhập thông tin.
        </p>
      </div>

      {/* Form đăng nhập */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Trường Username */}
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Tên đăng nhập
          </label>
          <input
            id="username"
            type="text"
            placeholder="username_cua_ban"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
            // DÙNG BIẾN CSS: border-input, bg-background, ...
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Trường Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            // DÙNG BIẾN CSS: border-input, bg-background, ...
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {/* Đây là phần code của bạn bị thiếu */}
        </div>

        {/* Hiển thị lỗi (nếu có) */}
        {error && (
          // DÙNG BIẾN CSS: text-destructive
          <p className="text-sm text-destructive">{error}</p>
        )}

        {/* Nút Submit */}
        <button
          type="submit"
          disabled={loading}
          // DÙNG BIẾN CSS: bg-primary, text-primary-foreground
          className="hoverEffect flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>

      {/* Link đến trang Register */}
      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Chưa có tài khoản? </span>
        <Link
          href="/register"
          // DÙNG BIẾN CSS: text-primary
          className="hoverEffect font-semibold text-primary underline-offset-4 hover:underline"
        >
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function RegisterPage() {
  // 1. State cho tất cả các trường
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(""); // Để trống cho placeholder
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [error, setError] = useState("");

  const { register, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!gender) {
      setError("Vui lòng chọn giới tính.");
      return;
    }

    try {
      // 2. Gọi hàm register đã được cập nhật
      await register({
        username,
        password,
        email,
        firstName,
        lastName,
        phoneNumber,
        gender,
        dateOfBirth,
      });

      router.push("/"); // Đăng ký thành công, về trang chủ
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div className="relative w-full max-w-lg rounded-lg border border-border bg-card p-8 shadow-lg my-16">
      {/* Nút Quay Lại */}
      <Link
        href="/"
        className="hoverEffect absolute left-4 top-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <BackArrowIcon />
        Trang chủ
      </Link>

      {/* Header */}
      <div className="mb-6 pt-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Tạo tài khoản</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tham gia với chúng tôi ngay hôm nay!
        </p>
      </div>

      {/* Form Đăng Ký */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hàng 1: First Name & Last Name */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium">
              Họ
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Nguyễn"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={loading}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium">
              Tên
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Văn A"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={loading}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Hàng 2: Username & Email */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              placeholder="nguyenvana"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="a@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Hàng 3: Mật khẩu */}
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
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Hàng 4: Phone & Gender & DOB */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium">
              Số điện thoại
            </label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="0123456789"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              disabled={loading}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="gender" className="text-sm font-medium">
              Giới tính
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              disabled={loading}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="" disabled>
                Chọn...
              </option>
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
              <option value="OTHER">Khác</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="dateOfBirth" className="text-sm font-medium">
              Ngày sinh
            </label>
            <input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              disabled={loading}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Lỗi (nếu có) */}
        {error && <p className="text-sm text-destructive">{error}</p>}

        {/* Nút Submit */}
        <button
          type="submit"
          disabled={loading}
          className="hoverEffect flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
        </button>
      </form>

      {/* Link đến trang Login */}
      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Đã có tài khoản? </span>
        <Link
          href="/login"
          className="hoverEffect font-semibold text-primary underline-offset-4 hover:underline"
        >
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
}

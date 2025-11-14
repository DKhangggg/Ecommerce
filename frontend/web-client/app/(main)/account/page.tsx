"use client";

import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Settings,
  User,
  Edit,
  Package,
  Truck,
  CheckCircle,
  Star,
  Clock, // Thêm icon cho "Đang xử lý"
} from "lucide-react";

// 1. Thông tin cá nhân (Mock Data)
// Chúng ta sẽ dùng thông tin này để hiển thị
const mockUserInfo = {
  fullName: "Nguyễn Văn A", // Lấy từ firstName + lastName
  email: "user@example.com", // Lấy từ auth
  phone: "0123456789",
  gender: "Nam",
  dob: "1990-01-01",
};

// 2. Thống kê (Mock Data)
const mockStats = {
  totalOrders: 120,
  pending: 5,
  inTransit: 2,
  delivered: 113,
  reviews: 88,
  favorites: 35,
};

export default function AccountDashboardPage() {
  const { user, loading } = useAuth();

  // 3. Xử lý trạng thái Loading
  if (loading || !user) {
    return (
      <div className="flex h-60 items-center justify-center p-10">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-ring border-t-primary"></div>
      </div>
    );
  }

  // 4. Giao diện chính của Dashboard
  return (
    // Container chính cho nội dung bên phải sidebar
    <div className="flex flex-col gap-8 p-4 md:p-6">
      {/* (1) Phần Chào Mừng */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Chào mừng, {user.username}!
        </h1>
        <p className="mt-1 text-muted-foreground">
          Quản lý thông tin và theo dõi hoạt động của bạn.
        </p>
      </div>

      {/* (2) Thẻ Thông Tin Cá Nhân */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        {/* Header của thẻ */}
        <div className="flex items-center justify-between p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Thông tin cá nhân
            </h2>
          </div>
          {/* Nút Edit (Link đến trang settings) */}
          <Link
            href="/account/settings"
            className="hoverEffect flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Edit className="h-4 w-4" />
            Chỉnh sửa
          </Link>
        </div>

        {/* Nội dung thông tin (chia lưới) */}
        <div className="border-t border-border p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            {/* Mỗi item là một cặp label/value */}
            <div>
              <label className="text-sm text-muted-foreground">Họ và tên</label>
              <p className="font-semibold text-foreground">
                {mockUserInfo.fullName}
              </p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <p className="font-semibold text-foreground">
                {mockUserInfo.email}
              </p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">
                Số điện thoại
              </label>
              <p className="font-semibold text-foreground">
                {mockUserInfo.phone}
              </p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Giới tính</label>
              <p className="font-semibold text-foreground">
                {mockUserInfo.gender}
              </p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Ngày sinh</label>
              <p className="font-semibold text-foreground">
                {mockUserInfo.dob}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* (3) Thẻ Thống Kê Hoạt Động */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Hoạt động của bạn
        </h2>

        {/* Lưới 6 thẻ thống kê */}
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
          {/* Thẻ Tổng Đơn Hàng */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Tổng đơn hàng</p>
                <p className="text-2xl font-bold">{mockStats.totalOrders}</p>
              </div>
            </div>
          </div>

          {/* Thẻ Đang Xử Lý */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Đang xử lý</p>
                <p className="text-2xl font-bold">{mockStats.pending}</p>
              </div>
            </div>
          </div>

          {/* Thẻ Đang Giao */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Đang giao</p>
                <p className="text-2xl font-bold">{mockStats.inTransit}</p>
              </div>
            </div>
          </div>

          {/* Thẻ Đã Giao */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Đã giao</p>
                <p className="text-2xl font-bold">{mockStats.delivered}</p>
              </div>
            </div>
          </div>

          {/* Thẻ Đánh Giá */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Đánh giá</p>
                <p className="text-2xl font-bold">{mockStats.reviews}</p>
              </div>
            </div>
          </div>

          {/* Thẻ Yêu Thích */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Yêu thích</p>
                <p className="text-2xl font-bold">{mockStats.favorites}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

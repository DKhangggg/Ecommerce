"use client"; // Bắt buộc

import { useAuth } from "@/context/AuthProvider";
import { User } from "lucide-react";
import Link from "next/link";

const AuthButton = () => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="h-8 w-20 animate-pulse rounded-md bg-gray-200"></div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/profile" className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            <User className="h-6 w-6" />
          </span>
        </Link>
        <button
          onClick={logout}
          className="rounded bg-red-500 px-3 py-1 text-sm text-white"
        >
          Đăng xuất
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="text-sm font-semibold 
     hover:text-brand-7 text-brand-7/50 hover:cursor-pointer hoverEffect"
    >
      Login
    </Link>
  );
};

export default AuthButton;

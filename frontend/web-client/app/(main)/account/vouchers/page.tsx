"use client";

import { Ticket, Percent, ClipboardCopy } from "lucide-react";
import { useState } from "react";

// 1. Mock Data
const mockVouchers = [
  {
    id: "FREESHIP",
    code: "FREESHIP",
    desc: "Miễn phí vận chuyển",
    expiry: "30/11/2025",
    type: "shipping",
  },
  {
    id: "GIAM10PT",
    code: "GIAM10PT",
    desc: "Giảm 10% tối đa 50K",
    expiry: "15/12/2025",
    type: "percent",
  },
  {
    id: "TET2026",
    code: "TET2026",
    desc: "Giảm 100K cho đơn từ 2 triệu",
    expiry: "30/01/2026",
    type: "money",
  },
];

// 2. Component chính
export default function VouchersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000); // Reset sau 2s
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      {/* (1) Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Ví Voucher
        </h1>
        <p className="mt-1 text-muted-foreground">
          Các mã giảm giá và ưu đãi của bạn.
        </p>
      </div>

      {/* (2) Danh sách Voucher */}
      {mockVouchers.length > 0 ? (
        <div className="flex flex-col gap-5">
          {mockVouchers.map((voucher) => (
            <div
              key={voucher.id}
              className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm sm:flex-row"
            >
              {/* Phần Icon bên trái */}
              <div className="flex items-center justify-center p-6 sm:w-28 bg-primary/10">
                <Percent className="h-10 w-10 text-primary" />
              </div>

              {/* Phần Nội dung */}
              <div className="flex-1 p-5">
                <h3 className="text-lg font-semibold text-foreground">
                  {voucher.desc}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Hết hạn: {voucher.expiry}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded-md border border-dashed border-primary bg-primary/5 px-3 py-1 font-mono text-sm font-medium text-primary">
                    {voucher.code}
                  </span>
                  <button
                    onClick={() => handleCopy(voucher.code)}
                    className="hoverEffect rounded-md p-2 text-muted-foreground hover:bg-accent"
                    title="Copy mã"
                  >
                    <ClipboardCopy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Phần Nút bên phải */}
              <div className="flex items-center justify-start border-t border-border p-5 sm:w-40 sm:justify-center sm:border-l sm:border-t-0">
                <button className="hoverEffect rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-accent">
                  {copiedCode === voucher.code ? "Đã copy!" : "Lưu"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          Bạn không có voucher nào.
        </p>
      )}
    </div>
  );
}

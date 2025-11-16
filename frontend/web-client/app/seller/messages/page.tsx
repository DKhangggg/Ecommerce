import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const MessagesPage = () => {
  return (
    <div className="p-4 md:p-8 bg-background min-h-screen">
      {/* 1. HEADER */}
      <h1 className="text-3xl font-extrabold text-foreground mb-6">Hòm thư</h1>

      {/* 2. GIAO DIỆN CHAT */}
      <div className="bg-card rounded-xl shadow-lg flex h-[75vh] overflow-hidden">
        {/* CỘT 1: DANH BẠ (Chat List) */}
        <div className="w-full md:w-1/4 shrink-0 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <input
              type="text"
              placeholder="Tìm kiếm cuộc trò chuyện..."
              className="w-full p-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grow overflow-y-auto">
            {/* Item 1 (Active) */}
            <div className="flex items-center gap-3 p-4 bg-accent text-accent-foreground border-b border-border cursor-pointer">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Nguyễn Văn A</p>
                <p className="text-sm text-accent-foreground/80 truncate">
                  Bạn: Ok, tôi sẽ kiểm tra...
                </p>
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex items-center gap-3 p-4 hover:bg-muted/50 border-b border-border cursor-pointer">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">Trần Thị B</p>
                <p className="text-sm text-muted-foreground truncate">
                  Cảm ơn shop nhé!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CỘT 2: CỬA SỔ CHAT (Chat Window) */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="p-4 border-b border-border shrink-0">
            <p className="font-semibold text-foreground">Nguyễn Văn A</p>
            <p className="text-xs text-green-500">Đang hoạt động</p>
          </div>

          <div className="grow p-4 space-y-4 overflow-y-auto bg-muted/20">
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground p-3 rounded-lg max-w-xs">
                Sản phẩm này còn hàng không shop?
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                Chào bạn, sản phẩm này còn hàng ạ.
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                Bạn có thể đặt hàng ngay nhé!
              </div>
            </div>
          </div>

          {/* Khung nhập tin nhắn */}
          <div className="p-4 border-t border-border shrink-0 flex gap-3">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="grow p-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-primary-foreground p-2 rounded-lg">
              {/* <Send className="w-5 h-5" /> */}
              Gửi
            </button>
          </div>
        </div>

        <div className="hidden md:flex md:w-1/4 border-l border-border flex-col overflow-y-auto">
          <div className="p-4 border-b border-border text-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-semibold text-foreground">Nguyễn Văn A</p>
            <p className="text-sm text-muted-foreground">khachhang@email.com</p>
            <button className="mt-2 text-sm text-primary font-semibold hover:underline">
              Xem Hồ Sơ
            </button>
          </div>

          {/* Nội dung thông tin (cuộn) */}
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Đơn hàng gần đây
              </h4>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-semibold text-foreground">
                  Đơn hàng #1005
                </p>
                <p className="text-xs text-muted-foreground">
                  Tổng: 1.250.000₫
                </p>
                <p className="text-xs text-green-500">Trạng thái: Đã giao</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Địa chỉ Giao hàng
              </h4>
              <p className="text-sm text-foreground">
                123 Đường ABC, Phường XYZ, Quận 1, TP. HCM
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Ghi chú
              </h4>
              <textarea
                rows={3}
                placeholder="Thêm ghi chú riêng tư..."
                className="w-full p-2 bg-input border border-border rounded-lg text-foreground text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;

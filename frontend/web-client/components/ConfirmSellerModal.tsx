"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export function ConfirmSellerModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Trở thành người bán?",
  message = "Bạn chưa có cửa hàng. Bạn có muốn đăng ký để trở thành người bán ngay bây giờ không?",
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  // Ngăn chặn việc bấm vào nội dung modal cũng làm đóng modal
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    // Lớp phủ toàn màn hình (Overlay)
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 animate-fadeIn"
      onClick={onClose}
    >
      {/* Nội dung Modal */}
      <div
        className="relative w-[90%] max-w-md overflow-hidden rounded-lg bg-white shadow-xl animate-zoomIn"
        onClick={handleContentClick}
      >
        {/* Tiêu đề */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 px-6">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            className="p-0 text-3xl leading-none text-gray-500 bg-transparent border-none cursor-pointer hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Thông điệp */}
        <div className="p-6">
          <p className="m-0 text-base leading-relaxed text-gray-700">
            {message}
          </p>
        </div>

        {/* Các nút hành động */}
        <div className="flex justify-end space-x-3 border-t border-gray-200 bg-gray-50 p-4 px-6">
          <button
            className="py-2 px-5 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-200"
            onClick={onClose}
          >
            Không
          </button>
          <button
            className="py-2 px-5 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:bg-blue-700 hover:border-blue-700"
            onClick={onConfirm}
          >
            Có, đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  content: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "12px",
  },
  message: {
    marginBottom: "20px",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#eee",
  },
  confirmButton: {
    backgroundColor: "#007bff",
    color: "white",
  },
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}
export const Modal = ({ isOpen, onClose, onConfirm, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.content} onClick={(e) => e.stopPropagation()}>
        <h3 style={modalStyles.title}>Trở thành người bán?</h3>
        <p style={modalStyles.message}>
          Bạn chưa có cửa hàng. Bạn có muốn đăng ký để trở thành người bán ngay
          bây giờ không?
        </p>
        <div style={modalStyles.buttons}>
          <button
            style={{ ...modalStyles.button, ...modalStyles.cancelButton }}
            onClick={onClose}
          >
            Không
          </button>
          <button
            style={{ ...modalStyles.button, ...modalStyles.confirmButton }}
            onClick={onConfirm}
          >
            Có, đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

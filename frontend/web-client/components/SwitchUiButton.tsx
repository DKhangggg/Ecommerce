import { useAuth } from "@/context/AuthProvider";
import { Store, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { ConfirmSellerModal } from "./ConfirmSellerModal";

const SwitchUiButton = () => {
  const { user } = useAuth();
  const currentUI = usePathname().includes("/seller") ? "seller" : "user";
  const router = useRouter();
  const isInSellerUI = "seller";
  const isInAccountUI = "user";
  const [showModal, setShowModal] = React.useState(false);

  const handleSwitchClick = () => {
    if (currentUI === isInAccountUI) {
      if (user?.roles.includes("ROLE_SELLER")) {
        router.push("/seller");
      } else {
        setShowModal(true);
      }
    } else {
      router.push("/account");
    }
  };
  const handleModalConfirm = () => {
    setShowModal(false);
    router.push("/seller/register");
  };
  const handleModalClose = () => setShowModal(false);
  let buttonContent = null;

  if (currentUI === isInAccountUI) {
    buttonContent = (
      <>
        <Store className="sidebar-icon" />
        <span className="sidebar-text">Cửa hàng của tôi</span>
      </>
    );
  } else if (currentUI === isInSellerUI) {
    buttonContent = (
      <>
        <User className="sidebar-icon" />
        <span className="sidebar-text">Tài khoản của tôi</span>
      </>
    );
  }

  if (!buttonContent) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleSwitchClick}
        className="sidebar-link switch-ui-button"
      >
        <div className="sidebar-item-content">{buttonContent}</div>
      </button>

      <ConfirmSellerModal
        isOpen={showModal}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </>
  );
};

export default SwitchUiButton;

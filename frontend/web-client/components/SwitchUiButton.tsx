import { useAuth } from "@/context/AuthProvider";
import { Store, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { ConfirmSellerModal } from "./ConfirmSellerModal";

const SwitchUiButton = () => {
  const { user } = useAuth();
  const currentUI = usePathname().includes("/seller") ? "seller" : "user";
  const router = useRouter();
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
        <Store className="h-4 w-4" />
        <span className="text-xs font-medium text-brand-5">
          Cửa hàng của tôi
        </span>
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
        className="flex items-center gap-2 rounded bg-gray-100 px-4 py-2  font-medium text-gray-800"
      >
        {buttonContent}
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

import { SignInButton } from "@clerk/nextjs";
import React from "react";

const SigninButton = () => {
  return (
    <SignInButton mode="modal">
      <button
        className="text-sm font-semibold
     hover:text-[#000011] text-lime-50h hover:cursor-pointer hoverEffect"
      >
        Login
      </button>
    </SignInButton>
  );
};

export default SigninButton;

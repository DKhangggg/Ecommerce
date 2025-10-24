import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;

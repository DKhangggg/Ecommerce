import { AuthGuard } from "@/components/AuthGuard";
import React from "react";

const layout = () => {
  return (
    <AuthGuard>
      <div>layout</div>
    </AuthGuard>
  );
};

export default layout;

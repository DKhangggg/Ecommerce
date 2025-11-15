"use client";

import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FullPageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-ring border-t-primary" />
  </div>
);

export function SellerAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const isAuthorized = !loading && user && user.roles.includes("ROLE_SELLER");

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`/login?redirect=/seller`);
        return;
      }

      if (user && !user.roles.includes("ROLE_SELLER")) {
        router.push("/unauthorized");
        return;
      }
    }
  }, [loading, user, router]);

  if (loading || !isAuthorized) {
    return <FullPageLoader />;
  }
  return <>{children}</>;
}

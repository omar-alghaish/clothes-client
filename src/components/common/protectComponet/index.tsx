"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useIsUser } from "@/hooks/useIsUser";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isUser = useIsUser()

  useEffect(() => {
    if (!isUser) {
      router.push("/signin"); // Redirect if not authenticated
    }
  }, [isUser, router]);

  if (!isUser) {
    return null; // Prevent rendering until redirect
  }

  return <>{children}</>;
};

export default ProtectedRoute;

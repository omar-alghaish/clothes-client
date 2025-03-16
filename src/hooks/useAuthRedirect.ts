"use client";

import { useRouter } from "next/navigation";
import { useIsUser } from "./useIsUser";

const useAuthRedirect = () => {
  const router = useRouter();
  const isUser = useIsUser()

  const checkAuth = (callback: () => void) => {
    if (!isUser) {
      router.push("/signin"); // Redirect to login if not authenticated
    } else {
      callback(); // Run the action if authenticated
    }
  };

  return checkAuth;
};

export default useAuthRedirect;

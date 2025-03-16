"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation"; 
import React from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h1 className="font-extrabold text-2xl">Logout</h1>
        <p>Are you sure you want to logout?</p>
      </div>

      <Button
        onClick={handleLogout}
        variant="outline"
        className="border-destructive rounded-xl font-extrabold text-lg p-6 text-destructive hover:bg-destructive hover:text-destructive-foreground"
      >
        Logout
      </Button>
    </div>
  );
};

export default Page;

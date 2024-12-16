"use client";
import { Button, Modal, Drawer } from "@/components/common";
import "../styles/styles.css";
import { useState } from "react";
import ThemeToggle from "@/components/themeToggle/ThemeToggle";
import { Header } from "@/components";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] h-[300vh]">
      <Button
        variant="outlined"
        label="click"
        onClick={() => setIsOpen(true)}
      />
      {/* <Modal  isOpen={isOpen} onClose={()=> setIsOpen(false) }  >this is test</Modal> */}
      {/* <Drawer
        position="bottom"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        this is test
      </Drawer> */}
    <Header />

      <ThemeToggle />
    </div>
  );
}

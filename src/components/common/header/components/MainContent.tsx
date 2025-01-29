"use client";

import { useViewport } from "@/hooks/use-viewposrt";
import { MainHeader } from "./MainHeader";
import { MobileHeader } from "./MobileHeader";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const Header = () => {
  const { isMobile } = useViewport();
  const { isScrolled, isScrollingUp } = useScrollPosition(50); // 50px threshold

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-transform duration-300 h-[100vh]  ${
        isScrollingUp ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-background border-b" : "bg-transparent"}`}
    >
      {isMobile ? <MobileHeader /> : <MainHeader />}
    </header>
  );
};

export default Header;

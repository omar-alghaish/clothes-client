"use client";

import { useViewport } from "@/hooks/use-viewposrt";
import { MainHeader } from "./MainHeader";
import { MobileHeader } from "./MobileHeader";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const Header = () => {
  const { isMobile } = useViewport();
  const isScrolled = useScrollPosition(50); // Change threshold if needed

  return (
    <header
      className={`${
        isScrolled ? "sticky bg-background border-b" : "absolute bg-transparent"
      } top-0 z-50 w-full transition-all`}
    >
      {isMobile ? <MobileHeader /> : <MainHeader />}
      
    </header>
  );
};

export default Header;

// components/header/index.tsx
"use client";
import { useViewport } from '@/hooks/use-viewposrt';
import { MainHeader } from './MainHeader';
import { MobileHeader } from './MobileHeader';

 const Header = () => {
  const { isMobile } = useViewport();

  return (
    <header className="sticky top-0 bg-background z-50 border-b">
      {isMobile ? <MobileHeader /> : <MainHeader />}
    </header>
  );
};

export default Header
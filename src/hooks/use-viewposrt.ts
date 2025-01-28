// hooks/use-viewport.ts
"use client";
import { useState, useEffect } from 'react';

export const useViewport = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isSSR = typeof window === 'undefined';
      const width = isSSR ? 0 : window.innerWidth;
      setIsMobile(width < 768 || window.matchMedia('(max-width: 767px)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile };
};
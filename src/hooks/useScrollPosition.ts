import { useEffect, useState } from "react";

export const useScrollPosition = (threshold: number = 0) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > threshold);
      setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY < threshold);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, lastScrollY]);

  return { isScrolled, isScrollingUp };
};

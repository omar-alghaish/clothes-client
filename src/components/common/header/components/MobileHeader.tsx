//mobile-header.tsx (Mobile Version)
"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Bell, Heart, Menu, ShoppingBasket, UserRound, X } from "lucide-react";
import Logo from "../../logo";
import LinksList from "./LinksList";
import { ChangeLang } from "../../changeLang";
import ThemeToggle from "../../toggleTheme";
import SearchInput from "./SearchInput";

export const MobileHeader = () => {
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const user = true
  return (
    <div className="md:hidden flex justify-between items-center p-4 w-full">
      {/* Menu Button */}
      <div className="flex items-center gap-4">
        <Menu
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        />

        {/* Logo */}
        <Logo />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user ? <div className="flex gap-4 items-center"><ShoppingBasket className="text-primary/80" size={20}/><Heart  className="text-primary/80" size={20}/> <Bell className="text-primary/80" size={20}/><UserRound className="text-primary/80" size={20}/></div> :         <Button variant="outline">Login</Button>}

      </div>

      {/* Sidebar */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[70vw] bg-background  z-50 transform transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <X
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>

        <div className="p-4 space-y-6">
        <SearchInput />
          <LinksList
            lang={locale}
            className="flex-col gap-4"
            onNavigate={() => setIsMenuOpen(false)}
          />

          <ChangeLang />
        </div>
      </div>
    </div>
  );
};

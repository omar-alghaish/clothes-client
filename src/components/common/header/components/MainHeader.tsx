// main-header.tsx (Desktop Version)
"use client";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import LinksList from "./LinksList";
import Logo from "../../logo";
import { ChangeLang } from "../../changeLang";
import ThemeToggle from "../../toggleTheme";
import SearchInput from "./SearchInput";
import { Bell, Heart, ShoppingBasket, UserRound } from "lucide-react";
import Link from "next/link";

export const MainHeader = () => {
  const locale = useLocale();
  const user = true;
  return (
    <div className="hidden md:flex justify-between items-center p-3 lg:p-4 w-full">
      <Logo />
      <LinksList lang={locale} className="gap-8" />
      <div className="flex gap-6 items-center">
        <ThemeToggle />
        <ChangeLang />
        <SearchInput />
        {user ? (
          <div className="flex  gap-4 items-center ">
            <Link href={`/${locale}/cart`}>
              <ShoppingBasket className="text-primary/80" size={20} />
            </Link>
            <Link href={`/${locale}/favorites`}>
              <Heart className="text-primary/80" size={20} />
            </Link>
            <Bell className="text-primary/80" size={20} />
            <Link href={`/${locale}/profile`}>
              <UserRound className="text-primary/80" size={20} />
            </Link>
          </div>
        ) : (
          <Button variant="outline">Login</Button>
        )}
      </div>
    </div>
  );
};

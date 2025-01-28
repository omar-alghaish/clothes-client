// main-header.tsx (Desktop Version)
"use client";
import { useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CloudUpload, Search } from "lucide-react";
import LinksList from "./LinksList";
import Logo from "../../logo";
import { ChangeLang } from "../../changeLang";
import ThemeToggle from "../../toggleTheme";

export const MainHeader = () => {
  const locale = useLocale();

  return (
    <div className="hidden md:flex justify-between items-center p-3 lg:p-4 w-full">
      <Logo />
      <LinksList lang={locale} className="gap-8" />
      <div className="flex gap-4 items-center">
        <ThemeToggle />
        <ChangeLang />
        <div className="relative">
          <Input
          className=""
            icon={<Search className="h-4 w-4" />}
            iconPosition="left"
            placeholder="Search..."
          />
          <CloudUpload className="absolute right-2 top-2.5 h-5 w-5 cursor-pointer" />
        </div>
        <Button variant="outline">Login</Button>
      </div>
    </div>
  );
};

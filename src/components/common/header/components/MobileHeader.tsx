//mobile-header.tsx (Mobile Version)
"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "../../logo";
import LinksList from "./LinksList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const MobileHeader = () => {
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="md:hidden flex justify-between items-center p-4 w-full">
      {/* Menu Button */}
      <Menu
        className="h-6 w-6 cursor-pointer"
        onClick={() => setIsMenuOpen(true)}
      />

      {/* Logo */}
      <Logo />

      {/* Login Button - Visible on mobile outside sidebar */}
      <Button variant="outline" className="!px-3">
        Login
      </Button>

      {/* Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)} />
      )}
      
      <div className={`fixed top-0 left-0 h-full w-64 bg-background z-50 transform transition-transform ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b flex justify-between items-center">
          <X 
            className="h-6 w-6 cursor-pointer" 
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
        
        <div className="p-4 space-y-6">
          <LinksList 
            lang={locale} 
            className="flex-col gap-4" 
            onNavigate={() => setIsMenuOpen(false)}
          />
          
          <Input
            icon={<Search className="h-4 w-4" />}
            iconPosition="left"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  );
};
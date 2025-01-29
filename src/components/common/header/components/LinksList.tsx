// components/header/links-list.tsx (Updated)
"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface ILinkListProps {
  lang: string;
  className?: string;
  onNavigate?: () => void;
}

const LinksList: FC<ILinkListProps> = ({ lang, className, onNavigate }) => {
  const t = useTranslations('NavbarLinks');
  const pathname = usePathname();

  const links = [
    { href: `/${lang}`, title: t('home') },
    { href: `/${lang}/shop`, title: t('shop') },
    { href: `/${lang}/about`, title: t('about') },
    { href: `/${lang}/contact`, title: t('contact') },
  ];

  return (
    <nav>
      <ul className={`flex ${className || ''}`}>
        {links.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <li key={index}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={
                  isActive 
                    ? "font-bold underline" 
                    : "text-primary/60 hover:text-primary transition-colors"
                }
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default LinksList;
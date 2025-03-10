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
    { href: `/${lang}/services`, title: t('services') },
    { href: `/${lang}/about`, title: t('about') },
    { href: `/${lang}/contact`, title: t('contact') },
  ];

  return (
    <nav>
      <ul className={`flex gap-6 ${className || ''}`}>
        {links.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <li key={index}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={`
                  ${isActive 
                    ? "font-semibold text-primary underline" 
                    : "text-foreground/60 hover:text-primary transition-colors duration-200 ease-in-out"}
                  text-lg
                `}
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

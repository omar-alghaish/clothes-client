"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const MainContent = () => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const handleLanguageChange = (value: string) => {
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${value}/${path}`);
  }

  return (
    <div>
      <Select onValueChange={handleLanguageChange} defaultValue={locale}>
        <SelectTrigger>
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ar">العربية</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default MainContent;

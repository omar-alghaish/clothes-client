'use client'; // <-- Mark as client component

import { NextIntlClientProvider, useLocale } from 'next-intl';
import { SessionProvider } from 'next-auth/react';
import { ReduxProvider } from '@/redux/reduxProvider';

// Define a type for the messages if you know its structure
interface Messages {
  [key: string]: string | Messages; // Example structure, adjust as needed
}

export function Providers({
  children,
  messages
}: {
  children: React.ReactNode;
  messages: Messages; // Use the defined type instead of 'any'
}) {
  const locale = useLocale();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReduxProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </ReduxProvider>
    </NextIntlClientProvider>
  );
}

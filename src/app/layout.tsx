import type { Metadata } from 'next';

import localFont from 'next/font/local';
import './globals.css';

import { ReactNode } from 'react';

import { Toaster } from '@/components/ui/Toaster';

import StoreProvider from './StoreProvider';

import '@/lib/translate';

export const metadata: Metadata = {
  title: {
    template: '',
    default: '',
  },
  description: '',
};

const involve = localFont({
  src: './fonts/Involve-Medium.ttf',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const isXML = typeof window !== 'undefined' && window.location.pathname.endsWith('.xml');

  if (isXML) return <>{children}</>;

  return (
    <html lang="ru" className={involve.className}>
      <body>
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}

import localFont from 'next/font/local';
import { FC, PropsWithChildren } from 'react';

import { Toaster } from '@/components/Toaster';

import StoreProvider from './StoreProvider';

import type { Metadata } from 'next';

import '@/lib/translate';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '',
    default: '',
  },
  description: '',
};

const involve = localFont({
  src: '../assets/fonts/Involve-Medium.ttf',
  display: 'swap',
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const isXML = typeof window !== 'undefined' && window.location.pathname.endsWith('.xml');

  if (isXML) return children;

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
};

export default RootLayout;

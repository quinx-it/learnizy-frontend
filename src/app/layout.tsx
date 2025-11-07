import localFont from 'next/font/local';
import { FC, PropsWithChildren } from 'react';

import { Toaster } from '@/components/Toaster';
import { getOgLocale } from '@/utils/getOgLocale';

import StoreProvider from './StoreProvider';

import type { Metadata } from 'next';

import '@/lib/translate';
import './globals.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || '';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  applicationName: 'Learnizy',
  generator: 'Next.js',
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon.ico', type: 'image/x-icon' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Learnizy',
  },

  formatDetection: { telephone: false },
  viewport: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no',
  other: {
    'X-UA-Compatible': 'IE=edge',
    'Content-Security-Policy': 'upgrade-insecure-requests',
  },
  openGraph: {
    type: 'website',
    siteName: 'Learnizy',
    images: [`${baseUrl}/img/logo.png`],
    locale: getOgLocale(),
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${baseUrl}/img/logo.png`],
  },
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

import localFont from 'next/font/local';

import { Toaster } from '@/components/Toaster';
import ThemeProvider from '@/lib/materialUI';
import { i18n, type Locale } from '@/lib/translate/i18nConfig';
import { getOgLocale, getBaseUrl } from '@/utils';

import StoreProvider from './StoreProvider';

import type { Metadata } from 'next';

import './globals.css';

const baseUrl = getBaseUrl();

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

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
  src: '../../assets/fonts/Involve-Medium.ttf',
  display: 'swap',
});

async function RootLayout(props: { children: React.ReactNode; params: Promise<{ lang: Locale }> }) {
  const { children, params: paramsBase } = props;
  const params = await paramsBase;

  const isXML = typeof window !== 'undefined' && window.location.pathname.endsWith('.xml');

  if (isXML) return children;

  return (
    <html lang={params.lang} className={involve.className}>
      <body>
        <StoreProvider>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

export default RootLayout;

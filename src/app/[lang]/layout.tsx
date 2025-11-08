import localFont from 'next/font/local';

import { Toaster } from '@/components/Toaster';
import ThemeProvider from '@/lib/materialUI';
import { DictionaryProvider } from '@/lib/translate';
import { i18n, type Locale } from '@/lib/translate';
import { getDictionary } from '@/lib/translate/getDictionary';
import { getOgLocale, getBaseUrl } from '@/utils';

import StoreProvider from './StoreProvider';

import type { Metadata, Viewport } from 'next';

import './globals.css';

const baseUrl = getBaseUrl();

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const paramsBase = await params;
  const dict = await getDictionary(paramsBase.lang);

  const alternates = i18n.locales.reduce(
    (acc, locale) => {
      acc[locale] = `${baseUrl}/${locale}/`;

      return acc;
    },
    {} as Record<string, string>,
  );

  return {
    title: dict.SEO.DEFAULT.TITLE,
    description: dict.SEO.DEFAULT.DESCRIPTION,
    keywords: dict.SEO.DEFAULT.KEYWORDS,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${paramsBase.lang}/`,
      languages: alternates,
    },
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

    other: {
      'X-UA-Compatible': 'IE=edge',
      'Content-Security-Policy': 'upgrade-insecure-requests',
    },
    openGraph: {
      title: dict.SEO.DEFAULT.OG_TITLE,
      description: dict.SEO.DEFAULT.OG_DESCRIPTION,
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
}

const involve = localFont({
  src: '../../assets/fonts/Involve-Medium.ttf',
  display: 'swap',
});

async function RootLayout(props: { children: React.ReactNode; params: Promise<{ lang: Locale }> }) {
  const { children, params: paramsBase } = props;
  const params = await paramsBase;
  const dict = await getDictionary(params.lang);

  const isXML = typeof window !== 'undefined' && window.location.pathname.endsWith('.xml');

  if (isXML) return children;

  return (
    <html lang={params.lang} className={involve.className}>
      <body>
        <StoreProvider>
          <ThemeProvider>
            <DictionaryProvider dict={dict} lang={params.lang}>
              {children}
              <Toaster />
            </DictionaryProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

export default RootLayout;

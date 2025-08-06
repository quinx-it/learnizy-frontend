import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import StoreProvider from './StoreProvider';

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
  children: React.ReactNode;
}>) {
  const isXML = typeof window !== 'undefined' && window.location.pathname.endsWith('.xml');

  if (isXML) return <>{children}</>;

  return (
    <html lang="ru" className={involve.className}>
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

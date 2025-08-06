import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Navbar } from '@/shared/components/navbar';
import StoreProvider from './StoreProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/store/store';

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
      <body className="bg-accent-background grid min-h-[100vh] grid-cols-[auto_1fr]">
        <StoreProvider>
          <PersistGate persistor={persistor} loading={null}>
            <Navbar />
            <main className="h-full max-h-screen w-full overflow-y-auto px-7.5 py-5">
              {children}
            </main>
          </PersistGate>
        </StoreProvider>
      </body>
    </html>
  );
}

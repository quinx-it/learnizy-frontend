import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/shared/components/header';
import { Footer } from '@shared/components/footer';
import { Toaster } from '@/shared/ui/sonner/sonner';

export const metadata: Metadata = {
  title: {
    template: '',
    default: '',
  },
  description:
    '',
};

const involve = localFont({
  src: './fonts/Involve-Regular.ttf',
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
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

import { Metadata } from 'next';
import { HomePage } from '@/shared/app-pages/home-page';

export const metadata: Metadata = {};

export default function Home() {
  return <HomePage />;
}

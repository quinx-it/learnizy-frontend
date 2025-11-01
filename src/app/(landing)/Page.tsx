import { Metadata } from 'next';
import { LandingPage } from '@/shared/AppPages/LandingPage';

export const metadata: Metadata = {};

export default function Home() {
  return <LandingPage />;
}

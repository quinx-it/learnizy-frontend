import { Metadata } from 'next';
import { LandingPage } from '@/shared/app-pages/landing-page';

export const metadata: Metadata = {};

export default function Home() {
  return <LandingPage />;
}

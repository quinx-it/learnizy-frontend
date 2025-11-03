import { Metadata } from 'next';
import { LandingPage } from '@/shared/appPages/landingPage';

export const metadata: Metadata = {};

export default function Home() {
  return <LandingPage />;
}

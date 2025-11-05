import { Metadata } from 'next';

import { LandingPage } from '@/appPages/landingPage';

export const metadata: Metadata = {};

export default function Home() {
  return <LandingPage />;
}

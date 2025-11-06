import { Metadata } from 'next';
import { FC } from 'react';

import { LandingPage } from '@/appPages/landingPage';

export const metadata: Metadata = {};

const Home: FC = () => {
  return <LandingPage />;
};

export default Home;

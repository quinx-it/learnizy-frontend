import { Metadata } from 'next';
import { FC } from 'react';

import NotFoundPage from '@/appPages/NotFoundPage';

export const metadata: Metadata = {
  title: '404 - Not Found',
  description: 'Sorry, this page does not exist.',
};

const GlobalNotFound: FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <NotFoundPage />
    </div>
  );
};

export default GlobalNotFound;

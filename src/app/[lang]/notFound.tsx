import { type Metadata } from 'next';
import { type FC } from 'react';

import NotFoundPage from '@/components/NotFoundPage';

import { PageWrapper } from './styles';

export const metadata: Metadata = {
  title: '404 - Not Found',
  description: 'Sorry, this page does not exist.',
};

const GlobalNotFound: FC = () => {
  return (
    <PageWrapper>
      <NotFoundPage />
    </PageWrapper>
  );
};

export default GlobalNotFound;

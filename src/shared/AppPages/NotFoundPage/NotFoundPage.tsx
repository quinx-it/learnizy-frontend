import { NotFoundComponent } from '@/shared/components/NotFoundComponent';
import Page from '@/shared/components/Page';
import React from 'react';

export const NotFoundPage = () => {
  return (
    <Page noIndex>
      <div className="flex h-[100vh] items-center justify-center">
        <NotFoundComponent />
      </div>
    </Page>
  );
};

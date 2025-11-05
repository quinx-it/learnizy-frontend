import React from 'react';

import { NotFoundComponent } from '@/components/NotFoundComponent';
import Page from '@/components/Page';

export const NotFoundPage = () => {
  return (
    <Page noIndex>
      <div className="flex h-[100vh] items-center justify-center">
        <NotFoundComponent />
      </div>
    </Page>
  );
};

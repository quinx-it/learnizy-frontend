import { FC } from 'react';

import { NotFoundComponent } from '@/components/NotFoundComponent';
import Page from '@/components/Page';

const NotFoundPage: FC = () => {
  return (
    <Page noIndex>
      <div className="flex h-[100vh] items-center justify-center">
        <NotFoundComponent />
      </div>
    </Page>
  );
};

export default NotFoundPage;

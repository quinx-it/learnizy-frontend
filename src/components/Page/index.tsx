import { FC } from 'react';

import Head from '@/components/Head';

import { IPageProps } from './typings';

const Page: FC<IPageProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <>
      <Head {...rest} />
      {children}
    </>
  );
};

export default Page;

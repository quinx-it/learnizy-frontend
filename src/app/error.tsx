'use client';

import { FC } from 'react';

import { ErrorSection, ErrorType } from '@/components/ErrorSection';

const Error: FC<ErrorType> = ({ error, reset }) => {
  return <ErrorSection error={error} reset={reset} />;
};

export default Error;

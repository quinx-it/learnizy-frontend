'use client';

import { FC } from 'react';

import ErrorSection from '@/components/ErrorSection';
import { ErrorType } from '@/components/ErrorSection/typings';

const Error: FC<ErrorType> = ({ error, reset }) => {
  return <ErrorSection error={error} reset={reset} />;
};

export default Error;

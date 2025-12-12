'use client';

import { type FC } from 'react';

import ErrorSection from '@/components/ErrorSection';
import { type ErrorType } from '@/components/ErrorSection/typings';

const Error: FC<ErrorType> = ({ error, reset }) => {
  return <ErrorSection error={error} reset={reset} />;
};

export default Error;

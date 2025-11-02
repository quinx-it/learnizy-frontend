'use client';
import { ErrorSection } from '@/shared/components/errorSection';
import { ErrorType } from '@/shared/components/errorSection/typings';

export default function Error({ error, reset }: ErrorType) {
  return <ErrorSection error={error} reset={reset} />;
}

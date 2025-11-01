'use client';
import { ErrorSection } from '@/shared/components/ErrorSection';
import { ErrorType } from '@/shared/components/ErrorSection/typings';

export default function Error({ error, reset }: ErrorType) {
  return <ErrorSection error={error} reset={reset} />;
}

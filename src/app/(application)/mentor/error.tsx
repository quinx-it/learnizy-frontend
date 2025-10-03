'use client';
import { ErrorSection } from '@/shared/components/error-section';
import { ErrorType } from '@/shared/components/error-section';

export default function Error({ error, reset }: ErrorType) {
  return <ErrorSection error={error} reset={reset} />;
}

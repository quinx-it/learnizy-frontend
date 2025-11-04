'use client';
import { ErrorSection, ErrorType } from '@/components/ErrorSection';

export default function Error({ error, reset }: ErrorType) {
  return <ErrorSection error={error} reset={reset} />;
}

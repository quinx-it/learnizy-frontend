'use client';
import { ErrorSection, ErrorType } from '@/shared/components/errorSection';

export default function Error({ error, reset }: ErrorType) {
  return <ErrorSection error={error} reset={reset} />;
}

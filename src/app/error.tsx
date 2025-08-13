'use client';
import { ErrorSection, ErrorType } from '@/shared/components/error-section';

export default function Error({
  error,
  reset,
}: ErrorType) {
  return <ErrorSection error={error} reset={reset} />;
}

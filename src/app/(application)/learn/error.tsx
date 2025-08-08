'use client';
import { ErrorSection } from '@/shared/components/error-section';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorSection error={error} reset={reset} />;
}

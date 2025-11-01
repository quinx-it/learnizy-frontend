'use client';

import { NotFoundPage } from '@/shared/AppPages/NotFoundPage';
import { ResetPasswordPage } from '@/shared/AppPages/AuthPages/ResetPasswordPage';
import { useSearchParams } from 'next/navigation';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) return <NotFoundPage />;

  return <ResetPasswordPage token={token} />;
}

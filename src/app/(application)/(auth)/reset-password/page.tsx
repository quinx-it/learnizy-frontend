'use client';

import { NotFoundPage } from '@/pages/notFound-page';
import { ResetPasswordPage } from '@/pages/auth-pages/reset-password-page';
import { useSearchParams } from 'next/navigation';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  if (!token) return <NotFoundPage />;

  return <ResetPasswordPage token={token} />;
}

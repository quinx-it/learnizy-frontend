'use client';

import { NotFoundPage } from '@/shared/appPages/notFoundPage';
import { ResetPasswordPage } from '@/shared/appPages/authPages/resetPasswordPage';
import { useSearchParams } from 'next/navigation';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) return <NotFoundPage />;

  return <ResetPasswordPage token={token} />;
}

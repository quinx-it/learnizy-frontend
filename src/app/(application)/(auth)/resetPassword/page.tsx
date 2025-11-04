'use client';

import { NotFoundPage } from '@/appPages/NotFoundPage';
import { ResetPasswordPage } from '@/appPages/authPages/ResetPasswordPage';
import { useSearchParams } from 'next/navigation';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) return <NotFoundPage />;

  return <ResetPasswordPage token={token} />;
}

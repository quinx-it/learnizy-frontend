'use client';

import { useSearchParams } from 'next/navigation';

import NotFoundPage from '@/components/NotFoundPage';
import ResetPasswordPage from '@/components/ResetPasswordPage';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) return <NotFoundPage />;

  return <ResetPasswordPage token={token} />;
};

export default ResetPassword;

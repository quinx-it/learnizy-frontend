'use client';

import { useSearchParams } from 'next/navigation';

import ResetPasswordPage from '@/appPages/authPages/ResetPasswordPage';
import NotFoundPage from '@/appPages/NotFoundPage';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) return <NotFoundPage />;

  return <ResetPasswordPage token={token} />;
};

export default ResetPassword;

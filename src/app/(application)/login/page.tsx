'use client';

import { useAppSelector } from '@/shared/hooks/redux';
import { selectUser } from '@/store/slices/auth/selectors';
import Link from 'next/link';

function LoginPage() {
  const user = useAppSelector(selectUser);

  return (
    <div>
      <Link href="/learn">Войти</Link>
      <br />
      {JSON.stringify(user)}
    </div>
  );
}

export default LoginPage;

'use client';

import { useAppSelector } from '@/shared/hooks/redux';
import { selectUser } from '@/store/slices/auth/selectors';

function LoginPage() {
  const user = useAppSelector(selectUser);

  return <div>{JSON.stringify(user)}</div>;
}

export default LoginPage;

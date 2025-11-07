import { FC } from 'react';

import RegisterForm from '@/components/auth/RegisterForm';
import CardWrapper from '@/components/CardWrapper';
import { Logo } from '@/components/Icons';

const RegisterPage: FC = () => {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <CardWrapper className="max-w-[472px] px-8 py-16">
        <Logo className="mb-12 w-full" />
        <RegisterForm />
      </CardWrapper>
    </div>
  );
};

export default RegisterPage;

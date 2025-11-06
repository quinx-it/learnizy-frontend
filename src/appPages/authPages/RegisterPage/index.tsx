import { FC } from 'react';

import RegisterForm from '@/components/auth/RegisterForm';
import CardWrapper from '@/components/CardWrapper';
import { Logo } from '@/components/Icons';
import Page from '@/components/Page';

const RegisterPageDesign: FC = () => {
  return (
    <Page noIndex>
      <div className="flex h-[100vh] items-center justify-center">
        <CardWrapper className="max-w-[472px] px-8 py-16">
          <Logo className="mb-12 w-full" />
          <RegisterForm />
        </CardWrapper>
      </div>
    </Page>
  );
};

export default RegisterPageDesign;

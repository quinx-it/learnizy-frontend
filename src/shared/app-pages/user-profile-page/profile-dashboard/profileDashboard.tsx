'use client';

import { CardWrapper } from '@/shared/components/card-wrapper';
import { routes } from '@/shared/constants';
import { Button } from '@/shared/ui/button';
import { Heading } from '@/shared/ui/typography';
import Link from 'next/link';

export const ProfileDashboard = () => {
  return (
    <CardWrapper className="max-w-full">
      <Heading variant="xl" className="mb-4">
        Панель управления профилем
      </Heading>
      <hr className="mb-8" />
      <div className='flex flex-col gap-4'>
        <Button variant="blue" asChild>
          <Link href={routes.userProfileSecuritySettings}>Настройки безопасности</Link>
        </Button>
        <Button variant="blue" asChild>
          <Link href={routes.userProfilePersonalData}>Настройки персональных данных</Link>
        </Button>
      </div>
    </CardWrapper>
  );
};

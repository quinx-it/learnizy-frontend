'use client';

import { CardWrapper } from '@/shared/components/card-wrapper';
import { routes } from '@/shared/constants';
import { EditPhotoIcon, ExitIcon, LockIcon, PersonIcon } from '@/shared/ui/icons';
import { DashboardLink } from './dashboard-link';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import { Text } from '@/shared/ui/typography';

export const ProfileDashboard = () => {
  return (
    <CardWrapper className="max-w-full">
      <div className="mb-8 w-full">
        <div className="mx-auto h-[152px] w-[152px] overflow-visible rounded-full mb-3 relative">
          <Image src="/images/astronaut1.png" alt="Profile Image" width={152} height={152} />
          <button className="absolute bottom-0 right-0 -translate-x-9/10">
            <EditPhotoIcon />
          </button>
        </div>

        <Text variant="m-bold" className="text-center">
          Имя Фамилия
        </Text>
      </div>
      <div className="flex flex-col gap-4">
        <DashboardLink href={routes.userProfilePersonalData} Icon={PersonIcon}>
          Персональные данные
        </DashboardLink>
        <DashboardLink href={routes.userProfileSecuritySettings} Icon={LockIcon}>
          Настройки доступа
        </DashboardLink>
        <Button variant="white" className="justify-start border-0 text-[16px]">
          <ExitIcon className="mr-2.5" /> Выход
        </Button>
      </div>
    </CardWrapper>
  );
};

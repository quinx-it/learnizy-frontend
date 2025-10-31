'use client';

import { CardWrapper } from '@/shared/components/card-wrapper';
import { routes } from '@/shared/constants';
import { EditPhotoIcon, ExitIcon, LockIcon, PersonIcon } from '@/shared/ui/icons';
import { DashboardLink } from './dashboard-link';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import { Text } from '@/shared/ui/typography';
import { useTranslation } from 'react-i18next';

export const ProfileDashboard = () => {
  const { t } = useTranslation();

  return (
    <CardWrapper className="h-full max-w-full">
      <div className="mb-8 w-full">
        <div className="relative mx-auto mb-3 h-[152px] w-[152px] overflow-visible rounded-full">
          <Image src="/images/astronaut1.webp" alt="Profile Image" width={152} height={152} />
          <button className="absolute right-0 bottom-0 -translate-x-9/10 cursor-pointer">
            <EditPhotoIcon />
          </button>
        </div>

        <Text variant="m-bold" className="text-center">
          {t('PROFILE.NAME')}
        </Text>
      </div>
      <div className="flex flex-col gap-4">
        <DashboardLink href={routes.user.userProfilePersonalData} Icon={PersonIcon}>
          {t('PROFILE.PERSONAL_DATA')}
        </DashboardLink>
        <DashboardLink href={routes.user.userProfileSecuritySettings} Icon={LockIcon}>
          {t('PROFILE.SECURITY_SETTINGS')}
        </DashboardLink>
        <Button variant="white" className="justify-start border-0 text-[16px]">
          <ExitIcon className="mr-2.5" /> {t('PROFILE.LOGOUT')}
        </Button>
      </div>
    </CardWrapper>
  );
};

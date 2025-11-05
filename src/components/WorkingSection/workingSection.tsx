'use client';

import Image from 'next/image';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';

import { WorkingSectionPropsType } from './typings';

export const WorkingSection: FC<WorkingSectionPropsType> = (props) => {
  const { className } = props;

  const { t } = useTranslation();

  return (
    <div className="flex h-full items-center">
      <div className={cn('m-auto flex flex-col items-center gap-6 text-center', className)}>
        <Image
          width={110}
          height={105}
          src="/images/astronaut1.webp"
          alt="astronaut"
          className="md:max-w-[110px]"
        />
        <Text className="whitespace-pre-wrap" variant="l">
          {t('COMMON.COMING_SOON_TEXT')}
        </Text>
      </div>
    </div>
  );
};

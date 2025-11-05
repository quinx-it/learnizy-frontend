'use client';

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { ProgressBar } from '@/ui/progress';
import { Text } from '@/ui/typography';

import { constants } from './constants';
import { CourseListItemType } from './typings';

export const CourseListItem: FC<CourseListItemType> = (props) => {
  const { title, number, status, progress, onClick } = props;

  const { t } = useTranslation();

  const progressBarValue = progress ?? 0;
  const isBlocked = status === 'BLOCKED';

  return (
    <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex w-full flex-col gap-1 sm:flex-1 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex flex-row items-center gap-2 sm:gap-4">
          <Text className="text-sm whitespace-nowrap sm:text-base">
            {' '}
            {`${t('MAIN_PAGE.MODULE')} ${number}`}
          </Text>
          <ProgressBar size={12} strokeWidth={2} variant="circular" value={progressBarValue} />
        </div>
        <Text variant="m" className="text-medium w-full break-words sm:w-auto">
          {title}
        </Text>
      </div>
      {status && (
        <Button
          variant="blue"
          size="small"
          className={cn('!h-8 !w-32 flex-shrink-0 !px-4 !py-1', {
            'cursor-not-allowed opacity-50': isBlocked,
          })}
          onClick={isBlocked ? undefined : onClick}
        >
          {t(constants.statuses[status])}
        </Button>
      )}
    </div>
  );
};

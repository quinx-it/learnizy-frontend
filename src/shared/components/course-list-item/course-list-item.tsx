'use client';
import { Button } from '@/shared/ui/button';
import { ProgressBar } from '@/shared/ui/progress';
import { Text } from '@/shared/ui/typography';
import React from 'react';
import { constants } from './constants';
import { cn } from '@/shared/lib/utils';

export type CourseListItemType = {
  title: string;
  number: number;
  status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';
  progress?: number;
  onClick?: () => void;
};

export const CourseListItem = ({
  title,
  number,
  status,
  progress,
  onClick,
}: CourseListItemType) => {
  const progressBarValue = progress ?? 0;

  const isBlocked = status === 'BLOCKED';

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Text className="whitespace-nowrap">{`Модуль ${number}`}</Text>
        <ProgressBar size={12} strokeWidth={2} variant="circular" value={progressBarValue} />
        <Text variant="m" className="text-medium w-[350px]">
          {title}
        </Text>
      </div>
      {status && (
        <Button
          variant={'blue'}
          size="small"
          className={cn('!h-8 !px-10 !py-1', {
            'cursor-not-allowed opacity-50': isBlocked,
          })}
          onClick={isBlocked ? undefined : onClick}
        >
          {constants.statuses[status]}
        </Button>
      )}
    </div>
  );
};

'use client';
import { Button } from '@/shared/ui/button';
import { ProgressBar } from '@/shared/ui/progress';
import { Text } from '@/shared/ui/typography';
import React from 'react';
import { constants } from './constants';
import { cn } from '@/shared/lib/utils';

export type CourseListItem = {
  title: string;
  number: number;
  status?: keyof typeof constants.statuses;
  progress?: number;
  onClick?: () => void;
};

export const CourseListItem = ({
  title,
  number,
  status,
  progress,
  onClick,
}: CourseListItem) => {
  const progressBarValue = progress ?? 0;

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Text className="whitespace-nowrap">Модуль {number}</Text>
        <ProgressBar size={12} strokeWidth={2} variant="circular" value={progressBarValue} />
        <Text variant="m" className="text-medium w-[380px]">
          {title}
        </Text>
      </div>
      {status && (
        <Button
          variant={status === 'COMPLETED' ? 'white' : 'blue'}
          size="small"
          className={cn('!h-8 !px-5 !py-1', {
            '!text-medium !border-transparent !bg-transparent': status === 'COMPLETED',
          })}
          onClick={onClick}
        >
          {constants.statuses[status]}
        </Button>
      )}
    </div>
  );
};

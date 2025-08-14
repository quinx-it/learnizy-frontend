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
};

export const CourseListItem = ({ title, number, status }: CourseListItem) => {
  const progressBarValue = 1;

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Text>Модуль {number}</Text>
        <ProgressBar size={12} strokeWidth={2} variant="circular" value={progressBarValue} />
        <Text variant={'m'} className="text-medium">
          {title}
        </Text>
      </div>
      {status && (
        <Button
          variant={status === 'completed' ? 'white' : 'blue'}
          size={'small'}
          className={cn({
            '!text-medium !border-transparent !bg-transparent px-3.5 py-0': status === 'completed',
          })}
        >
          {constants.statuses[status]}
        </Button>
      )}
    </div>
  );
};

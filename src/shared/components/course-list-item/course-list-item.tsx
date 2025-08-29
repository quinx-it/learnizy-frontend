'use client';
import { Button } from '@/shared/ui/button';
import { ProgressBar } from '@/shared/ui/progress';
import { Text } from '@/shared/ui/typography';
import React from 'react';
import { cn, percentage } from '@/shared/lib/utils';
import { truncateText } from './utils';
import { CustomTooltip } from '@/shared/ui/tooltip';

export type CourseListItem = {
  title: string;
  sequenceNumber: number;
  status?: string;
  isCompleted?: boolean;
  totalLessons: number;
  completedLessons: number;
};

export const CourseListItem = ({
  title,
  sequenceNumber,
  status,
  isCompleted,
  totalLessons,
  completedLessons,
}: CourseListItem) => {
  const progressBarValue = percentage(totalLessons, completedLessons);
  const truncatedTitle = truncateText(title);

  const titleElement = (
    <Text variant="m" className="text-medium">
      {truncatedTitle}
    </Text>
  );

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Text>Модуль {sequenceNumber}</Text>
        <ProgressBar size={12} strokeWidth={2} variant="circular" value={progressBarValue} />

        {truncatedTitle !== title ? (
          <CustomTooltip arrowClassName="bg-medium fill-medium" className='shadow bg-medium text-light' content={title}>{titleElement}</CustomTooltip>
        ) : (
          titleElement
        )}
      </div>
      {status && (
        <Button
          variant={isCompleted ? 'white' : 'blue'}
          size="small"
          className={cn({
            '!text-medium !border-transparent !bg-transparent px-3.5 py-0': isCompleted,
          })}
        >
          {status}
        </Button>
      )}
    </div>
  );
};

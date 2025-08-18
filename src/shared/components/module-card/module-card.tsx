'use client'
import React, { memo, useMemo } from 'react';
import { ModuleCardType } from './types';
import { Text } from '@/shared/ui/typography';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { renderModuleProgress } from './utils';
import { cn } from '@/shared/lib/utils';
import { constants } from './constants';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { DotTitle } from '@/shared/ui/dotTitle';
import { routes } from '@/shared/constants';
import { useRouter } from 'next/navigation';



const ModuleCardComponent = ({
  title,
  module_number,
  description,
  lessons,
  status,
  total_tasks,
  img_url,
  bonus,
  id,
  className,
}: ModuleCardType & { className?: string }) => {
  const { element: progressElement, status: progressStatus } = renderModuleProgress(status);
  const router = useRouter();

  const { active, completed, blocked } = constants.status;

  const { isBlocked, isCompleted, isActive } = useMemo(
    () => ({
      isBlocked: progressStatus === blocked,
      isCompleted: progressStatus === completed,
      isActive: progressStatus === active,
    }),
    [progressStatus, active, completed, blocked],
  );

  const moduleLabel = bonus ? constants.bonus : `Модуль ${module_number}`;

  const lessonInfo = `${lessons.length} уроков`;
  const taskInfo = `${total_tasks} заданий`;

  const cardClass = cn(
    'border border-transparent',
    {
      'border-medium border': isActive,
      'bg-soft/50 border-soft': bonus,
      'hover:border-medium': !isBlocked,
    },
    className,
  );

  const handleCardClick = () => {
    if (!isBlocked) router.push(`${routes.user.modules}/${id}`);
  };

  return (
    <CardWrapper onClick={handleCardClick} className={cardClass}>
      <div className="flex items-center justify-between gap-3">
        <div className="max-w-7/10 space-y-3.5">
          <div className="space-y-2">
            <DotTitle
              firstLabel={moduleLabel}
              secondLabel={title}
              firstVariant="m-bold"
              secondVariant="m"
            />
            <Text>{description}</Text>
          </div>
          <DotTitle
            firstLabel={lessonInfo}
            secondLabel={taskInfo}
            firstVariant="m"
            secondVariant="m"
            className={cn('text-soft', { 'text-medium': bonus })}
            dotClassName={cn('bg-soft mt-0.75 w-[3px]', { 'bg-medium': bonus })}
          />

          <div className="flex items-end gap-3">
            <Button
              disabled={isBlocked}
              variant={isCompleted ? 'white' : 'blue'}
              size={'small'}
              className="cursor-pointer"
            >
              {progressStatus}
            </Button>
            {progressElement}
          </div>
        </div>
        <Image width={115} height={115} src={img_url} alt="moduleimg" />
      </div>
    </CardWrapper>
  );
};

export const ModuleCard = memo(ModuleCardComponent)
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
import { routes } from '@/shared/constants';
import { useRouter } from 'next/navigation';

const Dot = ({ className }: { className?: string }) => (
  <span className={cn('bg-medium h-[3px] w-[3.2px] rounded-full', className)}></span>
);

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
    router.push(`${routes.modules}/${id}`);
  };

  return (
    <CardWrapper onClick={handleCardClick} className={cardClass}>
      <div className="flex items-center justify-between gap-3">
        <div className="max-w-7/10 space-y-3.5">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Text variant={'m-bold'} className="leading-[22px]">
                {moduleLabel}
              </Text>
              <Dot />
              <Text variant={'m'} className="text-medium">
                {title}
              </Text>
            </div>
            <Text>{description}</Text>
          </div>
          <div className={cn('text-soft flex items-center gap-1.5', { 'text-medium': bonus })}>
            <Text>{lessonInfo}</Text>
            <Dot className={cn('bg-soft mt-0.75 w-[3px]', { 'bg-medium': bonus })} />
            <Text>{taskInfo}</Text>
          </div>
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
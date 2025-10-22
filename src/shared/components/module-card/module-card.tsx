'use client';
import React, { memo, useMemo, FC } from 'react';
import { Text } from '@/shared/ui/typography';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { renderModuleProgress } from './utils';
import { cn, pluralize } from '@/shared/lib/utils';
import { constants } from './constants';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { DotTitle } from '@/shared/ui/dotTitle';
import { routes } from '@/shared/constants';
import { useRouter } from 'next/navigation';
import { IModuleInfo } from '@/api/endpoints/modules/types';

const ModuleCardComponent: FC<IModuleInfo & { className?: string }> = (props) => {
  const {
    totalLessons,
    completedLessons,
    completionStatus,
    description,
    title,
    id,
    sequenceOrder,
    className,
  } = props;

  const bonus = false;

  const { element: progressElement, status: progressStatus } = renderModuleProgress(
    completionStatus,
    completedLessons,
    totalLessons,
  );

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

  const moduleLabel = bonus ? constants.bonus : `Модуль ${sequenceOrder}`;

  const lessonInfo = pluralize(totalLessons, 'урок', 'урока', 'уроков');
  const taskInfo = pluralize(totalLessons * 2, 'тест', 'теста', 'заданий');
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
      <div className="flex h-full items-start justify-between gap-3">
        <div className="flex h-full max-w-7/10 flex-col justify-between space-y-3.5">
          <div className="space-y-2">
            <DotTitle
              firstLabel={moduleLabel}
              secondLabel={title}
              firstVariant="m-bold"
              secondVariant="m"
              secondClassName="font-normal"
            />
            <Text>{description}</Text>
          </div>
          <div className="space-y-2">
            <DotTitle
              firstLabel={lessonInfo}
              secondLabel={taskInfo}
              firstVariant="m"
              secondVariant="m"
              className={cn('text-soft', { 'text-medium': bonus })}
              dotClassName={'text-soft'}
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
        </div>
        <Image width={115} height={115} src={'/images/astronaut1.webp'} alt="moduleimg" />
      </div>
    </CardWrapper>
  );
};

export const ModuleCard = memo(ModuleCardComponent);

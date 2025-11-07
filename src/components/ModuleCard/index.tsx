'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo, useMemo, FC } from 'react';
import { useSelector } from 'react-redux';

import { IModuleInfo } from '@/api/endpoints/modules';
import Button from '@/components/Button';
import CardWrapper from '@/components/CardWrapper';
import DotTitle from '@/components/DotTitle';
import { Text } from '@/components/Typography';
import { routes } from '@/constants';
import { cn, pluralize } from '@/lib/utils';
import { selectUserRole } from '@/store/slices/auth/selectors';
import { UserRole } from '@/store/slices/auth/typings';

import { constants } from './constants';
import { renderModuleProgress } from './utils';

const ModuleCardComponent: FC<IModuleInfo & { className?: string }> = (props) => {
  const {
    totalLessons,
    completedLessons,
    completionStatus,
    description,
    title,
    id,
    // sequenceOrder,
    className,
  } = props;

  const t = (label: string) => label;
  const role = useSelector(selectUserRole);
  const isMentor = role === UserRole.MENTOR;

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

  /* need to fix */
  const moduleLabel = bonus ? t('MODULES_CARD.BONUS') : t('MODULES_CARD.MODULE');

  const lessonInfo = `${pluralize(
    totalLessons,
    t('MODULES_CARD.LESSON_ONE'),
    t('MODULES_CARD.LESSON_TWO'),
    t('MODULES_CARD.LESSON_MANY'),
  )}`;

  const taskInfo = `${pluralize(
    totalLessons * 2,
    t('MODULES_CARD.TASK_ONE'),
    t('MODULES_CARD.TASK_TWO'),
    t('MODULES_CARD.TASK_MANY'),
  )}`;

  const cardClass = cn(
    'border border-transparent',
    {
      'border-medium border': isActive,
      'bg-soft/50 border-soft': bonus,
      'hover:border-medium': !isBlocked || isMentor,
    },
    className,
  );

  const handleCardClick = () => {
    if (isBlocked && !isMentor) return;

    router.push(isMentor ? `${routes.mentor.modules}/${id}` : `${routes.user.modules}/${id}`);
  };

  return (
    <CardWrapper onClick={handleCardClick} className={cardClass}>
      <div className="flex h-full items-start justify-between gap-3">
        <div className="flex h-full max-w-7/10 flex-col justify-between space-y-3.5">
          <div className="space-y-2">
            <DotTitle
              firstLabel={t(moduleLabel)}
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
              dotClassName="text-soft"
            />

            <div className="flex items-end gap-3">
              <Button
                disabled={!isMentor && isBlocked}
                variant={isCompleted ? 'white' : 'blue'}
                size="small"
                className="cursor-pointer"
              >
                {isMentor && isBlocked ? t('MODULES_CARD.START') : t(progressStatus)}
              </Button>
              {progressElement}
            </div>
          </div>
        </div>
        <Image width={115} height={115} src="/images/astronaut1.webp" alt="moduleimg" />
      </div>
    </CardWrapper>
  );
};

export const ModuleCard = memo(ModuleCardComponent);

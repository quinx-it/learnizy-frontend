import { CardWrapper } from '@/shared/components/card-wrapper';
import { cn, normalizeToFive } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Heading } from '@/shared/ui/typography';
import React from 'react';
import { StarIcon } from '@/shared/ui/icons';
import { Lesson } from '@/api/endpoints/lessons/types';
import { CompletionStatus } from '@/api/endpoints/types';

type LessonCardProps = Lesson & { index: number };

export const LessonCard = ({ id, title, progress, index }: LessonCardProps) => {
  const status = CompletionStatus.IN_PROGRESS;
  // const blocked = status === CompletionStatus.BLOCKED;
  const blocked = false;
  const active = status === CompletionStatus.IN_PROGRESS;
  const taskProgress = [
    { title: 'Теория', status: progress.theoryCompleted },
    { title: 'Устное закрепление материала', status: progress.voiceTaskCompleted },
    { title: 'Тестовое задание ', status: progress.testTaskCompleted },
  ];

  return (
    <CardWrapper
      key={id}
      className={cn('border-soft border !shadow-none', {
        'border-medium border-2 !shadow-lg': active,
        'border-gray': blocked,
      })}
    >
      <div className="relative space-y-3">
        <div className="flex justify-between">
          <Heading>
            Урок {index + 1} -{' '}
            <span
              className={cn('text-soft', {
                'text-medium': active,
                'text-gray': blocked,
              })}
            >
              {title}
            </span>
          </Heading>
          <div className="flex items-center gap-2">
            {!blocked && (
              <Button
                size={active ? 'medium' : 'small'}
                variant={active ? 'blue' : 'white'}
                className={cn('pointer-events-none mr-2', {
                  'pointer-events-auto absolute right-0 bottom-0': active,
                })}
              >
                {active ? 'Начать' : 'Проверено'}
              </Button>
            )}
            <StarIcon type={blocked ? 'disabled' : 'gold'} />
            <Heading className={cn('text-medium', { 'text-gray': blocked })}>
              {!!progress.testResult ? normalizeToFive(progress.testResult) : 0}/5
            </Heading>
          </div>
        </div>
        <ul className="marker:text-medium list-disc space-y-1 pl-5">
          {taskProgress.map(({ title, status }, index) => (
            <li className={cn(status ? "text-success" : 'text-error')} key={index}>
              {title}
            </li>
          ))}
        </ul>
      </div>
    </CardWrapper>
  );
};

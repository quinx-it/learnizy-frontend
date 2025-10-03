import { CardWrapper } from '@/shared/components/card-wrapper';
import { cn, normalizeToFive } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Heading } from '@/shared/ui/typography';
import React from 'react';
import { StarIcon } from '@/shared/ui/icons';
import { Lesson, LessonProgress } from '@/api/endpoints/lessons/types';

type LessonCardProps = Lesson & {
  progress: LessonProgress;
  index: number;
  onClick: (lessonId: number) => void;
};

export const LessonCard = ({ id, title, progress, index, onClick }: LessonCardProps) => {
  const blocked = false;
  const active = true;

  const taskProgress = [
    { title: 'Теория' },
    { title: 'Устное закрепление материала' },
    { title: 'Тестовое задание ' },
  ];

  return (
    <CardWrapper
      className={cn('border-soft cursor-pointer border !shadow-none', {
        'border-medium border-2 !shadow-lg': active,
        'border-gray': blocked,
      })}
      onClick={() => onClick(id)}
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
                onClick={() => onClick(id)}
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
          {taskProgress.map(({ title }, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
    </CardWrapper>
  );
};

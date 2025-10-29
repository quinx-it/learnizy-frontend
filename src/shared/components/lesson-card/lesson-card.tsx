import { CardWrapper } from '@/shared/components/card-wrapper';
import { cn, normalizeToFive } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Heading } from '@/shared/ui/typography';
import React, { FC } from 'react';
import { StarIcon } from '@/shared/ui/icons';
import { LessonCardPropsType } from './typings';

export const LessonCard: FC<LessonCardPropsType> = (props) => {
  const { id, title, progress, index, onClick } = props;

  const blocked = false;
  const active = true;

  const taskProgress = [
    { title: 'Теория' },
    { title: 'Устное закрепление материала' },
    { title: 'Тестовое задание' },
  ];

  return (
    <CardWrapper
      className={cn('border-soft cursor-pointer border !shadow-none', {
        'border-medium border-2 !shadow-lg': active,
        'border-gray': blocked,
      })}
      onClick={() => onClick(id)}
    >
      <div className="flex">
        <div className="flex-1 space-y-2">
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

          <ul className="marker:text-medium mt-2 list-disc space-y-1 pl-5 break-words">
            {taskProgress.map(({ title }, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-end justify-between">
          <div className="flex items-center gap-1 self-end">
            <StarIcon type={blocked ? 'disabled' : 'gold'} />
            <Heading className={cn('text-medium', { 'text-gray': blocked })}>
              {!!progress.testResult ? normalizeToFive(progress.testResult) : 0}/5
            </Heading>
          </div>

          {!blocked && (
            <Button
              size={active ? 'medium' : 'small'}
              variant={active ? 'blue' : 'white'}
              className={cn('pointer-events-none', {
                'pointer-events-auto': active,
              })}
              onClick={() => onClick(id)}
            >
              {active ? 'Начать' : 'Проверено'}
            </Button>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};

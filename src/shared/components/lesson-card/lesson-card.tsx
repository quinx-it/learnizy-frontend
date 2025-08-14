import { CardWrapper } from '@/shared/components/card-wrapper';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Heading } from '@/shared/ui/typography';
import React from 'react';
import { lessonStatuses, LessonType } from '@/shared/components/module-card/types';
import { StarIcon } from '@/shared/ui/icons';

type LessonCardProps = LessonType & {index:number};

export const LessonCard = ({ id, name, status, stars, total_stars, tasks, index }: LessonCardProps) => {
  const blocked = status === lessonStatuses.BLOCKED;
  const active = status === lessonStatuses.ACTIVE;

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
              {name}
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
              {stars}/{total_stars}
            </Heading>
          </div>
        </div>
        <ul className="marker:text-medium list-disc space-y-1 pl-5">
          {tasks.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </div>
    </CardWrapper>
  );
};

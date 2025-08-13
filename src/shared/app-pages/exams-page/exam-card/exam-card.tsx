'use client';

import { CardWrapper } from '@/shared/components/card-wrapper';
import { Button } from '@/shared/ui/button';
import { DotTitle } from '@/shared/ui/dotTitle';
import React from 'react';
import { ExamCardProps, ExamStatus } from '../types';
import { Text } from '@/shared/ui/typography';
import Link from 'next/link';
import { routes } from '@/shared/constants';

export const ExamCard = ({ exam, status }: ExamCardProps) => {
  const { title, description, questions, time } = exam;

  const buttonConfig: Record<ExamStatus, React.ComponentProps<typeof Button>> = {
    [ExamStatus.Completed]: {},
    [ExamStatus.Failed]: {
      children: 'Попробовать снова',
      variant: 'blue',
      size: 'medium',
      className: 'absolute right-6 top-6',
    },
    [ExamStatus.Available]: {
      children: 'Начать экзамен',
      variant: 'blue',
      size: 'medium',
      className: 'absolute right-6 top-6',
    },
    [ExamStatus.Unavailable]: {
      children: 'Начать экзамен',
      variant: 'blue',
      size: 'medium',
      disabled: true,
      className: 'absolute right-6 top-6',
    },
  };

  const examStatusUi: Record<ExamStatus, React.ReactNode> = {
    [ExamStatus.Completed]: (
      <div className="flex gap-4">
        <Text variant="m" className="border-soft rounded-full border bg-transparent px-6 py-2">
          Экзамен сдан
        </Text>
      </div>
    ),
    [ExamStatus.Failed]: (
      <div className="flex gap-4">
        <Text variant="m" className="border-error rounded-full border bg-transparent px-6 py-2">
          Экзамен не сдан
        </Text>
      </div>
    ),
    [ExamStatus.Available]: (
      <Text variant="l">Вы завершили все уроки — теперь можно сдать экзамен</Text>
    ),
    [ExamStatus.Unavailable]: (
      <Text variant="l">
        Доступен после завершения всех{' '}
        <Link href={routes.lessons} className="text-medium !underline">
          уроков
        </Link>{' '}
        модуля
      </Text>
    ),
  };

  return (
    <CardWrapper className="relative flex max-w-full flex-col gap-4">
      <DotTitle
        firstLabel={title}
        secondLabel={description}
        firstVariant="l"
        secondVariant="l"
        firstClassName="text-[24px] leading-8"
        secondClassName="text-[24px] leading-8"
        dotClassName="w-1 h-1"
      />

      <DotTitle
        firstLabel={`📋${questions} вопросов`}
        secondLabel={`⏱ ${time} минут`}
        firstVariant="m"
        secondVariant="m"
        dotClassName="w-1 h-1"
        className="text-medium"
      />

      {status !== ExamStatus.Completed && <Button {...buttonConfig[status]} />}
      {examStatusUi[status]}
    </CardWrapper>
  );
};

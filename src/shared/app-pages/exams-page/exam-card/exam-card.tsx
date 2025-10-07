'use client';

import { CardWrapper } from '@/shared/components/card-wrapper';
import { Button } from '@/shared/ui/button';
import { DotTitle } from '@/shared/ui/dotTitle';
import React, { ComponentProps, ReactNode } from 'react';
import { ExamCardProps, ExamStatus } from '../types';
import { Text } from '@/shared/ui/typography';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export const ExamCard = ({ exam, status }: ExamCardProps) => {
  const { title, description, questions, time } = exam;
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (path: string) => {
    router.push(`${pathname}/${path}`);
  };

  const buttonConfig: Record<ExamStatus, ComponentProps<typeof Button>> = {
    [ExamStatus.Completed]: {},
    [ExamStatus.Failed]: {
      children: 'Попробовать снова',
    },
    [ExamStatus.Available]: {
      children: 'Начать экзамен',
    },
    [ExamStatus.Unavailable]: {
      children: 'Начать экзамен',
      disabled: true,
    },
  };

  const examStatusUi: Record<ExamStatus, ReactNode> = {
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
        <Link href={`modules/${exam.moduleId}`} className="text-medium !underline">
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

      {status !== ExamStatus.Completed && (
        <Button
          onClick={() => handleNavigate(`/${exam.moduleId}/${exam.testId}/test`)}
          className="absolute top-6 right-6"
          variant="blue"
          size="medium"
        />
      )}
      {(status === ExamStatus.Completed || status === ExamStatus.Failed) && (
        <Button
          onClick={() => handleNavigate(`/${exam.moduleId}/${exam.testId}/result`)}
          className="absolute top-20 right-6"
          variant="blue"
          size="medium"
        >
          Результаты
        </Button>
      )}
      {examStatusUi[status]}
    </CardWrapper>
  );
};

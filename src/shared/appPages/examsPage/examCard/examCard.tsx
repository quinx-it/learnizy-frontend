'use client';

import { CardWrapper } from '@/shared/components/cardWrapper';
import { Button } from '@/shared/ui/button';
import { DotTitle } from '@/shared/ui/dotTitle';
import React, { ComponentProps, ReactNode, FC } from 'react';
import { ExamCardPropsType, ExamStatus } from '../typings';
import { Text } from '@/shared/ui/typography';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export const ExamCard: FC<ExamCardPropsType> = (props) => {
  const { exam, status } = props;

  const { t } = useTranslation();

  const { title, description, questions, time } = exam;
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (path: string) => {
    router.push(`${pathname}/${path}`);
  };

  const buttonConfig: Record<ExamStatus, ComponentProps<typeof Button>> = {
    [ExamStatus.Completed]: {},
    [ExamStatus.Failed]: {
      children: t('EXAMS.BUTTONS.RETRY'),
    },
    [ExamStatus.Available]: {
      children: t('EXAMS.BUTTONS.START'),
    },
    [ExamStatus.Unavailable]: {
      children: t('EXAMS.BUTTONS.START'),
      disabled: true,
    },
  };

  const examStatusUi: Record<ExamStatus, ReactNode> = {
    [ExamStatus.Completed]: (
      <div className="flex gap-4">
        <Text variant="m" className="border-soft rounded-full border bg-transparent px-6 py-2">
          {t('EXAMS.STATUS.COMPLETED')}
        </Text>
      </div>
    ),
    [ExamStatus.Failed]: (
      <div className="flex gap-4">
        <Text variant="m" className="border-error rounded-full border bg-transparent px-6 py-2">
          {t('EXAMS.STATUS.FAILED')}
        </Text>
      </div>
    ),
    [ExamStatus.Available]: <Text variant="l">{t('EXAMS.STATUS.AVAILABLE')}</Text>,
    [ExamStatus.Unavailable]: (
      <Text variant="l">
        {t('EXAMS.STATUS.UNAVAILABLE', { moduleLink: exam.moduleId })}
        <Link href={`modules/${exam.moduleId}`} className="text-medium !underline">
          {t('EXAMS.STATUS.LESSONS')}
        </Link>
      </Text>
    ),
  };

  return (
    <CardWrapper className="flex max-w-full flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex-1 space-y-4">
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
          firstLabel={t('EXAMS.QUESTIONS_COUNT', { count: questions })}
          secondLabel={t('EXAMS.DURATION', { time })}
          firstVariant="m"
          secondVariant="m"
          dotClassName="w-1 h-1"
          className="text-medium"
        />
        {examStatusUi[status]}
      </div>

      <div className="flex flex-row gap-2 md:w-auto md:flex-col lg:mt-0 lg:items-end">
        {status !== ExamStatus.Completed && (
          <Button
            onClick={() => handleNavigate(`/${exam.moduleId}/${exam.testId}/test`)}
            variant="blue"
            size="medium"
            {...buttonConfig[status]}
          />
        )}
        {(status === ExamStatus.Completed || status === ExamStatus.Failed) && (
          <Button
            onClick={() => handleNavigate(`/${exam.moduleId}/${exam.testId}/result`)}
            variant="blue"
            size="medium"
          >
            Результаты
          </Button>
        )}
      </div>
    </CardWrapper>
  );
};

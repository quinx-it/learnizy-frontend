import { CardWrapper } from '@/shared/components/card-wrapper';
import { routes } from '@/shared/constants';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { Button } from '@/shared/ui/button';
import { DotTitle } from '@/shared/ui/dotTitle';
import { CheckIcon, LockColorIcon } from '@/shared/ui/icons';
import { ProgressBar } from '@/shared/ui/progress';
import { Text } from '@/shared/ui/typography';
import Link from 'next/link';
import React from 'react';
import { constants } from './constants';
import { LessonCard } from '@/shared/components/lesson-card';
import type {LessonType} from '@/shared/components/module-card/types'

type ModuleItemPageProps = {
  id: string;
};


export const ModuleItemPage = ({ id }: ModuleItemPageProps) => {
  const { breadcrumbs, examAvailableNumber, mockedModuleInfo } = constants;

 
  const isAvailableExam = (progressValue: number) => progressValue > examAvailableNumber;

  return (
    <>
      <Breadcrumbs
        items={breadcrumbs(id)}
        rootHref={routes.modules}
        rootLabel={'Структура обучения'}
      />

      <CardWrapper className="flex flex-col gap-5">
        <div className="space-y-1">
          <DotTitle
            heading
            firstClassName="text-[24px]"
            secondClassName="text-[24px]"
            firstLabel={`Модуль ${id}`}
            secondLabel={mockedModuleInfo.title}
          />
          <DotTitle
            firstClassName="text-soft"
            secondClassName="text-soft"
            firstVariant="m"
            dotClassName="bg-soft"
            firstLabel={`${mockedModuleInfo.lessons.length} уроков`}
            secondLabel={`${mockedModuleInfo.totalTasks} заданий`}
          />
        </div>

        <ul className="mt-3 space-y-3">
          {mockedModuleInfo.lessons.map((lesson: LessonType, index) => {
            return <LessonCard key={lesson.id} index={index} {...lesson} />;
          })}
        </ul>

        <div className="flex items-center gap-2">
          {isAvailableExam(mockedModuleInfo.progress) ? (
            <>
              <CheckIcon color="blue" />
              <Text variant={'l'}>
                Модуль завершён — самое время пройти{' '}
                <Link className="text-medium !underline" href={routes.exams}>
                  экзамен
                </Link>
              </Text>
            </>
          ) : (
            <>
              <LockColorIcon />
              <Text variant={'l'}>
                После завершения всех уроков откроется доступ к{' '}
                <Link className="text-medium !underline" href={routes.exams}>
                  экзамену
                </Link>
              </Text>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button disabled={!isAvailableExam(mockedModuleInfo.progress)} className="mr-2">
            Начать экзамен
          </Button>
          <ProgressBar
            strokeWidth={6}
            size={27}
            value={mockedModuleInfo.progress}
            variant="circular"
          />
          <Text variant={'l'} className="font-montserrat text-medium font-semibold">
            {mockedModuleInfo.progress}%
          </Text>
        </div>
      </CardWrapper>
    </>
  );
};

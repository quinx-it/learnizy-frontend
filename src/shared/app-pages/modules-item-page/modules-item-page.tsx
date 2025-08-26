'use client';
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
import { useGetModuleQuery } from '@/api/endpoints/modules/modules';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { ErrorSection } from '@/shared/components/error-section';
import { pluralize } from '@/shared/lib/utils';
import { Lesson } from '@/api/endpoints/lessons/types';
import { usePathname, useRouter } from 'next/navigation';

type ModuleItemPageProps = {
  id: string;
};

export const ModuleItemPage = ({ id }: ModuleItemPageProps) => {
  const pathname = usePathname();
  const router = useRouter();
  
  const { breadcrumbs, examAvailableNumber } = constants;

  const {
    data: module,
    isLoading,
    isError,
    refetch,
  } = useGetModuleQuery({ courseId: 1, moduleId: +id });

  if (isLoading) {
    return <FullscreenLoader />;
  }

  if (isError || !module) {
    return <ErrorSection reset={refetch} />;
  }

  const { totalLessons, completedLessons, title, sequenceNumber } = module.moduleInfo;
  const lessons = module.lessons;
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  console.log(module);

  const isAvailableExam = (progressValue: number) => progressValue > examAvailableNumber;

  const handleLessonCardClick = (lessonId: number) => {
    router.push(`${pathname}/${lessonId}`);
  };

  return (
    <>
      <Breadcrumbs
        items={breadcrumbs(sequenceNumber)}
        rootHref={routes.user.modules}
        rootLabel={'Структура обучения'}
      />

      <CardWrapper className="flex flex-col gap-5">
        <div className="space-y-1">
          <DotTitle
            heading
            firstClassName="text-[24px]"
            secondClassName="text-[24px]"
            firstLabel={`Модуль ${sequenceNumber}`}
            secondLabel={title}
            dotClassName='min-w-[6px] min-h-[6px] self-center !m-0'
          />
          <DotTitle
            firstClassName="text-soft"
            secondClassName="text-soft"
            firstVariant="m"
            dotClassName="bg-soft"
            firstLabel={pluralize(totalLessons, 'урок', 'урока', 'уроков')}
            secondLabel={pluralize(totalLessons * 2, 'тест', 'теста', 'тестов')}
          />
        </div>

        <ul className="mt-3 space-y-3">
          {lessons.map((lesson: Lesson, index) => {
            return <LessonCard onClick={handleLessonCardClick} key={lesson.id} index={index} {...lesson} />;
          })}
        </ul>

        <div className="flex items-center gap-2">
          {isAvailableExam(progress) ? (
            <>
              <CheckIcon color="blue" />
              <Text variant={'l'}>
                Модуль завершён — самое время пройти{' '}
                <Link className="text-medium !underline" href={routes.user.exams}>
                  экзамен
                </Link>
              </Text>
            </>
          ) : (
            <>
              <LockColorIcon />
              <Text variant={'l'}>
                После завершения всех уроков откроется доступ к{' '}
                <Link className="text-medium !underline" href={routes.user.exams}>
                  экзамену
                </Link>
              </Text>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button disabled={!isAvailableExam(progress)} className="mr-2">
            Начать экзамен
          </Button>
          <ProgressBar strokeWidth={6} size={27} value={progress} variant="circular" />
          <Text variant={'l'} className="font-montserrat text-medium font-semibold">
            {progress}%
          </Text>
        </div>
      </CardWrapper>
    </>
  );
};

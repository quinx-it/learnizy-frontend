'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import { useGetTestByLessonIdQuery } from '@/api/endpoints/test';
import { type ParamsType } from '@/app/[lang]/(application)/mentor/courses/typings';
import TestPage from '@/components/TestPage';
import { type TestDataType } from '@/components/TestPage/typings';

const CourseLessonTest: FC = () => {
  const params = useParams<ParamsType>();
  const { lessonId, moduleId } = params;

  const { data, isLoading, isError, refetch } = useGetTestByLessonIdQuery(+(lessonId ?? 0));

  if (!moduleId || !lessonId) {
    return null;
  }

  return (
    <TestPage
      moduleId={moduleId}
      lessonId={lessonId}
      lessonTest={data as TestDataType}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    />
  );
};

export default CourseLessonTest;

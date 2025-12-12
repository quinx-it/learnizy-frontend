'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import { useGetTestByLessonIdQuery } from '@/api/endpoints/test';
import TestPage from '@/components/TestPage';
import { type TestDataType } from '@/components/TestPage/typings';

import { type ParamsType } from '../../../typings';

const LessonTest: FC = () => {
  const params = useParams<ParamsType>();
  const { module, lesson } = params;

  const { data, isLoading, isError, refetch } = useGetTestByLessonIdQuery(+lesson);

  return (
    <TestPage
      moduleId={module}
      lessonId={lesson}
      lessonTest={data as TestDataType}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    />
  );
};

export default LessonTest;

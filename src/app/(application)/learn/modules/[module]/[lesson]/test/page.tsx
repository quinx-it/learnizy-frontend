'use client';

import { TestPage, TestDataType } from '@/shared/appPages/testPage';
import { useParams } from 'next/navigation';
import { useGetTestByLessonIdQuery } from '@/api/endpoints/test';

import { ParamsType } from '../../../typings';

const LessonTest = () => {
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

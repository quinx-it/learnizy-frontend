'use client';

import { TestPage } from '@/shared/AppPages/TestPage';
import { TestDataType } from '@/shared/AppPages/TestPage/typings';
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

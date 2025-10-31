'use client';

import { TestPage } from '@/pages/test-page';
import { TestDataType } from '@/pages/test-page/typings';
import { NotFoundPage } from '@/pages/notFound-page';
import { useParams } from 'next/navigation';
import { useGetTestByLessonIdQuery } from '@/api/endpoints/test';
import { ParamsType } from '../../../typings';

const LessonTest = () => {
  const params = useParams<ParamsType>();

  const moduleId = params?.module ?? '';
  const lessonId = params?.lesson ?? '';

  const { data, isLoading, isError, refetch } = useGetTestByLessonIdQuery(
    lessonId ? +lessonId : 0,
    {
      skip: !lessonId,
    },
  );

  if (!params || !moduleId || !lessonId) {
    return <NotFoundPage />;
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

export default LessonTest;

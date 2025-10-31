'use client';

import { TestPage } from '@/pages/test-page';
import { TestDataType } from '@/pages/test-page/typings';
import { NotFoundPage } from '@/pages/notFound-page';
import { useParams } from 'next/navigation';
import { useGetTestByLessonIdQuery } from '@/api/endpoints/test';
import { ParamsType } from '../../../typings';

const LessonTest = () => {
  const params = useParams<ParamsType>();

  if (!params || !params.module || !params.lesson) {
    return <NotFoundPage />;
  }

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

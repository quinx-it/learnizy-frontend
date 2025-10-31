'use client';

import { TestPage } from '@/pages/test-page';
import { TestDataType } from '@/pages/test-page/typings';
import { useParams } from 'next/navigation';
import { useGetExamByIdQuery } from '@/api/endpoints/exams';
import { ParamsType } from '../../../typings';
import { NotFoundPage } from '@/pages/notFound-page';

const ExamPage = () => {
  const params = useParams<ParamsType>();

  if (!params || !params.module || !params.testId) {
    return <NotFoundPage />;
  }

  const { module, testId } = params;
  const { data, isLoading, isError, refetch } = useGetExamByIdQuery(+testId);

  return (
    <TestPage
      moduleId={module}
      lessonId={testId}
      lessonTest={data as TestDataType}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    />
  );
};

export default ExamPage;

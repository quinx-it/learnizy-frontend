'use client';

import { TestPage } from '@/pages/test-page';
import { TestDataType } from '@/pages/test-page/typings';
import { useParams } from 'next/navigation';
import { useGetExamByIdQuery } from '@/api/endpoints/exams';
import { ParamsType } from '../../../typings';
import { NotFoundPage } from '@/pages/notFound-page';

const ExamPage = () => {
  const params = useParams<ParamsType>();

  const moduleId = params?.module ?? '';
  const testId = params?.testId ?? '';

  const { data, isLoading, isError, refetch } = useGetExamByIdQuery(testId ? +testId : 0, {
    skip: !testId,
  });

  if (!params || !moduleId || !testId) {
    return <NotFoundPage />;
  }

  return (
    <TestPage
      moduleId={moduleId}
      lessonId={testId}
      lessonTest={data as TestDataType}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    />
  );
};

export default ExamPage;

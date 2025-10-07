'use client';
import { TestPage, TestData } from '@/shared/app-pages/test-page';
import { useParams } from 'next/navigation';
import { useGetExamByIdQuery } from '@/api/endpoints/exams';

type ParamsType = {
  module: string;
  testId: string;
};

const ExamPage = () => {
  const params = useParams<ParamsType>();
  const { module, testId } = params;
  const { data, isLoading, isError, refetch } = useGetExamByIdQuery(+testId);

  return (
    <TestPage
      moduleId={module}
      lessonId={testId}
      lessonTest={data as TestData}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    />
  );
};

export default ExamPage;

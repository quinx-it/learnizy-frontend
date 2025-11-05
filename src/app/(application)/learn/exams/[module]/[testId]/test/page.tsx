'use client';

import { useParams } from 'next/navigation';

import { useGetExamByIdQuery } from '@/api/endpoints/exams';
import { TestPage, TestDataType } from '@/appPages/TestPage';

import { ParamsType } from '../../../typings';

const ExamPage = () => {
  const params = useParams<ParamsType>();
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

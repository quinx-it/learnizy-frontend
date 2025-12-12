'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import { useGetExamByIdQuery } from '@/api/endpoints/exams';
import TestPage from '@/components/TestPage';
import { type TestDataType } from '@/components/TestPage/typings';

import { type ParamsType } from '../../../typings';

const ExamPage: FC = () => {
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

'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';

import { useGetExamByIdQuery } from '@/api/endpoints/exams';
import TestPage from '@/appPages/TestPage';
import { TestDataType } from '@/appPages/TestPage/typings';

import { ParamsType } from '../../../typings';

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

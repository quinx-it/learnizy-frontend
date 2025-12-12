'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import ExamTestResultPage from '@/components/ExamTestResultPage';

import { type ParamsType } from '../../../typings';

const LessonTestResult: FC = () => {
  const params = useParams<ParamsType>();
  const { module, testId } = params;

  return <ExamTestResultPage testId={testId} moduleId={module} />;
};

export default LessonTestResult;

'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';

import ExamTestResultPage from '@/appPages/ExamTestResultPage';

import { ParamsType } from '../../../typings';

const LessonTestResult: FC = () => {
  const params = useParams<ParamsType>();
  const { module, testId } = params;

  return <ExamTestResultPage testId={testId} moduleId={module} />;
};

export default LessonTestResult;

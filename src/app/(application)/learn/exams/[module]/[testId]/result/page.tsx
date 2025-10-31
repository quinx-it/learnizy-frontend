'use client';

import { ExamTestResultPage } from '@/pages/exam-test-result-page';
import { NotFoundPage } from '@/pages/notFound-page';
import { useParams } from 'next/navigation';
import { ParamsType } from '../../../typings';

const LessonTestResult = () => {
  const params = useParams<ParamsType>();

  if (!params || !params.module || !params.testId) {
    return <NotFoundPage />;
  }

  const { module, testId } = params;

  return <ExamTestResultPage testId={testId} moduleId={module} />;
};

export default LessonTestResult;

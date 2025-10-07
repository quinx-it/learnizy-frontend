'use client';
import { ExamTestResultPage } from '@/shared/app-pages/exam-test-result-page';
import { useParams } from 'next/navigation';

type ParamsType = {
  module: string;
  testId: string;
};

const LessonTestResult = () => {
  const params = useParams<ParamsType>();
  const { module, testId } = params;

  return <ExamTestResultPage testId={testId} moduleId={module} />;
};

export default LessonTestResult;

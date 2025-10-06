'use client';
import { LessonTestResultPage } from '@/shared/app-pages/lesson-test-result-page';
import { useParams } from 'next/navigation';

type ParamsType = {
  module: string;
  testId: string;
};

const LessonTestResult = () => {
  const params = useParams<ParamsType>();
  const { module, testId } = params;

  return <LessonTestResultPage lessonId={testId} moduleId={module} />;
};

export default LessonTestResult;

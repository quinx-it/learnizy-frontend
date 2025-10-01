'use client';
import { LessonTestResultPage } from '@/shared/app-pages/lesson-test-result-page';
import { useParams } from 'next/navigation';

type ParamsType = {
  module: string;
  lesson: string;
};

const LessonTestResult = () => {
  const params = useParams<ParamsType>();
  const { module, lesson } = params;

  return <LessonTestResultPage moduleId={module} lessonId={lesson} />;
};

export default LessonTestResult;

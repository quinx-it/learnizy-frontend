'use client';

import { LessonTestResultPage } from '@/pages/lesson-test-result-page';
import { useParams } from 'next/navigation';
import { ParamsType } from '../../../typings';
import { NotFoundPage } from '@/pages/notFound-page';

const LessonTestResult = () => {
  const params = useParams<ParamsType>();

  const moduleId = params?.module ?? '';
  const lessonId = params?.lesson ?? '';

  if (!params || !moduleId || !lessonId) {
    return <NotFoundPage />;
  }

  return <LessonTestResultPage moduleId={moduleId} lessonId={lessonId} />;
};

export default LessonTestResult;

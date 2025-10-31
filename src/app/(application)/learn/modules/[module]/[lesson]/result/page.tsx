'use client';

import { LessonTestResultPage } from '@/pages/lesson-test-result-page';
import { NotFoundPage } from '@/pages/notFound-page';
import { useParams } from 'next/navigation';
import { ParamsType } from '../../../typings';

const LessonTestResult = () => {
  const params = useParams<ParamsType>();

  if (!params || !params.module || !params.lesson) {
    return <NotFoundPage />;
  }

  const { module, lesson } = params;

  return <LessonTestResultPage moduleId={module} lessonId={lesson} />;
};

export default LessonTestResult;

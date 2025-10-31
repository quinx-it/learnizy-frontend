'use client';

import { LessonRetellingPage } from '@/pages/lesson-retelling-page';
import { useParams } from 'next/navigation';
import { ParamsType } from '../../../typings';
import { NotFoundPage } from '@/pages/notFound-page';

const LessonRetelling = () => {
  const params = useParams<ParamsType>();

  const moduleId = params?.module ?? '';
  const lessonId = params?.lesson ?? '';

  if (!params || !moduleId || !lessonId) {
    return <NotFoundPage />;
  }

  return <LessonRetellingPage module={moduleId} lesson={lessonId} />;
};

export default LessonRetelling;

'use client';

import { LessonItemPage } from '@/pages/lesson-item-page';
import { useParams } from 'next/navigation';
import { ParamsType } from '../../typings';
import { NotFoundPage } from '@/pages/notFound-page';

const LessonItem = () => {
  const params = useParams<ParamsType>();

  const lessonId = params?.lesson ?? '';
  const moduleId = params?.module ?? '';

  if (!params || !lessonId || !moduleId) {
    return <NotFoundPage />;
  }

  return <LessonItemPage lessonId={lessonId} moduleId={moduleId} />;
};

export default LessonItem;

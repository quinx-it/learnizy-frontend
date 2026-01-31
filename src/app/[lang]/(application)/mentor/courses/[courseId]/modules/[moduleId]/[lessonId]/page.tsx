'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import { type ParamsType } from '@/app/[lang]/(application)/mentor/courses/typings';
import LessonItemPage from '@/components/LessonItemPage';

const CourseLessonItem: FC = () => {
  const params = useParams<ParamsType>();
  const { lessonId, moduleId } = params;

  if (!moduleId || !lessonId) {
    return null;
  }

  return <LessonItemPage lessonId={lessonId} moduleId={moduleId} />;
};

export default CourseLessonItem;

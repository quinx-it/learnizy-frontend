'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import { type ParamsType } from '@/app/[lang]/(application)/learn/courses/typings';
import LessonItemPage from '@/components/LessonItemPage';

const CourseLessonItem: FC = () => {
  const params = useParams<ParamsType>();
  const { courseId: courseIdParam, lessonId, moduleId } = params;
  const courseId = Number(courseIdParam);

  if (!moduleId || !lessonId || Number.isNaN(courseId)) {
    return null;
  }

  return <LessonItemPage lessonId={lessonId} moduleId={moduleId} courseId={courseId} />;
};

export default CourseLessonItem;

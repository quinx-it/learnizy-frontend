'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import { type ParamsType } from '@/app/[lang]/(application)/learn/courses/typings';
import LessonTestResultPage from '@/components/LessonTestResultPage';

const CourseLessonTestResult: FC = () => {
  const params = useParams<ParamsType>();
  const { courseId: courseIdParam, lessonId, moduleId } = params;
  const courseId = Number(courseIdParam);

  if (!moduleId || !lessonId || Number.isNaN(courseId)) {
    return null;
  }

  return <LessonTestResultPage moduleId={moduleId} lessonId={lessonId} courseId={courseId} />;
};

export default CourseLessonTestResult;

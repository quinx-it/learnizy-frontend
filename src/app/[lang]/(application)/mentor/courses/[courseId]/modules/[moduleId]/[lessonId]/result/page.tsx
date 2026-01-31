'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import { type ParamsType } from '@/app/[lang]/(application)/mentor/courses/typings';
import LessonTestResultPage from '@/components/LessonTestResultPage';

const CourseLessonTestResult: FC = () => {
  const params = useParams<ParamsType>();
  const { lessonId, moduleId } = params;

  if (!moduleId || !lessonId) {
    return null;
  }

  return <LessonTestResultPage moduleId={moduleId} lessonId={lessonId} />;
};

export default CourseLessonTestResult;

'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import { type ParamsType } from '@/app/[lang]/(application)/learn/courses/typings';
import LessonRetellingPage from '@/components/LessonRetellingPage';

const CourseLessonRetelling: FC = () => {
  const params = useParams<ParamsType>();
  const { courseId: courseIdParam, lessonId, moduleId } = params;
  const courseId = Number(courseIdParam);

  if (!moduleId || !lessonId || Number.isNaN(courseId)) {
    return null;
  }

  return <LessonRetellingPage module={moduleId} lesson={lessonId} courseId={courseId} />;
};

export default CourseLessonRetelling;

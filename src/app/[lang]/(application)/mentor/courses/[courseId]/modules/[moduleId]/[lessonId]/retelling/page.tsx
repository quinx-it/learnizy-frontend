'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import { type ParamsType } from '@/app/[lang]/(application)/mentor/courses/typings';
import LessonRetellingPage from '@/components/LessonRetellingPage';

const CourseLessonRetelling: FC = () => {
  const params = useParams<ParamsType>();
  const { lessonId, moduleId } = params;

  if (!moduleId || !lessonId) {
    return null;
  }

  return <LessonRetellingPage module={moduleId} lesson={lessonId} />;
};

export default CourseLessonRetelling;

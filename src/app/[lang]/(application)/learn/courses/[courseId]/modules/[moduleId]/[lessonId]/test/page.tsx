'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import { useGetTestByLessonIdQuery } from '@/api/endpoints/test';
import { type ParamsType } from '@/app/[lang]/(application)/learn/courses/typings';
import TestPage from '@/components/TestPage';
import { type TestDataType } from '@/components/TestPage/typings';

const CourseLessonTest: FC = () => {
  const params = useParams<ParamsType>();
  const { courseId: courseIdParam, lessonId, moduleId } = params;
  const courseId = Number(courseIdParam);

  const { data, isLoading, isError, refetch } = useGetTestByLessonIdQuery(+(lessonId ?? 0));

  if (!moduleId || !lessonId || Number.isNaN(courseId)) {
    return null;
  }

  return (
    <TestPage
      moduleId={moduleId}
      lessonId={lessonId}
      lessonTest={data as TestDataType}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      courseId={courseId}
    />
  );
};

export default CourseLessonTest;

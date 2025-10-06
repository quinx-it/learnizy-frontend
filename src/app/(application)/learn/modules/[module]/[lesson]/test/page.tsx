'use client';
import { LessonTestPage } from '@/shared/app-pages/lesson-test-page';
import { useParams } from 'next/navigation';
import { useGetTestByLessonIdQuery } from '@/api/endpoints/test';

type ParamsType = {
  module: string;
  lesson: string;
};

const LessonTest = () => {
  const params = useParams<ParamsType>();
  const { module, lesson } = params;

  return (
    <LessonTestPage moduleId={module} lessonId={lesson} fetchTestData={useGetTestByLessonIdQuery} />
  );
};

export default LessonTest;

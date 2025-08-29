'use client';
import { LessonTestPage } from '@/shared/app-pages/lesson-test-page';
import { useParams } from 'next/navigation';

type ParamsType = {
  module: string;
  lesson: string;
};

const LessonTest = () => {
  const params = useParams<ParamsType>();
  const { lesson } = params;

  return <LessonTestPage lessonId={lesson} />;
};

export default LessonTest;

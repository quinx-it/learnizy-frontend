'use client';
import { LessonItemPage } from '@/shared/app-pages/lesson-item-page'
import { useParams } from 'next/navigation';

type ParamsType = {
  lesson: string;
  module: string;
}

const LessonItem = () => {
  const params = useParams<ParamsType>();
  const { lesson, module } = params;

  return <LessonItemPage lessonId={lesson} moduleId={module} />;
};

export default LessonItem;
